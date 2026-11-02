/**
 * Harmony Hub - Central Product Data
 * 
 * Re-exports products from the central database (src/data/products.json).
 * Any changes made in the Admin Dashboard sync to this database.
 */

import initialProducts from "./products.json";
import { Product, ProductCategory, ProductCategorySlug, CATEGORIES, getCategorySlug, getCategoryName } from "@/types/product";
export * from "@/types/product";

export const PRODUCTS: Product[] = initialProducts as Product[];

// Helper functions for synchronous querying from initial seed
export function getAllProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isPublished);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => (p.id === id || p.slug === id) && p.isPublished);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured && p.isPublished);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return getAllProducts();
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isPublished);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  if (!current) return getAllProducts().slice(0, limit);
  return getAllProducts().filter(
    (p) => p.id !== currentId && p.categorySlug === current.categorySlug
  ).slice(0, limit);
}
