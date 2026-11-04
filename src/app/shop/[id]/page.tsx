import React from "react";
import type { Metadata } from "next";
import { getProductByIdOrSlug, getProducts } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";
import { formatNaira } from "@/lib/formatters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "").trim();
  const product = await getProductByIdOrSlug(decodedId, false);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product is not available in the Harmony Hub shop catalog.",
      robots: { index: false, follow: false },
    };
  }

  const desc =
    product.description ||
    product.shortDescription ||
    `${product.name} (${formatNaira(product.price)}) available at Harmony Hub. Shop online or order directly via WhatsApp.`;

  return {
    title: `${product.name} — Shop`,
    description: desc,
    alternates: {
      canonical: `/shop/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | Harmony Hub`,
      description: desc,
      url: `/shop/${product.id}`,
      type: "article",
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Harmony Hub`,
      description: desc,
      images: [product.image],
    },
  };
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
