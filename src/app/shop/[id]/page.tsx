import React from "react";
import { getProductByIdOrSlug, getProducts } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "").trim();
  const product = await getProductByIdOrSlug(decodedId, false);

  let relatedProducts: any[] = [];
  if (product) {
    const allPublished = await getProducts({ includeUnpublished: false });
    relatedProducts = allPublished
      .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
      .slice(0, 4);

    if (relatedProducts.length === 0) {
      relatedProducts = allPublished.filter((p) => p.id !== product.id).slice(0, 4);
    }
  }

  return (
    <ProductDetailClient
      initialProduct={product}
      initialRelatedProducts={relatedProducts}
      productId={decodedId}
    />
  );
}
