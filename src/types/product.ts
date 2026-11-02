/**
 * Harmony Hub - Product Types & Category Definitions
 */

export type ProductCategory = 
  | "Kitchen Utensils" 
  | "Baby Things" 
  | "Adults' Fashion" 
  | "Children's Outfits";

export type ProductCategorySlug = 
  | "kitchen-utensils" 
  | "baby-things" 
  | "adults-fashion" 
  | "childrens-outfits";

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductColor {
  name: string;
  hex?: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categorySlug: ProductCategorySlug;
  subtitle?: string;
  price: number; // in Nigerian Naira (₦)
  image: string;
  shortDescription: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  isPublished: boolean;
  featured?: boolean;
  badge?: string;
  sizes?: string[];
  colors?: ProductColor[];
  variants?: ProductVariant[];
  specs?: { label: string; value: string }[];
  flaggedNote?: string; // For data validation flags (e.g. unconfirmed size, description review)
  createdAt: string;
  updatedAt: string;
}

export const CATEGORIES: { id: "all" | ProductCategorySlug; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kitchen-utensils", label: "Kitchen Utensils" },
  { id: "baby-things", label: "Baby Things" },
  { id: "adults-fashion", label: "Adults' Fashion" },
  { id: "childrens-outfits", label: "Children's Outfits" },
];

export function getCategorySlug(category: ProductCategory): ProductCategorySlug {
  switch (category) {
    case "Kitchen Utensils":
      return "kitchen-utensils";
    case "Baby Things":
      return "baby-things";
    case "Adults' Fashion":
      return "adults-fashion";
    case "Children's Outfits":
      return "childrens-outfits";
  }
}

export function getCategoryName(slug: string): ProductCategory {
  switch (slug) {
    case "kitchen-utensils":
      return "Kitchen Utensils";
    case "baby-things":
      return "Baby Things";
    case "adults-fashion":
      return "Adults' Fashion";
    case "childrens-outfits":
      return "Children's Outfits";
    default:
      return "Adults' Fashion";
  }
}
