import React from "react";
import { notFound } from "next/navigation";
import { getAllProducts, getRelatedProducts } from "@/data/products";
import { getProductByIdOrSlug } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product || !product.isPublished) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
