import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { supabaseServer, isSupabaseServerConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Optional GitHub token for serverless permanent asset sync
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || "";
const GITHUB_REPO = "olubunmiomogboye-art/Harmony-hub";

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "Please select an image file to upload." }, { status: 400 });
    }

    // Validate image format
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Please upload a valid image (JPEG, PNG, or WebP)." },
        { status: 400 }
      );
    }

    // Limit size to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image file is too large. Please select an image under 15MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || (file.type === "image/png" ? ".png" : ".jpg");
    const sanitizedBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const filename = `${Date.now()}-${sanitizedBase}${ext}`;

    // STRATEGY 1: Supabase Storage
    if (isSupabaseServerConfigured && supabaseServer) {
      try {
        const { data, error } = await supabaseServer.storage
          .from("product-images")
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabaseServer.storage
            .from("product-images")
            .getPublicUrl(filename);

          const finalUrl = publicUrlData.publicUrl;
          return NextResponse.json({
            success: true,
            url: finalUrl,
            imageUrl: finalUrl,
            filename,
            source: "supabase",
          });
        }
        console.warn("Supabase storage upload failed, attempting fallback:", error);
      } catch (err) {
        console.error("Supabase storage exception:", err);
      }
    }

    // STRATEGY 2: Local filesystem (local development or writable server)
    try {
      const uploadDir = path.join(process.cwd(), "public", "images", "products", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);

      const publicUrl = `/images/products/uploads/${filename}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        imageUrl: publicUrl,
        filename,
        source: "local-disk",
      });
    } catch (fsErr: any) {
      console.warn("Local disk write failed (likely serverless read-only environment):", fsErr?.message);
    }

    // STRATEGY 3: Serverless fallback (Data URL + /tmp cache)
    // Works reliably on any serverless platform (Vercel, AWS Lambda) without read-only restrictions
    try {
      const tmpPath = path.join("/tmp", filename);
      fs.writeFileSync(tmpPath, buffer);
    } catch {
      // /tmp write is optional
    }

    // Convert buffer to base64 Data URL so it can be stored directly and displayed anywhere
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64Data}`;

    // Optionally sync file to GitHub repository if token is configured
    if (GITHUB_TOKEN) {
      try {
        const gitPath = `public/images/products/uploads/${filename}`;
        const commitUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${gitPath}`;
        await fetch(commitUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "User-Agent": "HarmonyHub-Admin",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `chore: upload product image ${filename}`,
            content: base64Data,
          }),
        });
      } catch (gitErr) {
        console.warn("GitHub asset sync warning:", gitErr);
      }
    }

    return NextResponse.json({
      success: true,
      url: dataUrl,
      imageUrl: dataUrl,
      filename,
      source: "data-url",
    });
  } catch (error: any) {
    console.error("Error in POST /api/admin/upload:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process image upload. Please try another image." },
      { status: 500 }
    );
  }
}
