/**
 * Harmony Hub - Central Product Data
 * 
 * THIS IS THE SINGLE SOURCE OF TRUTH FOR ALL PRODUCTS.
 * Replacing or updating products here automatically updates:
 * - Shop listing & category filtering
 * - Product detail pages (/shop/[id])
 * - Featured products on the Home page
 * - Shopping bag / Cart
 * - Checkout order calculations
 * - WhatsApp order messages
 * - Email order notifications
 */

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  category: "Kitchen Utensils" | "Baby things" | "Womens' Fashion" | "Childrens' outfits";
  categorySlug: "kitchen-utensils" | "baby-things" | "womens-fashion" | "childrens-outfits";
  subtitle?: string;
  price: number; // in NGN (₦)
  image: string;
  shortDescription: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  specs?: { label: string; value: string }[];
  variants?: ProductVariant[];
  badge?: string;
}

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "kitchen-utensils", label: "Kitchen Utensils" },
  { id: "baby-things", label: "Baby things" },
  { id: "womens-fashion", label: "Womens' Fashion" },
  { id: "childrens-outfits", label: "Childrens' outfits" },
] as const;

export const PRODUCTS: Product[] = [
  // --- KITCHEN UTENSILS ---
  {
    id: "quality-smp-food-storage",
    name: "Quality SMP Food Storage Container",
    category: "Kitchen Utensils",
    categorySlug: "kitchen-utensils",
    subtitle: "800 ML",
    price: 18000,
    image: "/images/products/container.jpg",
    shortDescription: "Airtight, durable food storage containers with four-sided locking clip lids.",
    description: "Keep your pantry and refrigerator impeccably organized with this premium food storage container. Built from BPA-free, high-clarity materials with silicon hermetic seals, it locks in freshness and prevents leaks.",
    inStock: true,
    stockCount: 20,
    featured: true,
    badge: "Bestseller",
    specs: [
      { label: "Capacity", value: "800 ML" },
      { label: "Material", value: "BPA-Free Food Grade Polymer" },
      { label: "Closure", value: "4-Way Airtight Clip Lock" },
      { label: "Safe For", value: "Microwave, Dishwasher, Freezer" },
    ],
  },
  {
    id: "non-stick-cookware-set",
    name: "Non Stick Cookware Set",
    category: "Kitchen Utensils",
    categorySlug: "kitchen-utensils",
    subtitle: "10 pieces",
    price: 45000,
    image: "/images/products/cookware-set.jpg",
    shortDescription: "Chef-grade heavy-gauge non-stick cookware set including saucepans, pans, and lids.",
    description: "Designed for everyday culinary precision, this 10-piece cookware collection features heavy-gauge aluminum for fast, even heat distribution and a diamond-reinforced ceramic non-stick coating.",
    inStock: true,
    stockCount: 8,
    featured: false,
    specs: [
      { label: "Set Count", value: "10 Pieces" },
      { label: "Coating", value: "PFOA-Free Ceramic Non-Stick" },
      { label: "Handles", value: "Stay-Cool Ergonomic Bakelite" },
      { label: "Compatibility", value: "Gas, Electric, Ceramic Stoves" },
    ],
  },
  {
    id: "silicone-kitchen-utensils-set",
    name: "Silicone Kitchen Utensils Set With Wooden Handle",
    category: "Kitchen Utensils",
    categorySlug: "kitchen-utensils",
    subtitle: "14 pieces with Bucket",
    price: 22000,
    image: "/images/products/utensils-set.jpg",
    shortDescription: "Heat-resistant silicone culinary utensils with natural beechwood handles.",
    description: "A complete 14-piece culinary arsenal covering spatulas, ladles, slotted turners, tongs, and whisk, complete with a minimalist countertop storage cylinder. Gentle on non-stick surfaces.",
    inStock: true,
    stockCount: 15,
    featured: false,
    specs: [
      { label: "Pieces", value: "14 Pieces + Countertop Holder" },
      { label: "Head Material", value: "Food-Grade Silicone (Up to 230°C)" },
      { label: "Handle Material", value: "Natural Polished Beechwood" },
    ],
  },
  {
    id: "glass-food-storage-set",
    name: "Glass Food Storage Set",
    category: "Kitchen Utensils",
    categorySlug: "kitchen-utensils",
    subtitle: "3 pieces",
    price: 25000,
    image: "/images/products/container.jpg",
    shortDescription: "Borosilicate glass containers with leakproof snap-on lids for oven and table.",
    description: "Thermal-shock resistant borosilicate glass dishes that go seamlessly from freezer to oven and right to your dining table.",
    inStock: true,
    stockCount: 10,
    featured: false,
    specs: [
      { label: "Sizes", value: "Small (400ml), Medium (800ml), Large (1.5L)" },
      { label: "Glass Type", value: "Oven-Safe Borosilicate Glass" },
    ],
  },

  // --- BABY THINGS ---
  {
    id: "cussons-baby-soap",
    name: "Cussons Baby Soap, Mild & Gentle",
    category: "Baby things",
    categorySlug: "baby-things",
    subtitle: "75g",
    price: 500,
    image: "/images/products/cussons-soap.jpg",
    shortDescription: "Dermatologically tested gentle cleansing bar enriched with milk extract.",
    description: "Specially formulated for infant and newborn delicate skin. Mild and gentle cleansing action with chamomile and milk protein to protect natural moisture balance.",
    inStock: true,
    stockCount: 65,
    featured: true,
    specs: [
      { label: "Net Weight", value: "75g" },
      { label: "Skin Type", value: "Sensitive & Newborn Skin" },
      { label: "Key Ingredient", value: "Chamomile & Milk Extract" },
    ],
  },
  {
    id: "newborn-baby-romper-set",
    name: "Newborn Baby Girl Romper & Shorts Set",
    category: "Baby things",
    categorySlug: "baby-things",
    subtitle: "0-3 Months",
    price: 6500,
    image: "/images/products/baby-romper.jpg",
    shortDescription: "Ultra-soft cotton yellow flutter romper with printed shorts and headband.",
    description: "Crafted from breathable 100% combed cotton, this charming 3-piece set is gentle on sensitive infant skin. Features nickel-free bottom snaps for effortless diaper changes.",
    inStock: true,
    stockCount: 12,
    featured: false,
    variants: [
      { name: "Size", options: ["0-3M", "3-6M", "6-9M"] },
    ],
    specs: [
      { label: "Material", value: "100% Combed Breathable Cotton" },
      { label: "Includes", value: "Romper, Bloomers, Matching Headband" },
      { label: "Closure", value: "Quick-Snap Inseam" },
    ],
  },
  {
    id: "baby-feeding-set",
    name: "Baby Feeding Set",
    category: "Baby things",
    categorySlug: "baby-things",
    subtitle: "5-piece set",
    price: 3500,
    image: "/images/products/baby-romper.jpg",
    shortDescription: "Suction bowl, divided plate, soft spoon, fork, and silicone bib.",
    description: "Mess-free infant weaning kit made from soft, durable food-grade silicone that sticks securely to high-chair trays.",
    inStock: true,
    stockCount: 18,
    featured: false,
    specs: [
      { label: "Material", value: "100% Food-Grade Silicone" },
      { label: "Safety", value: "BPA, PVC & Phthalate Free" },
    ],
  },
  {
    id: "soft-baby-blanket",
    name: "Soft Baby Blanket",
    category: "Baby things",
    categorySlug: "baby-things",
    subtitle: "Cotton, 1.5m x 1m",
    price: 4000,
    image: "/images/products/baby-romper.jpg",
    shortDescription: "Plush cellular cotton blanket for crib, stroller, and swaddling.",
    description: "Soft, breathable weave that provides soothing warmth without overheating. Perfect for newborns and toddlers.",
    inStock: true,
    stockCount: 22,
    featured: false,
    specs: [
      { label: "Dimensions", value: "150cm x 100cm" },
      { label: "Fabric", value: "Pure Cotton Knit" },
    ],
  },

  // --- WOMENS' FASHION ---
  {
    id: "mokki-mini-camel-bag",
    name: "Mokki Mini Edition Textured Camel Bag",
    category: "Womens' Fashion",
    categorySlug: "womens-fashion",
    subtitle: "Structured Handbag",
    price: 28500,
    image: "/images/products/camel-bag.jpg",
    shortDescription: "Structured top-handle bag in textured camel faux leather with gold accents.",
    description: "An architectural silhouette featuring clean lines, premium textured vegan leather, signature magnetic fold closure, and a detachable crossbody strap for versatile day-to-evening styling.",
    inStock: true,
    stockCount: 7,
    featured: true,
    badge: "Trending",
    specs: [
      { label: "Dimensions", value: "22cm x 16cm x 8cm" },
      { label: "Material", value: "Premium Textured Vegan Leather" },
      { label: "Hardware", value: "Brushed Champagne Gold" },
      { label: "Strap", value: "Adjustable & Detachable Crossbody" },
    ],
  },
  {
    id: "elegant-chocolate-brown-outfit",
    name: "Elegant Chocolate Brown Drape Outfit",
    category: "Womens' Fashion",
    categorySlug: "womens-fashion",
    subtitle: "Occasion Dress",
    price: 24000,
    image: "/images/products/brown-dress.jpg",
    shortDescription: "Sophisticated gathered drape midi dress tailored for special gatherings.",
    description: "A show-stopping silhouette with an asymmetrical drape neckline and fluid pleated skirt that commands grace at banquets, weddings, and high-tea occasions.",
    inStock: true,
    stockCount: 9,
    featured: false,
    variants: [
      { name: "Size", options: ["S (UK 8-10)", "M (UK 12)", "L (UK 14-16)", "XL (UK 18)"] },
    ],
    specs: [
      { label: "Fabric", value: "Rich Satin Crepe" },
      { label: "Care", value: "Dry Clean or Gentle Handwash" },
    ],
  },
  {
    id: "stylish-handbag-black",
    name: "Stylish Structured Handbag",
    category: "Womens' Fashion",
    categorySlug: "womens-fashion",
    subtitle: "Leather, Black",
    price: 30000,
    image: "/images/products/camel-bag.jpg",
    shortDescription: "Timeless black structured leather handbag with organized interior compartments.",
    description: "Clean modern profile designed for effortless daily elegance. Features dual compartments, zipped central divider, and protective metal bottom studs.",
    inStock: true,
    stockCount: 5,
    featured: false,
    specs: [
      { label: "Color", value: "Midnight Black" },
      { label: "Closure", value: "Turn-Lock Polished Clasp" },
    ],
  },
  {
    id: "chic-blazer",
    name: "Chic Tailored Blazer",
    category: "Womens' Fashion",
    categorySlug: "womens-fashion",
    subtitle: "Tailored Fit",
    price: 22000,
    image: "/images/products/brown-dress.jpg",
    shortDescription: "Impeccably tailored single-breasted blazer with peaked lapels.",
    description: "Sharp tailoring meets feminine ease. Layer it over event gowns or pair with tailored trousers for refined daytime presence.",
    inStock: true,
    stockCount: 6,
    featured: false,
    specs: [
      { label: "Cut", value: "Tailored Modern Silhouette" },
      { label: "Lining", value: "Full Silk Touch Lining" },
    ],
  },

  // --- CHILDRENS' OUTFITS ---
  {
    id: "pink-tulle-skirt-children",
    name: "Pink Tulle Skirt for Children",
    category: "Childrens' outfits",
    categorySlug: "childrens-outfits",
    subtitle: "Age 7 – 14",
    price: 16000,
    image: "/images/products/tulle-skirt.jpg",
    shortDescription: "Multi-layered ballerina pink tulle skirt with an elasticated satin waistband.",
    description: "Designed for birthdays, bridal trains, and celebratory parties. Layers of light-as-air tulle over a soft, skin-friendly cotton lining that guarantees hours of twirling comfort.",
    inStock: true,
    stockCount: 16,
    featured: true,
    badge: "Popular",
    variants: [
      { name: "Age Group", options: ["7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"] },
    ],
    specs: [
      { label: "Layers", value: "4 Layers Tiered Tulle + Cotton Slip" },
      { label: "Waist", value: "Comfort Elastic Satin Band" },
      { label: "Occasion", value: "Parties, Celebrations, Flower Girl" },
    ],
  },
  {
    id: "boys-denim-jacket",
    name: "Boys' Denim Jacket",
    category: "Childrens' outfits",
    categorySlug: "childrens-outfits",
    subtitle: "Age 5 – 10",
    price: 12000,
    image: "/images/products/tulle-skirt.jpg",
    shortDescription: "Durable classic washed denim jacket with branded brass buttons.",
    description: "A resilient wardrobe staple tailored for active boys. Pre-washed for softness with classic contrast stitching and chest flap pockets.",
    inStock: true,
    stockCount: 11,
    featured: false,
    specs: [
      { label: "Fabric", value: "100% Washed Cotton Denim" },
      { label: "Fit", value: "Comfort Casual Fit" },
    ],
  },
  {
    id: "girls-pajama-set",
    name: "Girls' Pajama Set",
    category: "Childrens' outfits",
    categorySlug: "childrens-outfits",
    subtitle: "Age 3 – 8",
    price: 8000,
    image: "/images/products/tulle-skirt.jpg",
    shortDescription: "Cozy 2-piece cotton bedtime pajama set with ribbed cuffs.",
    description: "Natural breathable cotton ensures restorative sleep and easy relaxation around the home.",
    inStock: true,
    stockCount: 14,
    featured: false,
    specs: [
      { label: "Material", value: "100% Breathable Cotton Rib" },
      { label: "Includes", value: "Long Sleeve Top + Cuffed Bottoms" },
    ],
  },
  {
    id: "cute-summer-hat-kids",
    name: "Cute Summer Hat for Kids",
    category: "Childrens' outfits",
    categorySlug: "childrens-outfits",
    subtitle: "Adjustable Fit",
    price: 7000,
    image: "/images/products/tulle-skirt.jpg",
    shortDescription: "Woven sun protection hat with chin tie for outdoor celebrations.",
    description: "Broad brim protects young faces from harsh sun during outdoor events, gardens, and beach getaways.",
    inStock: true,
    stockCount: 20,
    featured: false,
    specs: [
      { label: "Protection", value: "UPF 50+ Sun Barrier" },
      { label: "Fit", value: "Adjustable Drawstring Inner Band" },
    ],
  },
];

// Helper functions for easy querying
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) => p.id !== currentId && p.categorySlug === current.categorySlug
  ).slice(0, limit);
}
