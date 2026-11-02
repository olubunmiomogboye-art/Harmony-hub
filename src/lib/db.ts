import fs from "fs";
import path from "path";
import { Product, ProductCategory, ProductCategorySlug, getCategorySlug } from "@/types/product";
import { supabaseServer, isSupabaseServerConfigured } from "@/lib/supabase/server";

const JSON_DB_PATH = path.join(process.cwd(), "src/data/products.json");
const TMP_DB_PATH = "/tmp/harmony_products.json";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || "";
const GITHUB_REPO = "olubunmiomogboye-art/Harmony-hub";

// Global in-memory cache to ensure instant reactivity across API routes
let memoryProducts: Product[] | null = null;

/**
 * Read products from disk or cached memory
 */
function readLocalProducts(): Product[] {
  // 1. If memory cache has items, use it
  if (memoryProducts && memoryProducts.length > 0) {
    return memoryProducts;
  }

  // 2. Try /tmp storage (for serverless environments)
  try {
    if (fs.existsSync(TMP_DB_PATH)) {
      const tmpData = fs.readFileSync(TMP_DB_PATH, "utf-8");
      const parsed = JSON.parse(tmpData) as Product[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryProducts = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore tmp read errors
  }

  // 3. Fallback to bundled JSON database
  try {
    if (fs.existsSync(JSON_DB_PATH)) {
      const data = fs.readFileSync(JSON_DB_PATH, "utf-8");
      const parsed = JSON.parse(data) as Product[];
      memoryProducts = parsed;
      return parsed;
    }
  } catch (error) {
    console.error("Error reading local products store:", error);
  }

  return [];
}

/**
 * Sync products to GitHub repository for permanent persistence on serverless hosts
 */
async function syncToGitHub(products: Product[]) {
  if (!GITHUB_TOKEN) return;

  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/products.json`;
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "HarmonyHub-Backend",
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Get current file SHA
    const getRes = await fetch(fileUrl, { headers });
    if (!getRes.ok) return;
    const getData = await getRes.json();
    const sha = getData.sha;

    // Commit updated products.json
    const content = Buffer.from(JSON.stringify(products, null, 2), "utf-8").toString("base64");
    await fetch(fileUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "chore(data): auto-sync products from admin dashboard",
        content,
        sha,
      }),
    });
  } catch (err) {
    console.warn("GitHub data auto-sync notice:", err);
  }
}

/**
 * Write products to local, tmp, and remote storage
 */
function writeLocalProducts(products: Product[]): boolean {
  memoryProducts = products;

  // 1. Write to /tmp for immediate serverless persistence across requests
  try {
    fs.writeFileSync(TMP_DB_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch {
    // ignore
  }

  // 2. Try writing to src/data/products.json (local development)
  let wroteDisk = false;
  try {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(products, null, 2), "utf-8");
    wroteDisk = true;
  } catch {
    // read-only filesystem on Vercel
  }

  // 3. Trigger asynchronous background sync to GitHub if running on serverless
  if (!wroteDisk && GITHUB_TOKEN) {
    syncToGitHub(products).catch(() => {});
  }

  return true;
}

/**
 * Map Supabase row to Product model
 */
function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug || row.id,
    subtitle: row.subtitle || "",
    price: Number(row.price),
    category: row.category as ProductCategory,
    categorySlug: row.category_slug as ProductCategorySlug,
    image: row.image,
    shortDescription: row.short_description || "",
    description: row.description || "",
    inStock: Boolean(row.in_stock),
    stockCount: Number(row.stock_count || 0),
    isPublished: Boolean(row.is_published),
    featured: Boolean(row.featured),
    badge: row.badge || undefined,
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    colors: Array.isArray(row.colors) ? row.colors : [],
    specs: Array.isArray(row.specs) ? row.specs : [],
    flaggedNote: row.flagged_note || undefined,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

/**
 * Map Product model to Supabase row format
 */
function mapProductToRow(p: Partial<Product>): Record<string, any> {
  const row: Record<string, any> = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.name !== undefined) row.name = p.name;
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.subtitle !== undefined) row.subtitle = p.subtitle;
  if (p.price !== undefined) row.price = p.price;
  if (p.category !== undefined) {
    row.category = p.category;
    row.category_slug = getCategorySlug(p.category);
  }
  if (p.categorySlug !== undefined) row.category_slug = p.categorySlug;
  if (p.image !== undefined) row.image = p.image;
  if (p.shortDescription !== undefined) row.short_description = p.shortDescription;
  if (p.description !== undefined) row.description = p.description;
  if (p.inStock !== undefined) row.in_stock = p.inStock;
  if (p.stockCount !== undefined) row.stock_count = p.stockCount;
  if (p.isPublished !== undefined) row.is_published = p.isPublished;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.badge !== undefined) row.badge = p.badge;
  if (p.sizes !== undefined) row.sizes = p.sizes;
  if (p.colors !== undefined) row.colors = p.colors;
  if (p.specs !== undefined) row.specs = p.specs;
  if (p.flaggedNote !== undefined) row.flagged_note = p.flaggedNote;
  row.updated_at = new Date().toISOString();
  return row;
}

export interface ProductQueryOptions {
  categorySlug?: string;
  includeUnpublished?: boolean;
  search?: string;
  sort?: string;
}

/**
 * Fetch products list
 */
export async function getProducts(options: ProductQueryOptions = {}): Promise<Product[]> {
  const { categorySlug, includeUnpublished = false, search, sort } = options;

  // Supabase
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      let query = supabaseServer.from("products").select("*");

      if (!includeUnpublished) {
        query = query.eq("is_published", true);
      }

      if (categorySlug && categorySlug !== "all") {
        query = query.eq("category_slug", categorySlug);
      }

      if (search && search.trim()) {
        const term = search.trim();
        query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        const mapped = data.map(mapRowToProduct);
        memoryProducts = mapped;
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase query exception, using local store:", err);
    }
  }

  // Local / memory store
  let items = [...readLocalProducts()];

  if (!includeUnpublished) {
    items = items.filter((p) => p.isPublished);
  }

  if (categorySlug && categorySlug !== "all") {
    items = items.filter((p) => p.categorySlug === categorySlug);
  }

  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(term)) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  switch (sort) {
    case "price-low":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      items.sort((a, b) => b.price - a.price);
      break;
    case "name":
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
      items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      break;
    default:
      items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return items;
}

/**
 * Get product by ID or Slug (case-insensitive, URL-decoded, trimmed)
 */
export async function getProductByIdOrSlug(idOrSlug: string, includeUnpublished = false): Promise<Product | null> {
  if (!idOrSlug) return null;
  const raw = idOrSlug.trim();
  const clean = decodeURIComponent(raw).trim().toLowerCase();

  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      let query = supabaseServer
        .from("products")
        .select("*")
        .or(`id.ilike.${clean},slug.ilike.${clean},id.eq.${raw},slug.eq.${raw}`);

      if (!includeUnpublished) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      console.warn("Supabase getById error, using local fallback:", err);
    }
  }

  const items = readLocalProducts();
  const found = items.find((p) => {
    if (!includeUnpublished && !p.isPublished) return false;
    const pId = (p.id || "").trim();
    const pSlug = (p.slug || "").trim();
    const pIdLower = pId.toLowerCase();
    const pSlugLower = pSlug.toLowerCase();

    return (
      pIdLower === clean ||
      pSlugLower === clean ||
      pId === raw ||
      pSlug === raw
    );
  });
  return found || null;
}

/**
 * Create a new product with clean, unique, and stable identifier
 */
export async function createProduct(payload: Partial<Product>): Promise<Product> {
  const now = new Date().toISOString();
  const baseSlug = (payload.slug || payload.name || "product")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "product";

  // Prevent slug collisions
  const existingItems = readLocalProducts();
  let slug = baseSlug;
  let counter = 1;
  while (existingItems.some((p) => p.slug === slug && p.id !== payload.id)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  // Stable ID: prefer payload.id if provided, else use the clean unique slug
  const id = payload.id || slug;
  const category = payload.category || "Adults' Fashion";
  const categorySlug = payload.categorySlug || getCategorySlug(category);

  const newProduct: Product = {
    id,
    name: payload.name || "Untitled Product",
    slug,
    subtitle: payload.subtitle || "",
    price: payload.price ?? 0,
    category,
    categorySlug,
    image: payload.image || "/images/products/container.jpg",
    shortDescription: payload.shortDescription || payload.description || "",
    description: payload.description || "",
    inStock: payload.inStock ?? true,
    stockCount: payload.stockCount ?? 15,
    isPublished: payload.isPublished ?? true,
    featured: payload.featured ?? false,
    badge: payload.badge || undefined,
    sizes: payload.sizes || [],
    colors: payload.colors || [],
    specs: payload.specs || [],
    flaggedNote: payload.flaggedNote || undefined,
    createdAt: now,
    updatedAt: now,
  };

  // 1. Supabase
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const row = mapProductToRow(newProduct);
      row.created_at = now;
      const { data, error } = await supabaseServer.from("products").insert([row]).select().single();
      if (!error && data) {
        const mapped = mapRowToProduct(data);
        const local = readLocalProducts();
        writeLocalProducts([mapped, ...local]);
        return mapped;
      }
      console.warn("Supabase insert error, falling back to local:", error);
    } catch (err) {
      console.error("Supabase insert exception:", err);
    }
  }

  // 2. Local & persistent store
  const items = readLocalProducts();
  const updated = [newProduct, ...items];
  writeLocalProducts(updated);
  return newProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const now = new Date().toISOString();

  // 1. Supabase
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const rowUpdates = mapProductToRow(updates);
      rowUpdates.updated_at = now;
      const { data, error } = await supabaseServer
        .from("products")
        .update(rowUpdates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        const mapped = mapRowToProduct(data);
        const local = readLocalProducts();
        const nextLocal = local.map((p) => (p.id === id ? mapped : p));
        writeLocalProducts(nextLocal);
        return mapped;
      }
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  }

  // 2. Local & persistent store
  const items = readLocalProducts();
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = items[index];
  const updatedProduct: Product = {
    ...existing,
    ...updates,
    updatedAt: now,
  };

  items[index] = updatedProduct;
  writeLocalProducts(items);
  return updatedProduct;
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const { error } = await supabaseServer.from("products").delete().eq("id", id);
      if (!error) {
        const local = readLocalProducts();
        writeLocalProducts(local.filter((p) => p.id !== id));
        return true;
      }
    } catch (err) {
      console.error("Supabase delete error:", err);
    }
  }

  const items = readLocalProducts();
  const next = items.filter((p) => p.id !== id);
  writeLocalProducts(next);
  return true;
}

/**
 * Toggle stock status
 */
export async function toggleProductStock(id: string): Promise<Product | null> {
  const p = await getProductByIdOrSlug(id, true);
  if (!p) return null;
  return updateProduct(id, { inStock: !p.inStock });
}

/**
 * Toggle publication status
 */
export async function toggleProductPublish(id: string): Promise<Product | null> {
  const p = await getProductByIdOrSlug(id, true);
  if (!p) return null;
  return updateProduct(id, { isPublished: !p.isPublished });
}

/**
 * Dashboard stats
 */
export async function getDashboardStats() {
  const products = await getProducts({ includeUnpublished: true });
  const total = products.length;
  const published = products.filter((p) => p.isPublished).length;
  const inStock = products.filter((p) => p.inStock).length;
  const outOfStock = products.filter((p) => !p.inStock).length;
  const lowStock = products.filter((p) => p.inStock && (p.stockCount ?? 0) <= 10).length;

  return {
    total,
    published,
    drafts: total - published,
    inStock,
    outOfStock,
    lowStock,
  };
}
