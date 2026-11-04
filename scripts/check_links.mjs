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
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk("src");
const linkRegex = /href=["'`]((\/[a-zA-Z0-9_\-\/#]*))["'`]/g;
const internalLinks = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    // ignore api or anchor-only
    if (!href.startsWith("/api") && !href.startsWith("/images")) {
      internalLinks.add(href);
    }
  }
});

console.log("Internal routes found:", Array.from(internalLinks).sort());
