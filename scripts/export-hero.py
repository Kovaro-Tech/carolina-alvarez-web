"""Export responsive WebP and AVIF variants of the existing hero; requires Pillow 11.3+.

Run from the repository root. The approved original is never overwritten.
"""
import io
import math
from pathlib import Path
from PIL import Image, ImageChops

IMAGES = Path(__file__).resolve().parents[1] / "public/images"
original = Image.open(IMAGES / "institutional-architecture.webp").convert("RGB")
assert original.size == (1920, 1280)


def psnr(reference, image):
    histogram = ImageChops.difference(reference, image).histogram()
    squared = sum(count * (index % 256) ** 2 for index, count in enumerate(histogram))
    return 10 * math.log10(255 ** 2 / (squared / (reference.width * reference.height * 3)))


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
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        webp = IMAGES / f"{prefix}-{width}.webp"
        resized.save(webp, quality=85, method=6)
        # AVIF is preferred by the <picture>. Use the lowest quality whose
        # fidelity to the resized source is at least that of the WebP file.
        target = psnr(resized, Image.open(webp).convert("RGB"))
        for quality in range(60, 91):
            encoded = io.BytesIO()
            resized.save(encoded, "AVIF", quality=quality, speed=2)
            if psnr(resized, Image.open(io.BytesIO(encoded.getvalue())).convert("RGB")) >= target:
                break
        (IMAGES / f"{prefix}-{width}.avif").write_bytes(encoded.getvalue())
        print(f"{prefix}-{width}: webp {webp.stat().st_size} B, avif q{quality} {len(encoded.getvalue())} B")
