import { NextResponse } from "next/server";
import { getLiveCategories } from "@/lib/categories";

export async function GET() {
  try {
    const categories = await getLiveCategories();
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
