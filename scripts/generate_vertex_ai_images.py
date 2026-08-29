import os
import json
import time
import subprocess
import argparse
from io import BytesIO
from PIL import Image

# Google Cloud Vertex AI Configuration for RC Family Restaurant Lambasinghi
PROJECT_ID = "metal-density-504117-k9"
LOCATION = "us-central1"
BUCKET_NAME = "rc-family-restaurant-menu-assets"

MENU_ITEMS_FILE = os.path.join(os.path.dirname(__file__), "menu_items.json")
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), "generation_progress.json")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "menu_images")

os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_tribal_andhra_prompt(name, category, veg):
    veg_str = "pure vegetarian" if veg else "authentic non-vegetarian"
    return (
        f"A master commercial food photograph of authentic Lambasinghi style {name} ({category}, {veg_str}). "
        f"Cooked with traditional tribal Andhra mountain spices over firewood, served hot in rustic earthen clay pot "
        f"or natural bamboo platter with banana leaf lining. Garnished with sizzling curry leaves, slit green chilies, "
        f"and fresh coriander. Steam gently rising, appetizing warm natural lighting, 45-degree angle, ultra high resolution."
    )

def load_data():
    if os.path.exists(MENU_ITEMS_FILE):
        with open(MENU_ITEMS_FILE, "r", encoding="utf-8") as f:
            items = json.load(f)
    else:
        items = []
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
            progress = json.load(f)
    else:
        progress = {}
    return items, progress

def save_progress(progress):
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, indent=2)

def generate_image_item(client, item, progress):
    slug = item["id"]
    name = item["name"]
    category = item["category"]
    veg = item.get("veg", False)
    prompt = item.get("prompt") or get_tribal_andhra_prompt(name, category, veg)

    print(f"\n[START] Generating AI Image for: {name} ({slug})", flush=True)
    print(f"Prompt: {prompt}", flush=True)

    try:
        from google import genai
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=prompt
        )
        image_bytes = None
        for candidate in response.candidates:
            for part in candidate.content.parts:
                if part.inline_data and part.inline_data.data:
                    image_bytes = part.inline_data.data
                    break
            if image_bytes:
                break

        if not image_bytes:
            raise ValueError("No image data returned")

        img = Image.open(BytesIO(image_bytes))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img = img.resize((600, 600), Image.Resampling.LANCZOS)
        
        webp_path = os.path.join(OUTPUT_DIR, f"{slug}.webp")
        img.save(webp_path, "WEBP", quality=85, method=6)
        print(f"[SUCCESS] Saved WebP image to: {webp_path}", flush=True)
        progress[slug] = {"status": "generated", "path": f"/menu_images/{slug}.webp"}
        save_progress(progress)
        return True
    except Exception as e:
        print(f"[ERROR] {name}: {e}", flush=True)
        return False

if __name__ == "__main__":
    print("RC Family Restaurant — Vertex AI Lambasinghi Image Generator Script ready.")
