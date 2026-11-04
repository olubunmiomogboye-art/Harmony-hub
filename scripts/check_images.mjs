import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        results = results.concat(walk(fullPath));
      }
    } else if (/\.(tsx|ts|jsx|js|json)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk("src");
const imageRegex = /["'`]((\/images\/[a-zA-Z0-9_\-\./]+\.(jpg|jpeg|png|webp|svg|gif)))["'`]/g;
const missing = new Set();
const found = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const imgPath = match[1];
    const diskPath = path.join("public", imgPath);
    if (!fs.existsSync(diskPath)) {
      missing.add(`${imgPath} (referenced in ${file})`);
    } else {
      found.add(imgPath);
    }
  }
});

console.log("Found valid image references:", found.size);
if (missing.size > 0) {
  console.log("MISSING IMAGES:", Array.from(missing));
} else {
  console.log("Zero missing image references in code!");
}

// Also check all products in products.json and products.ts
const productsJson = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const missingProducts = [];
productsJson.forEach(p => {
  if (p.image && p.image.startsWith("/")) {
    const pPath = path.join("public", p.image);
    if (!fs.existsSync(pPath)) {
      missingProducts.push({ id: p.id, name: p.name, image: p.image });
    }
  }
});

if (missingProducts.length > 0) {
  console.log("MISSING PRODUCT IMAGES:", missingProducts);
} else {
  console.log(`All ${productsJson.length} products in products.json have valid images on disk!`);
}
