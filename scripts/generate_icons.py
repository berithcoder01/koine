from PIL import Image
import os

SRC = r"C:\Users\marco\Documents\BerithCode\Koine\inspirações\icon.png"
OUT = r"C:\Users\marco\Documents\BerithCode\Koine\android\app\src\main\res"
BG_COLOR = (233, 103, 45)  # #e9672d

# Android icon densities: name -> (launcher_size, foreground_size)
DENSITIES = {
    "mipmap-mdpi":    (48,  108),
    "mipmap-hdpi":    (72,  162),
    "mipmap-xhdpi":   (96,  216),
    "mipmap-xxhdpi":  (144, 324),
    "mipmap-xxxhdpi": (192, 432),
}

img = Image.open(SRC).convert("RGBA")
pixels = img.load()
width, height = img.size

# Replace black background with #e9672d
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Black pixels -> orange background
        if r < 30 and g < 30 and b < 30:
            pixels[x, y] = (BG_COLOR[0], BG_COLOR[1], BG_COLOR[2], 255)

# Create square canvas with background color (for adaptive icon)
def make_foreground(src_img, size):
    """Create foreground layer: logo centered on transparent canvas"""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # Resize logo to fit within 66% of canvas (safe zone)
    safe_zone = int(size * 0.66)
    logo = src_img.copy()
    logo.thumbnail((safe_zone, safe_zone), Image.LANCZOS)
    # Center on canvas
    offset = (size - logo.width) // 2, (size - logo.height) // 2
    canvas.paste(logo, offset, logo if logo.mode == "RGBA" else None)
    return canvas

def make_launcher(src_img, size):
    """Create launcher icon: logo centered on background color"""
    canvas = Image.new("RGBA", (size, size), BG_COLOR + (255,))
    logo = src_img.copy()
    # Leave some padding
    padding = int(size * 0.15)
    logo.thumbnail((size - padding * 2, size - padding * 2), Image.LANCZOS)
    offset = (size - logo.width) // 2, (size - logo.height) // 2
    canvas.paste(logo, offset, logo if logo.mode == "RGBA" else None)
    return canvas

for density, (launcher_size, fg_size) in DENSITIES.items():
    folder = os.path.join(OUT, density)
    os.makedirs(folder, exist_ok=True)

    # Foreground (adaptive icon layer)
    fg = make_foreground(img, fg_size)
    fg.save(os.path.join(folder, "ic_launcher_foreground.png"), "PNG")

    # Standard launcher
    launcher = make_launcher(img, launcher_size)
    launcher.save(os.path.join(folder, "ic_launcher.png"), "PNG")

    # Round launcher (same for adaptive icons, Android handles masking)
    launcher.save(os.path.join(folder, "ic_launcher_round.png"), "PNG")

    print(f"[OK] {density}: launcher={launcher_size}x{launcher_size}, foreground={fg_size}x{fg_size}")

print("\nDone! All icons generated.")
