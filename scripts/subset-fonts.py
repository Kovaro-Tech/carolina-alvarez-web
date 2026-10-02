"""Split each Latin webfont into a small "core" file; requires fonttools and brotli.

Run from the repository root: python scripts/subset-fonts.py
Outlines, metrics, variation axes and OpenType features are kept unchanged.
src/fonts.css serves the core file for the characters below and the original
Google Latin file, through the complementary unicode-range, for any other
Latin character. Copy the printed ranges there if CORE changes.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "public/fonts"
SOURCES = {
    "dm-sans-latin-core.woff2": "rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2",
    "dm-serif-display-latin-core.woff2": "-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2",
    "dm-serif-display-italic-latin-core.woff2": "-nFhOHM81r4j6k0gjAW3mujVU2B2G_VB0PD2.woff2",
}
# Printable ASCII, Spanish letters and punctuation, and typographic marks.
CORE = set(range(0x20, 0x7F)) | {ord(c) for c in "\u00a0¡©«®°ª·º»¿ÁÉÍÑÓÚÜáéíñóúü–—‘’‚“”„…•€−"}
# The Latin subset served by Google Fonts for these files.
LATIN = (set(range(0x0000, 0x0100)) | {0x0131, 0x0152, 0x0153, 0x02BB, 0x02BC, 0x02C6, 0x02DA, 0x02DC, 0x0304, 0x0308, 0x0329}
         | set(range(0x2000, 0x2070)) | {0x20AC, 0x2122, 0x2191, 0x2193, 0x2212, 0x2215, 0xFEFF, 0xFFFD})
# Control characters never draw a glyph and must not trigger the full file.
CONTROLS = set(range(0x20)) | set(range(0x7F, 0xA0))


def unicode_range(codepoints):
    ranges, ordered = [], sorted(codepoints)
    start = previous = ordered[0]
    for point in ordered[1:] + [None]:
        if point is not None and point == previous + 1:
            previous = point
            continue
        ranges.append(f"U+{start:04X}" if start == previous else f"U+{start:04X}-{previous:04X}")
        if point is not None:
            start = previous = point
    return ", ".join(ranges)


options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]
options.name_IDs = ["*"]
options.name_languages = ["*"]
options.notdef_outline = True
options.legacy_kern = True
for target, source in SOURCES.items():
    font = TTFont(FONTS / source)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=sorted(CORE & set(font.getBestCmap())))
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(FONTS / target)
    print(f"{target}: {(FONTS / source).stat().st_size} -> {(FONTS / target).stat().st_size} bytes")

print("core unicode-range:", unicode_range(CORE & LATIN))
print("rest unicode-range:", unicode_range(LATIN - CORE - CONTROLS))

# Site text outside the core still renders correctly, but costs the full file.
used = set()
for path in [*ROOT.glob("src/**/*.js"), *ROOT.glob("src/**/*.jsx")]:
    used |= {ord(c) for c in path.read_text(encoding="utf8")}
extra = sorted((used & LATIN) - CORE - CONTROLS)
if extra:
    print("warning: site text uses non-core Latin characters:", " ".join(f"U+{c:04X}" for c in extra))
