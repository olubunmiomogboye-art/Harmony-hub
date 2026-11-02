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
  unavailableSizes?: string[]; // Sizes marked Out of Stock by admin
  colors?: ProductColor[];
  combinationAvailability?: Record<string, boolean>; // e.g. "Black-Size 41": false
  variants?: ProductVariant[];
  specs?: { label: string; value: string }[];
  flaggedNote?: string; // For data validation flags (e.g. unconfirmed size, description review)
  createdAt: string;
  updatedAt: string;
}

/**
 * Check if an individual size is available for a product
 */
export function isSizeAvailable(product: Product, sizeName: string): boolean {
  if (!product.inStock) return false;
  const unavailable = product.unavailableSizes || [];
  return !unavailable.includes(sizeName);
}

/**
 * Check if an individual colour is available for a product
 */
export function isColorAvailable(product: Product, colorName: string): boolean {
  if (!product.inStock) return false;
  if (!product.colors || product.colors.length === 0) return true;
  const match = product.colors.find((c) => c.name.toLowerCase() === colorName.toLowerCase());
  if (!match) return true;
  return match.inStock !== false;
}

/**
 * Check if a specific colour and size combination is available
 */
export function isCombinationAvailable(
  product: Product,
  colorName?: string,
  sizeName?: string
): boolean {
  if (!product.inStock) return false;

  // 1. Check explicit combination override if present
  if (colorName && sizeName && product.combinationAvailability) {
    const key = `${colorName}-${sizeName}`;
    if (key in product.combinationAvailability) {
      return Boolean(product.combinationAvailability[key]);
    }
  }

  // 2. Fall back to individual color & size status
  if (colorName && !isColorAvailable(product, colorName)) return false;
  if (sizeName && !isSizeAvailable(product, sizeName)) return false;

  return true;
}

/**
 * Returns true if the product has at least one purchasable variation
 */
export function hasAnyVariationAvailable(product: Product): boolean {
  if (!product.inStock) return false;
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  if (!hasSizes && !hasColors) return product.inStock;

  if (hasColors && hasSizes) {
    for (const c of product.colors || []) {
      for (const s of product.sizes || []) {
        if (isCombinationAvailable(product, c.name, s)) return true;
      }
    }
    return false;
  }

  if (hasSizes) {
    return (product.sizes || []).some((s) => isSizeAvailable(product, s));
  }

  if (hasColors) {
    return (product.colors || []).some((c) => isColorAvailable(product, c.name));
  }

  return product.inStock;
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
