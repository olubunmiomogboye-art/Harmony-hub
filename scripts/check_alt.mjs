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
    } else if (/\.(tsx|jsx)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk("src");
let imageTagsWithoutAlt = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  const regex = /<Image\b([^>]*)/gs;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tagContent = match[1];
    if (!tagContent.includes("alt=")) {
      console.log(`Image without alt in ${file}: <Image ${tagContent.trim().slice(0, 60)}...`);
      imageTagsWithoutAlt++;
    }
  }
});

console.log(`Total Image tags without alt: ${imageTagsWithoutAlt}`);
