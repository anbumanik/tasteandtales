from PIL import Image
import os
import glob

def remove_background(image_path, bg_color=(250, 247, 242), tolerance=15):
    try:
        img = Image.open(image_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            r, g, b = item[:3]
            # Check if color is within tolerance of background color
            if (abs(r - bg_color[0]) <= tolerance and 
                abs(g - bg_color[1]) <= tolerance and 
                abs(b - bg_color[2]) <= tolerance):
                # Replace with transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Processed: {os.path.basename(image_path)}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    hero_dir = r"D:\taste&taste\public\images\hero"
    images = [
        "hero_sweet_ladoo.png",
        "hero_sweet_barfi.png",
        "hero_sweet_chakli.png",
        "hero_box_base.png",
        "hero_box_lid.png"
    ]
    
    for img_name in images:
        path = os.path.join(hero_dir, img_name)
        if os.path.exists(path):
            # Using a slightly higher tolerance for compression artifacts
            remove_background(path, tolerance=25)
        else:
            print(f"Not found: {path}")
