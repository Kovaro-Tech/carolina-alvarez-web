"""Export responsive variants of the approved logo; requires Pillow 11.3+.

Run from the repository root. Preserve the original canvas and transparency;
logo.png remains the source for favicon and social image exports.
"""
from pathlib import Path
from PIL import Image

IMAGES = Path(__file__).resolve().parents[1] / "public/images"
original = Image.open(IMAGES / "logo.png").convert("RGBA")

for width in (220, 440):
    height = round(original.height * width / original.width)
    logo = original.resize((width, height), Image.Resampling.LANCZOS)
    # Lossless encoding preserves the resized colors and alpha exactly.
    target = IMAGES / f"logo-{width}.webp"
    logo.save(target, lossless=True, method=6, exact=True)
    print(f"{target.name}: {width} x {height}, {target.stat().st_size} bytes")
    # AVIF is served first. At quality 85 its anti-aliased edges stay within
    # ~45 dB PSNR of the lossless file over both header backgrounds; alpha kept.
    target = IMAGES / f"logo-{width}.avif"
    logo.save(target, quality=85, speed=0)
    print(f"{target.name}: {width} x {height}, {target.stat().st_size} bytes")
