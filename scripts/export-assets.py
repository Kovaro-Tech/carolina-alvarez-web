"""Deterministic exports of existing artwork; requires Python and Pillow.

Run from the repository root. Originals are never overwritten.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parents[1] / "public"
logo = Image.open(PUBLIC / "images/logo.png").convert("RGBA")
# Ignore near-transparent export noise when measuring the approved visible mark.
bounds = logo.getchannel("A").point(lambda alpha: 255 if alpha > 16 else 0).getbbox()
mark = logo.crop(bounds)


def square_icon(size):
    scale = size * 0.92 / max(mark.size)
    artwork = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(artwork, ((size - artwork.width) // 2, (size - artwork.height) // 2))
    return canvas


for size, name in [(16, "favicon-16x16"), (32, "favicon-32x32"),
                   (180, "apple-touch-icon"), (192, "icon-192"), (512, "icon-512")]:
    square_icon(size).save(PUBLIC / f"{name}.png", optimize=True)
square_icon(48).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

portrait = Image.open(PUBLIC / "images/carolina_4.jpeg").convert("RGB")
for width in [380, 760, 1140]:
    height = round(portrait.height * width / portrait.width)
    portrait.resize((width, height), Image.Resampling.LANCZOS).save(
        PUBLIC / f"images/carolina_4-{width}.webp", quality=90, method=6)

# Minimal social card using the existing palette, mark and professional name.
# Georgia is the site's declared serif fallback; no font file is redistributed.
font_path = Path("C:/Windows/Fonts/georgia.ttf")
if not font_path.exists():
    raise SystemExit("Social image export requires Georgia; existing exported assets remain usable.")
card = Image.new("RGB", (1200, 630), "#f8fafc")
artwork = square_icon(310)
card.paste(artwork, (115, 160), artwork)
draw = ImageDraw.Draw(card)
draw.text((495, 226), "Carolina", font=ImageFont.truetype(str(font_path), 66), fill="#071b33")
draw.text((495, 304), "Álvarez", font=ImageFont.truetype(str(font_path), 66), fill="#071b33")
card.save(PUBLIC / "images/og-carolina-alvarez.png", optimize=True)
