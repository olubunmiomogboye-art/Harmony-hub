import urllib.request
import json
import os
import re

TOKEN = os.environ.get("FIGMA_TOKEN", "")
FILE_KEY = "WFCEW71tm9FYqGoHPOkoZx"
SHOP_NODE_ID = "32:815"

HEADERS = {
    "X-Figma-Token": TOKEN
}

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

def main():
    print("1. Fetching image map from Figma API...")
    url_images = f"https://api.figma.com/v1/files/{FILE_KEY}/images"
    images_meta = fetch_json(url_images).get("meta", {}).get("images", {})
    print(f"   Found {len(images_meta)} image fill URLs in Figma file.")

    with open("scripts/figma_images_map.json", "w", encoding="utf-8") as f:
        json.dump(images_meta, f, indent=2)

    print("2. Fetching Shop node 32:815...")
    url_shop = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={SHOP_NODE_ID}"
    shop_data = fetch_json(url_shop)

    with open("scripts/figma_shop_tree.json", "w", encoding="utf-8") as f:
        json.dump(shop_data, f, indent=2)

    shop_doc = shop_data["nodes"][SHOP_NODE_ID]["document"]
    print("   Saved shop document tree.")

if __name__ == "__main__":
    main()
