import fs from "fs";
import path from "path";
import { getProducts, updateProduct } from "./db";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount: number;
  createdAt: string;
}

const CATEGORIES_PATH = path.join(process.cwd(), "src/data/categories.json");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function readLocalCategories(): CategoryItem[] {
  try {
    if (!fs.existsSync(CATEGORIES_PATH)) {
      return [];
    }
    const data = fs.readFileSync(CATEGORIES_PATH, "utf-8");
    return JSON.parse(data) as CategoryItem[];
  } catch (err) {
    console.error("Error reading categories:", err);
    return [];
  }
}

export function writeLocalCategories(cats: CategoryItem[]): boolean {
  try {
    fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(cats, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing categories:", err);
    return false;
  }
}

/**
 * Get all categories with dynamic live product counts
 */
export async function getLiveCategories(): Promise<CategoryItem[]> {
  const cats = readLocalCategories();
  const products = await getProducts({ includeUnpublished: true });

  return cats.map((cat) => {
    const count = products.filter(
      (p) => p.categorySlug === cat.slug || p.category === cat.name
    ).length;
    return {
      ...cat,
      itemCount: count,
    };
  });
}

/**
 * Create a new category
 */
export async function createCategory(data: {
  name: string;
  description?: string;
  image?: string;
}): Promise<CategoryItem> {
  const cats = readLocalCategories();
  const slug = slugify(data.name);

  if (cats.some((c) => c.slug === slug || c.name.toLowerCase() === data.name.toLowerCase())) {
    throw new Error(`Category "${data.name}" already exists.`);
  }

  const newCategory: CategoryItem = {
    id: slug,
    name: data.name.trim(),
    slug,
    description: data.description?.trim() || "",
    image: data.image?.trim() || "",
    itemCount: 0,
    createdAt: new Date().toISOString(),
  };

  cats.push(newCategory);
  writeLocalCategories(cats);
  return newCategory;
}

/**
 * Update an existing category
 */
export async function updateCategory(
  slug: string,
  data: { name?: string; description?: string; image?: string }
): Promise<CategoryItem> {
  const cats = readLocalCategories();
  const index = cats.findIndex((c) => c.slug === slug || c.id === slug);

  if (index === -1) {
    throw new Error(`Category "${slug}" not found.`);
  }

  const existing = cats[index];
  const oldName = existing.name;
  const newName = data.name ? data.name.trim() : existing.name;
  const newSlug = data.name ? slugify(newName) : existing.slug;

  const updated: CategoryItem = {
    ...existing,
    name: newName,
    slug: newSlug,
    description: data.description !== undefined ? data.description.trim() : existing.description,
    image: data.image !== undefined ? data.image.trim() : existing.image,
  };

  cats[index] = updated;
  writeLocalCategories(cats);

  // If name or slug changed, update associated products
  if (newName !== oldName || newSlug !== slug) {
    const products = await getProducts({ includeUnpublished: true });
    for (const p of products) {
      if (p.categorySlug === slug || p.category === oldName) {
        await updateProduct(p.id, {
          category: newName as any,
          categorySlug: newSlug as any,
        });
      }
    }
  }

  return updated;
}

/**
 * Delete a category (with safety check)
 */
export async function deleteCategory(slug: string): Promise<boolean> {
  const cats = readLocalCategories();
  const index = cats.findIndex((c) => c.slug === slug || c.id === slug);

  if (index === -1) {
    throw new Error(`Category "${slug}" not found.`);
  }

  // Safety safeguard: check if products exist under this category
  const products = await getProducts({ includeUnpublished: true });
  const associated = products.filter(
    (p) => p.categorySlug === slug || p.category === cats[index].name
  );

  if (associated.length > 0) {
    throw new Error(
      `Cannot delete category "${cats[index].name}" because it still contains ${associated.length} product(s). Please reassign or delete the products first.`
    );
  }

  cats.splice(index, 1);
  return writeLocalCategories(cats);
}
