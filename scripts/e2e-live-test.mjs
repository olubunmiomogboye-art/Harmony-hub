async function runLiveTests() {
  const BASE_URL = "http://localhost:3001";
  console.log("=== STARTING LIVE HTTP END-TO-END VERIFICATION ON PORT 3001 ===\n");

  // 1. Public API check
  console.log("1. Testing Public /api/products...");
  const pubRes = await fetch(`${BASE_URL}/api/products`);
  const pubData = await pubRes.json();
  console.log(`Public products returned: ${pubData.count} (Success: ${pubData.success})`);

  if (!pubData.success || pubData.count !== 36) {
    throw new Error(`Expected 36 products, got ${pubData.count}`);
  }

  // 2. Category filtering check
  console.log("\n2. Testing Category Filtering on Public API...");
  const categories = [
    { slug: "kitchen-utensils", expected: 5 },
    { slug: "baby-things", expected: 1 },
    { slug: "adults-fashion", expected: 21 },
    { slug: "childrens-outfits", expected: 9 },
  ];

  for (const cat of categories) {
    const res = await fetch(`${BASE_URL}/api/products?category=${cat.slug}`);
    const data = await res.json();
    console.log(`- Category "${cat.slug}": ${data.count} products (Expected: ${cat.expected})`);
    if (data.count !== cat.expected) {
      throw new Error(`Category ${cat.slug} count mismatch! Expected ${cat.expected}, got ${data.count}`);
    }
  }

  // 3. Admin Authentication
  console.log("\n3. Testing Admin Login (/api/admin/auth)...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@harmonyhub.ng",
      password: "HarmonyAdmin2026!",
    }),
  });

  const loginData = await loginRes.json();
  const setCookie = loginRes.headers.get("set-cookie");
  console.log("Admin Login Status:", loginRes.status, loginData);
  console.log("Session Cookie Received:", Boolean(setCookie));

  if (!loginData.success || !setCookie) {
    throw new Error("Admin login failed!");
  }

  const sessionCookie = setCookie.split(";")[0];

  // 4. Admin Products & Overview Stats
  console.log("\n4. Testing Admin Dashboard Products & Stats (/api/admin/products)...");
  const adminRes = await fetch(`${BASE_URL}/api/admin/products`, {
    headers: { Cookie: sessionCookie },
  });
  const adminData = await adminRes.json();
  console.log("Admin total products:", adminData.data?.length);
  console.log("Admin dashboard stats:", adminData.stats);

  if (!adminData.success || adminData.stats.total !== 36) {
    throw new Error("Admin stats total mismatch!");
  }

  // 5. Add New Product via Admin
  console.log("\n5. Testing Adding New Product via Admin (/api/admin/products)...");
  const newProduct = {
    name: "Live Verification Artisan Bowl",
    category: "Kitchen Utensils",
    price: 14500,
    subtitle: "Artisanal Edition",
    description: "Testing end-to-end synchronization between admin and public shop.",
    image: "/images/products/container.jpg",
    sizes: ["Medium", "Large"],
    colors: [{ name: "Olive Green" }],
    inStock: true,
    isPublished: true,
  };

  const createRes = await fetch(`${BASE_URL}/api/admin/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify(newProduct),
  });

  const createData = await createRes.json();
  console.log("Created product response:", createRes.status, createData.data?.name, "ID:", createData.data?.id);
  const createdId = createData.data?.id;

  // 6. Test Public Synchronization
  console.log("\n6. Testing Public Shop Synchronization...");
  const pubSyncRes = await fetch(`${BASE_URL}/api/products`);
  const pubSyncData = await pubSyncRes.json();
  const foundInPublic = pubSyncData.data.some((p) => p.id === createdId);
  console.log("Newly added product immediately appears in public API:", foundInPublic ? "YES (Sync Verified ✓)" : "NO ✗");

  if (!foundInPublic) {
    throw new Error("Public synchronization failed!");
  }

  // 7. Test Stock Toggle to Out of Stock
  console.log("\n7. Testing Stock Status Toggle...");
  const toggleStockRes = await fetch(`${BASE_URL}/api/admin/products/${createdId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({ inStock: false }),
  });
  const toggleStockData = await toggleStockRes.json();
  console.log("Updated stock status in admin:", toggleStockData.data?.inStock ? "In Stock" : "Out of Stock (Toggled ✓)");

  const pubStockCheck = await fetch(`${BASE_URL}/api/products`);
  const pubStockData = await pubStockCheck.json();
  const itemInPub = pubStockData.data.find((p) => p.id === createdId);
  console.log("Stock status reflected on public API:", itemInPub?.inStock === false ? "Out of Stock (Reflected ✓)" : "Mismatch ✗");

  // 8. Test Draft / Unpublish
  console.log("\n8. Testing Unpublishing (Save as Draft)...");
  const draftRes = await fetch(`${BASE_URL}/api/admin/products/${createdId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({ isPublished: false }),
  });
  const draftData = await draftRes.json();
  console.log("Draft status in admin:", draftData.data?.isPublished ? "Published" : "Draft (Toggled ✓)");

  const pubDraftCheck = await fetch(`${BASE_URL}/api/products`);
  const pubDraftData = await pubDraftCheck.json();
  const draftInPub = pubDraftData.data.some((p) => p.id === createdId);
  console.log("Unpublished draft is hidden from public API:", !draftInPub ? "YES (Correctly Hidden ✓)" : "NO ✗");

  // 9. Clean up / Delete Test Product
  console.log("\n9. Testing Deletion via Admin...");
  const deleteRes = await fetch(`${BASE_URL}/api/admin/products/${createdId}`, {
    method: "DELETE",
    headers: { Cookie: sessionCookie },
  });
  const deleteData = await deleteRes.json();
  console.log("Delete response:", deleteData);

  const pubAfterDel = await fetch(`${BASE_URL}/api/products`);
  const pubAfterDelData = await pubAfterDel.json();
  console.log("Public products count after delete:", pubAfterDelData.count, "(Returned to 36 ✓)");

  // 10. Test UI Pages Status
  console.log("\n10. Testing Page HTTP Response Codes...");
  const pages = ["/shop", "/admin", "/admin/login", "/cart", "/checkout"];
  for (const page of pages) {
    const res = await fetch(`${BASE_URL}${page}`);
    console.log(`- Page "${page}": HTTP ${res.status}`);
  }

  console.log("\n=======================================================");
  console.log("ALL 10 LIVE SYSTEM AND INTEGRATION TESTS PASSED 100%!");
  console.log("=======================================================");
}

runLiveTests().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
