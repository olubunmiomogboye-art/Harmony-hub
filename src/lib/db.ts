import fs from "fs";
import path from "path";
import { Product, ProductCategory, ProductCategorySlug, getCategorySlug } from "@/types/product";
import { supabaseServer, isSupabaseServerConfigured } from "@/lib/supabase/server";

const JSON_DB_PATH = path.join(process.cwd(), "src/data/products.json");

/**
 * Read local JSON products store
 */
function readLocalProducts(): Product[] {
  try {
    if (!fs.existsSync(JSON_DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(JSON_DB_PATH, "utf-8");
    return JSON.parse(data) as Product[];
  } catch (error) {
    console.error("Error reading local products store:", error);
    return [];
  }
}

/**
 * Write to local JSON products store
 */
function writeLocalProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to local products store:", error);
    return false;
  }
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
 * Get products matching options
 */
export async function getProducts(options: ProductQueryOptions = {}): Promise<Product[]> {
  const { categorySlug, includeUnpublished = false, search, sort = "featured" } = options;

  // Supabase implementation
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
        query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%`);
      }

      // Sort
      switch (sort) {
        case "price-low":
          query = query.order("price", { ascending: true });
          break;
        case "price-high":
          query = query.order("price", { ascending: false });
          break;
        case "name":
          query = query.order("name", { ascending: true });
          break;
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        default:
          query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (!error && data) {
        return data.map(mapRowToProduct);
      }
      console.warn("Supabase query returned error, using fallback:", error);
    } catch (err) {
      console.error("Supabase query exception, using fallback:", err);
    }
  }

  // Local JSON fallback
  let items = readLocalProducts();

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
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return items;
}

/**
 * Get product by ID or Slug
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const { data, error } = await supabaseServer
        .from("products")
        .select("*")
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle();

      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      console.error("Supabase getById error, using fallback:", err);
    }
  }

  const items = readLocalProducts();
  const found = items.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return found || null;
}

/**
 * Create a new product
 */
export async function createProduct(payload: Partial<Product>): Promise<Product> {
  const now = new Date().toISOString();
  const slug =
    payload.slug ||
    (payload.name || "product")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const id = payload.id || `${slug}-${Date.now().toString(36)}`;
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
    stockCount: payload.stockCount ?? 10,
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

  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const row = mapProductToRow(newProduct);
      row.created_at = now;
      const { data, error } = await supabaseServer.from("products").insert([row]).select().single();
      if (!error && data) {
        // Also sync local file
        const local = readLocalProducts();
        writeLocalProducts([newProduct, ...local]);
        return mapRowToProduct(data);
      }
      console.warn("Supabase insert error, falling back to local:", error);
    } catch (err) {
      console.error("Supabase insert exception:", err);
    }
  }

  // Local fallback
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
        // Also update local file
        const items = readLocalProducts();
        const idx = items.findIndex((p) => p.id === id);
        if (idx !== -1) {
          items[idx] = { ...items[idx], ...updates, updatedAt: now };
          writeLocalProducts(items);
        }
        return mapRowToProduct(data);
      }
      console.warn("Supabase update error, falling back to local:", error);
    } catch (err) {
      console.error("Supabase update exception:", err);
    }
  }

  // Local fallback
  const items = readLocalProducts();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = items[idx];
  const category = updates.category || current.category;
  const categorySlug = updates.category ? getCategorySlug(updates.category) : current.categorySlug;

  const updated: Product = {
    ...current,
    ...updates,
    category,
    categorySlug,
    updatedAt: now,
  };

  items[idx] = updated;
  writeLocalProducts(items);
  return updated;
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const { error } = await supabaseServer.from("products").delete().eq("id", id);
      if (!error) {
        const items = readLocalProducts().filter((p) => p.id !== id);
        writeLocalProducts(items);
        return true;
      }
      console.warn("Supabase delete error:", error);
    } catch (err) {
      console.error("Supabase delete exception:", err);
    }
  }

  const items = readLocalProducts();
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length === items.length) return false;
  return writeLocalProducts(filtered);
}

/**
 * Toggle stock status
 */
export async function toggleStockStatus(id: string): Promise<Product | null> {
  const product = await getProductByIdOrSlug(id);
  if (!product) return null;
  return updateProduct(id, { inStock: !product.inStock });
}

/**
 * Toggle publication status
 */
export async function togglePublishStatus(id: string): Promise<Product | null> {
  const product = await getProductByIdOrSlug(id);
  if (!product) return null;
  return updateProduct(id, { isPublished: !product.isPublished });
}

/**
 * Get dashboard overview metrics
 */
export async function getDashboardStats(): Promise<{
  total: number;
  published: number;
  outOfStock: number;
  drafts: number;
}> {
  const all = await getProducts({ includeUnpublished: true });
  return {
    total: all.length,
    published: all.filter((p) => p.isPublished).length,
    outOfStock: all.filter((p) => !p.inStock).length,
    drafts: all.filter((p) => !p.isPublished).length,
  };
}
