"""Export responsive WebP variants of the existing hero; requires Pillow.

Run from the repository root. The approved original is never overwritten.
"""
from pathlib import Path
from PIL import Image

IMAGES = Path(__file__).resolve().parents[1] / "public/images"
original = Image.open(IMAGES / "institutional-architecture.webp").convert("RGB")
assert original.size == (1920, 1280)

# At <=760px the hero is at least 692px tall, so object-fit: cover hides
# these edges. Crop at the existing 72% horizontal position. Keeping that
# same object-position on the result preserves the visible composition.
mobile_width = 1408
left = round((original.width - mobile_width) * .72)
mobile = original.crop((left, 0, left + mobile_width, original.height))

for image, prefix, widths in [
    (original, "hero-architecture", [1056, 1440, 1920]),
    (mobile, "hero-architecture-mobile", [704, 1056, 1408]),
]:
    for width in widths:
        height = round(image.height * width / image.width)
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            IMAGES / f"{prefix}-{width}.webp", quality=85, method=6)
