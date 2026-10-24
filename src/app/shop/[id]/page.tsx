import React from "react";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById, getRelatedProducts } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

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
  const product = getProductById(id);

  if (!product) {
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
