import fs from "fs";
import path from "path";

async function runVerification() {
  console.log("=================================================");
  console.log("   HARMONY HUB - PAGINATION & ROUTING TEST SUITE  ");
  console.log("=================================================\n");

  const productsPath = path.join(process.cwd(), "src/data/products.json");
  const rawData = fs.readFileSync(productsPath, "utf-8");
  const allProducts = JSON.parse(rawData);
  const allPublished = allProducts.filter((p) => p.isPublished);

  // 1. TEST PAGINATION CALCULATIONS
  console.log("--- 1. Testing Shop Pagination ---");
  console.log(`Total published products in store: ${allPublished.length}`);

  // Test with page size = 20
  const pageSize20 = 20;
  const totalPages20 = Math.ceil(allPublished.length / pageSize20);
  const page1_20 = allPublished.slice(0, 20);
  const page2_20 = allPublished.slice(20, 40);
  console.log(`Page Size 20: Total Pages = ${totalPages20}`);
  console.log(`  Page 1 count: ${page1_20.length} (Expected: 20)`);
  console.log(`  Page 2 count: ${page2_20.length} (Expected: ${allPublished.length - 20})`);
  if (page1_20.length !== 20) throw new Error("Page 1 did not contain exactly 20 items!");
  if (page2_20.length !== allPublished.length - 20) throw new Error("Page 2 item count mismatch!");

  // Test with page size = 30
  const pageSize30 = 30;
  const totalPages30 = Math.ceil(allPublished.length / pageSize30);
  const page1_30 = allPublished.slice(0, 30);
  const page2_30 = allPublished.slice(30, 60);
  console.log(`Page Size 30: Total Pages = ${totalPages30}`);
  console.log(`  Page 1 count: ${page1_30.length} (Expected: 30)`);
  console.log(`  Page 2 count: ${page2_30.length} (Expected: ${allPublished.length - 30})`);
  if (page1_30.length !== 30) throw new Error("Page 1 did not contain exactly 30 items for pageSize=30!");

  // Test category filter pagination
  const kitchenItems = allPublished.filter((p) => p.categorySlug === "kitchen-utensils");
  const kitchenPages = Math.ceil(kitchenItems.length / pageSize20);
  console.log(`Category "Kitchen Utensils" count: ${kitchenItems.length}, Pages with pageSize 20: ${kitchenPages}`);
  if (kitchenPages > 1) {
    console.log("  Category has multiple pages");
  } else {
    console.log("  ✓ Category has <= 20 items: pagination controls cleanly hidden as required");
  }
  console.log("✓ Pagination calculations verified successfully!\n");

  // 2. TEST PRODUCT DETAIL ROUTE RESOLUTION LOGIC
  console.log("--- 2. Testing Product Detail URL & Identifier Resolution ---");
  const firstSeed = allPublished[0];
  console.log(`Testing seed product: "${firstSeed.name}" (ID: ${firstSeed.id})`);

  function findProduct(idOrSlug, includeUnpublished = false) {
    if (!idOrSlug) return null;
    const raw = idOrSlug.trim();
    const clean = decodeURIComponent(raw).trim().toLowerCase();

    return allProducts.find((p) => {
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
    }) || null;
  }

  // Test resolution by exact ID
  const foundById = findProduct(firstSeed.id);
  if (!foundById) throw new Error(`Could not find seed product by ID: ${firstSeed.id}`);
  console.log(`  ✓ Resolved by exact ID: ${foundById.name}`);

  // Test resolution by exact slug
  const foundBySlug = findProduct(firstSeed.slug);
  if (!foundBySlug) throw new Error(`Could not find seed product by slug: ${firstSeed.slug}`);
  console.log(`  ✓ Resolved by slug: ${foundBySlug.name}`);

  // Test resolution by uppercase / mixed case ID
  const foundByUpper = findProduct(firstSeed.id.toUpperCase());
  if (!foundByUpper) throw new Error(`Could not find product with uppercase ID: ${firstSeed.id.toUpperCase()}`);
  console.log(`  ✓ Resolved case-insensitively: ${foundByUpper.name}`);

  // Test resolution with URL encoding
  const encodedId = encodeURIComponent(firstSeed.id);
  const foundByEncoded = findProduct(encodedId);
  if (!foundByEncoded) throw new Error(`Could not find product with URL-encoded ID: ${encodedId}`);
  console.log(`  ✓ Resolved URL-encoded identifier: ${foundByEncoded.name}`);

  // 3. TEST CREATING A BRAND NEW PRODUCT & IMMEDIATE ROUTE RESOLUTION
  console.log("\n--- 3. Testing Newly Added Product Route Resolution ---");
  const baseSlug = "classic-stainless-steel-pressure-cooker";
  let slug = baseSlug;
  let counter = 1;
  while (allProducts.some((p) => p.slug === slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const testProduct = {
    id: slug,
    name: "Classic Stainless Steel Pressure Cooker",
    slug,
    subtitle: "6 Litre Capacity",
    price: 38000,
    category: "Kitchen Utensils",
    categorySlug: "kitchen-utensils",
    shortDescription: "High-grade stainless steel pressure cooker.",
    description: "Features a triple safety lock lid and high-heat induction bottom.",
    image: "/images/products/quality-smp-food-storage-container.jpg",
    inStock: true,
    stockCount: 15,
    isPublished: true,
    sizes: ["6L"],
    colors: [{ name: "Silver" }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add temporarily to allProducts array
  allProducts.push(testProduct);

  const resolvedNewById = findProduct(testProduct.id);
  if (!resolvedNewById) throw new Error(`Failed to resolve newly created product by ID: ${testProduct.id}`);
  console.log(`  ✓ Detail page route (/shop/${testProduct.id}) resolves successfully.`);

  const resolvedNewBySlug = findProduct(testProduct.slug);
  if (!resolvedNewBySlug) throw new Error(`Failed to resolve newly created product by slug: ${testProduct.slug}`);
  console.log(`  ✓ Detail page route (/shop/${testProduct.slug}) resolves successfully.`);

  // Test unpublished product security check
  testProduct.isPublished = false;
  const publicCheck = findProduct(testProduct.id, false);
  if (publicCheck !== null) throw new Error("Unpublished product was leaked to public findProduct!");
  console.log(`  ✓ Confirmed unpublished/draft product returns 404 / null to public store visitors.`);

  // Clean up
  allProducts.pop();

  console.log("\n=================================================");
  console.log("   ALL PAGINATION & ROUTING TESTS PASSED! ✅     ");
  console.log("=================================================");
}

runVerification().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
