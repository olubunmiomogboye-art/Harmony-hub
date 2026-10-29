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

export interface ProductColor {
  name: string;
  hex?: string;
  inStock?: boolean;
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
  colors?: ProductColor[];
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
    shortDescription: "Durable food storage container with a tight clip-lock lid to keep food fresh.",
    description: "A sturdy, airtight container that helps keep your pantry and fridge neat and organized. The secure clips prevent leaks and keep your food, grains, or snacks fresh for longer.",
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
    shortDescription: "Durable non-stick pots and pans set for everyday family cooking.",
    description: "A complete 10-piece cookware set made for everyday home cooking. The non-stick coating makes cooking smooth and washing up easy, while heat spreads evenly across your dishes.",
    inStock: true,
    stockCount: 8,
    featured: false,
    colors: [
      { name: "Onyx Black", hex: "#1F2022" },
      { name: "Cream White", hex: "#F5F2EB" },
      { name: "Sage Green", hex: "#7E8E7D" },
    ],
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
    shortDescription: "Heat-resistant silicone cooking spoons and turners with sturdy wooden handles.",
    description: "A practical 14-piece set including spatulas, spoons, a whisk, tongs, and a matching holder for your kitchen counter. Gentle on non-stick pots so they won't scratch.",
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
    shortDescription: "Heat-resistant glass bowls with tight-fitting lids for cooking, serving, and storage.",
    description: "Three durable glass containers that can go straight from the fridge to the microwave or oven, and straight to the dining table. Easy to clean and will not retain food stains or smells.",
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
    shortDescription: "Gentle, moisturizing baby soap made for delicate newborn skin.",
    description: "A trusted, mild soap specially made for your baby's delicate skin. Cleanses gently with chamomile and milk extracts to keep baby soft, fresh, and comfortable.",
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
    shortDescription: "Soft cotton baby girl romper with matching shorts and a cute headband.",
    description: "Made from soft, breathable cotton that is gentle on your baby's skin. Comes with a comfortable romper, matching printed shorts, and an elasticated headband. Easy snap buttons make diaper changes quick.",
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
    shortDescription: "Non-slip silicone suction bowl, plate, cup, spoon, and bib for easy feeding.",
    description: "A helpful 5-piece weaning set that helps keep mealtimes neat. The suction base sticks firmly to high chairs or tables, while the soft silicone is gentle on baby's gums.",
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
    shortDescription: "Soft, breathable cotton blanket to keep your baby warm and comfortable.",
    description: "A light, cozy cotton blanket perfect for swaddling, naptime, stroller walks, and crib use. Warm yet breathable to keep your little one comfortable all day and night.",
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
    shortDescription: "Structured camel handbag with gold-tone hardware and a detachable shoulder strap.",
    description: "A classic, well-structured handbag that adds an easy touch of elegance to any outfit. Features a neat magnetic closure, comfortable top handle, and a detachable shoulder strap so you can wear it your way.",
    inStock: true,
    stockCount: 7,
    featured: true,
    badge: "Trending",
    colors: [
      { name: "Textured Camel", hex: "#C19A6B" },
      { name: "Midnight Noir", hex: "#11120F" },
      { name: "Cream Linen", hex: "#F3F1EC" },
    ],
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
    shortDescription: "Graceful draped midi dress in a rich chocolate brown for church, weddings, and special events.",
    description: "A flattering, comfortable midi dress with an elegant draped neckline and flowing skirt. Designed to look effortlessly stylish for weddings, celebrations, and Sunday service.",
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
    shortDescription: "Smart black structured handbag with organized inner compartments.",
    description: "A versatile black handbag built with generous compartments to keep your essentials organized. Perfect for work, outings, and special occasions.",
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
    shortDescription: "Smart tailored blazer that pairs easily with dresses, skirts, or trousers.",
    description: "A well-cut, flattering blazer that adds an instant polished look to your outfit. Wear it over a dress for formal gatherings or with trousers for business meetings.",
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
    shortDescription: "Pretty pink layered tulle skirt with a soft elastic waist for parties and celebrations.",
    description: "A fun, fluffy skirt designed for birthday parties, weddings, and celebrations. Made with soft tulle over a gentle cotton lining so your girl can play and dance in total comfort.",
    inStock: true,
    stockCount: 16,
    featured: true,
    badge: "Popular",
    colors: [
      { name: "Ballerina Pink", hex: "#F4C2C2" },
      { name: "Powder Blue", hex: "#B0E0E6" },
      { name: "Ivory White", hex: "#FFFFF0" },
    ],
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
    shortDescription: "Comfortable, durable denim jacket for boys.",
    description: "A sturdy denim jacket made from soft, washed cotton. Easy to layer over t-shirts or shirts for school events, family outings, and weekend parties.",
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
    shortDescription: "Soft and breathable 2-piece cotton pajama set for a good night's sleep.",
    description: "Comfortable cotton sleepwear that keeps children cool and relaxed through the night. Soft on the skin with gentle elastic cuffs.",
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
    shortDescription: "Wide-brim sun hat for children with an adjustable strap.",
    description: "A light, comfortable woven sun hat that shades your child's face and eyes during outdoor parties, church events, and sunny days out.",
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
