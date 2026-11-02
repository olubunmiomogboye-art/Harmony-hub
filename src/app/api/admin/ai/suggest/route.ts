import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface AISuggestion {
  name: string;
  subtitle?: string;
  category: "Kitchen Utensils" | "Baby Things" | "Adults' Fashion" | "Children's Outfits";
  shortDescription: string;
  description: string;
  colors?: string[];
  material?: string;
  specs?: { label: string; value: string }[];
}

/**
 * Convert image URL/path/data-url to base64 buffer and mimeType
 */
async function resolveImageBase64(imageUrl: string): Promise<{ base64: string; mimeType: string } | null> {
  if (!imageUrl) return null;

  // 1. Data URL
  if (imageUrl.startsWith("data:")) {
    const match = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], base64: match[2] };
    }
  }

  // 2. Local public file path
  if (imageUrl.startsWith("/")) {
    const localPath = path.join(process.cwd(), "public", imageUrl.replace(/^\//, ""));
    if (fs.existsSync(localPath)) {
      const buffer = fs.readFileSync(localPath);
      const ext = path.extname(localPath).toLowerCase().replace(".", "");
      const mimeType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
      return { base64: buffer.toString("base64"), mimeType };
    }
  }

  // 3. Remote URL
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    try {
      const res = await fetch(imageUrl);
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const mimeType = res.headers.get("content-type") || "image/jpeg";
        const base64 = Buffer.from(arrayBuf).toString("base64");
        return { base64, mimeType };
      }
    } catch {
      // ignore
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Please provide an image to analyze." },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
    const openaiKey = process.env.OPENAI_API_KEY || "";

    if (!geminiKey && !openaiKey) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: "AI service key (GEMINI_API_KEY or OPENAI_API_KEY) is not yet configured.",
          setupGuide:
            "To enable instant AI photo analysis, add GEMINI_API_KEY=your_key to your .env.local file or deployment environment settings. You can still enter product details manually below.",
        },
        { status: 200 }
      );
    }

    const imgData = await resolveImageBase64(imageUrl);
    if (!imgData) {
      return NextResponse.json(
        { success: false, error: "Could not read the product image. Please upload a valid image file." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert e-commerce catalog assistant for Harmony Hub, a curated lifestyle and home store in Ibadan, Nigeria.
Analyze the provided product image and return a JSON object with suggested catalog fields based ONLY on visibly identifiable details in the photo.

CRITICAL RULES:
1. NEVER fabricate or guess a price. Leave price out completely.
2. NEVER fabricate available sizes or stock numbers.
3. NEVER guess unverified brands or model numbers unless clearly written on the product packaging in the image.
4. Only suggest material if visibly obvious (e.g. stainless steel, ceramic, cotton, wood, glass, silicone). Otherwise leave empty.
5. Category MUST be exactly one of: "Kitchen Utensils", "Baby Things", "Adults' Fashion", "Children's Outfits".
6. Keep wording simple, natural, clear, and elegant. Avoid overhyped AI buzzwords.

Return ONLY a pure JSON object in this exact format (no markdown fences, no code blocks):
{
  "name": "Clear, concise product title",
  "subtitle": "Short descriptive type or detail (e.g., 24-piece dining set, comfortable slip-ons)",
  "category": "Kitchen Utensils",
  "shortDescription": "1-2 sentence clear summary of what the product is and its practical everyday benefit.",
  "description": "2-3 sentences explaining features, styling, or usage warmly and straightforwardly.",
  "colors": ["Primary visible color"],
  "material": "Visibly identifiable material or empty string",
  "specs": [
    { "label": "Color", "value": "Visible color" }
  ]
}`;

    // 1. Try Gemini
    if (geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              {
                inline_data: {
                  mime_type: imgData.mimeType,
                  data: imgData.base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2,
        },
      };

      const aiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (aiRes.ok) {
        const aiJson = await aiRes.json();
        const text = aiJson.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText) as AISuggestion;
          return NextResponse.json({
            success: true,
            configured: true,
            provider: "gemini",
            data: parsed,
          });
        }
      }
    }

    // 2. Try OpenAI fallback
    if (openaiKey) {
      const openAiUrl = "https://api.openai.com/v1/chat/completions";
      const payload = {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this product photo and suggest product catalog details." },
              {
                type: "image_url",
                image_url: {
                  url: `data:${imgData.mimeType};base64,${imgData.base64}`,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      };

      const aiRes = await fetch(openAiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (aiRes.ok) {
        const aiJson = await aiRes.json();
        const text = aiJson.choices?.[0]?.message?.content;
        if (text) {
          const parsed = JSON.parse(text) as AISuggestion;
          return NextResponse.json({
            success: true,
            configured: true,
            provider: "openai",
            data: parsed,
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "AI service was unable to analyze the image. You can continue filling in the details manually.",
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("AI Suggestion API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while analyzing the image.",
      },
      { status: 500 }
    );
  }
}
