import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getProducts, createProduct, getDashboardStats } from "@/lib/db";
import { ProductCategory, ProductCategorySlug } from "@/types/product";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const [products, stats] = await Promise.all([
      getProducts({
        categorySlug,
        search,
        sort,
        includeUnpublished: true, // Admin can view drafts & published
      }),
      getDashboardStats(),
    ]);

    return NextResponse.json({
      success: true,
      stats,
      data: products,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load admin products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, price, category, image } = body;

    // Validate required fields
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Product name is required" }, { status: 400 });
    }
    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return NextResponse.json({ success: false, error: "Valid price is required" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
    }
    if (!image) {
      return NextResponse.json({ success: false, error: "Product image is required" }, { status: 400 });
    }

    const created = await createProduct({
      ...body,
      price: Number(price),
    });

    return NextResponse.json({
      success: true,
      data: created,
    }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/admin/products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
