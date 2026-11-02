import json
import urllib.request
import os
import re
import subprocess

def slugify(text):
    text = text.lower()
    text = re.sub(r'[\(\)\,\.\'\’\n]', '', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def main():
    with open('scripts/figma_images_map.json') as f:
        images_map = json.load(f)

    with open('scripts/figma_shop_tree.json') as f:
        data = json.load(f)

    doc = data['nodes']['32:815']['document']

    cards = []

    def find_cards(node):
        children = node.get('children', [])
        image_refs = []
        text_contents = []
        
        def scan_sub(sub):
            for fill in sub.get('fills', []):
                if fill.get('type') == 'IMAGE':
                    ref = fill.get('imageRef')
                    if ref and ref not in image_refs:
                        image_refs.append(ref)
            if sub.get('type') == 'TEXT':
                chars = sub.get('characters', '').strip()
                if chars:
                    text_contents.append(chars)
            for c in sub.get('children', []):
                scan_sub(c)
                
        scan_sub(node)
        
        num_prices = sum(1 for t in text_contents if '₦' in t or ('#' in t and any(d.isdigit() for d in t)))
        if num_prices == 1 and len(image_refs) > 0 and len(text_contents) >= 2:
            cards.append({
                'id': node['id'],
                'name': node.get('name'),
                'texts': text_contents,
                'images': image_refs,
            })
            return
                
        for c in children:
            find_cards(c)

    find_cards(doc)
    print(f"Total cards identified: {len(cards)}")

    os.makedirs("public/images/products", exist_ok=True)

    # Load existing products to match and update images
    with open("src/data/products.json") as f:
        existing_products = json.load(f)

    updated_count = 0

    for i, card in enumerate(cards):
        texts = card['texts']
        img_ref = card['images'][0]
        s3_url = images_map.get(img_ref)
        
        if not s3_url:
            print(f"Warning: No S3 URL for {img_ref}")
            continue

        # Extract title from card texts:
        # texts usually has: [category_label, title, subtitle_or_size, price, CTA, ...]
        title = texts[1]
        if '₦' in title or 'ADD TO CART' in title:
            title = texts[0]

        # Clean title
        title_clean = title.replace('\n', ' ').strip()
        slug = slugify(title_clean)
        
        filename = f"{slug}.jpg"
        dest_path = os.path.join("public/images/products", filename)
        
        print(f"[{i+1}/36] Downloading image for '{title_clean}'...")
        print(f"       imageRef: {img_ref[:10]} -> {dest_path}")
        
        try:
            urllib.request.urlretrieve(s3_url, dest_path)
            
            # Generate WebP version using cwebp or sips
            webp_path = os.path.join("public/images/products", f"{slug}.webp")
            subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "85", dest_path, "--out", dest_path], check=False, stdout=subprocess.DEVNULL)
            
            # Find matching product in existing_products
            matched = False
            for p in existing_products:
                # Match by slug or name similarity
                p_slug = p['slug']
                p_name = p['name'].lower()
                clean_lower = title_clean.lower()
                
                if (p_slug == slug or 
                    p_name in clean_lower or 
                    clean_lower in p_name or 
                    slugify(p['name']) == slug):
                    p['image'] = f"/images/products/{filename}"
                    matched = True
                    updated_count += 1
                    print(f"       MATCHED product: {p['name']} -> {p['image']}")
                    break
            
            if not matched:
                # Fallback matching by index if ordering is identical
                if i < len(existing_products):
                    p = existing_products[i]
                    p['image'] = f"/images/products/{filename}"
                    print(f"       INDEX MATCH ({i}): {p['name']} -> {p['image']}")
                    updated_count += 1
                    
        except Exception as e:
            print(f"       Error downloading {dest_path}: {e}")

    print(f"\nUpdated {updated_count} products with their real Figma images.")

    # Save updated products.json
    with open("src/data/products.json", "w", encoding="utf-8") as f:
        json.dump(existing_products, f, indent=2)

    print("Successfully saved updated src/data/products.json!")

if __name__ == "__main__":
    main()
