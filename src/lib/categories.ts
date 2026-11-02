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
const TMP_CATEGORIES_PATH = "/tmp/harmony_categories.json";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || "";
const GITHUB_REPO = "olubunmiomogboye-art/Harmony-hub";

let memoryCategories: CategoryItem[] | null = null;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Sync categories to GitHub repository for permanent persistence on serverless hosts
 */
async function syncCategoriesToGitHub(cats: CategoryItem[]) {
  if (!GITHUB_TOKEN) return;

  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/categories.json`;
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "HarmonyHub-Backend",
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    const getRes = await fetch(fileUrl, { headers });
    if (!getRes.ok) return;
    const getData = await getRes.json();
    const sha = getData.sha;

    const content = Buffer.from(JSON.stringify(cats, null, 2), "utf-8").toString("base64");
    await fetch(fileUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "chore(data): auto-sync categories from admin dashboard",
        content,
        sha,
      }),
    });
  } catch (err) {
    console.warn("GitHub category sync notice:", err);
  }
}

export function readLocalCategories(): CategoryItem[] {
  if (memoryCategories && memoryCategories.length > 0) {
    return memoryCategories;
  }

  // Check /tmp
  try {
    if (fs.existsSync(TMP_CATEGORIES_PATH)) {
      const tmpData = fs.readFileSync(TMP_CATEGORIES_PATH, "utf-8");
      const parsed = JSON.parse(tmpData) as CategoryItem[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCategories = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Fallback to bundled JSON
  try {
    if (fs.existsSync(CATEGORIES_PATH)) {
      const data = fs.readFileSync(CATEGORIES_PATH, "utf-8");
      const parsed = JSON.parse(data) as CategoryItem[];
      memoryCategories = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading categories:", err);
  }

  return [];
}

export function writeLocalCategories(cats: CategoryItem[]): boolean {
  memoryCategories = cats;

  // 1. Write to /tmp
  try {
    fs.writeFileSync(TMP_CATEGORIES_PATH, JSON.stringify(cats, null, 2), "utf-8");
  } catch {
    // ignore
  }

  // 2. Write to local repo file if writable
  try {
    fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(cats, null, 2), "utf-8");
  } catch {
    // ignore EROFS in serverless environments
  }

  // 3. Fire-and-forget sync to GitHub
  syncCategoriesToGitHub(cats).catch(() => {});

  return true;
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
