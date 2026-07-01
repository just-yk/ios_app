#!/usr/bin/env python3
"""Generate app icons with no third-party deps (pure stdlib PNG writer).

Draws a rounded-square indigo tile with a white checkmark — a simple,
recognizable icon for a quiz/study app. Regenerate with: python3 gen_icons.py
"""
import struct, zlib, math, os

HERE = os.path.dirname(os.path.abspath(__file__))

BG_TOP = (79, 70, 229)     # indigo-600
BG_BOT = (124, 58, 237)    # violet-600
FG = (255, 255, 255)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rounded_alpha(x, y, size, radius):
    """1.0 inside a rounded square, 0.0 outside, soft edge."""
    r = radius
    cx = min(max(x, r), size - r)
    cy = min(max(y, r), size - r)
    d = math.hypot(x - cx, y - cy)
    return max(0.0, min(1.0, (r - d) + 0.5)) if (x < r or x > size - r or y < r or y > size - r) else 1.0


def dist_to_segment(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    if dx == dy == 0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def make_png(size, maskable=False):
    pad = 0 if maskable else 0
    radius = size * (0.10 if maskable else 0.22)
    # checkmark geometry (scaled to size)
    stroke = size * 0.085
    p1 = (size * 0.28, size * 0.53)
    p2 = (size * 0.44, size * 0.69)
    p3 = (size * 0.74, size * 0.34)

    raw = bytearray()
    for y in range(size):
        raw.append(0)  # filter type 0
        for x in range(size):
            a = 1.0 if maskable else rounded_alpha(x + 0.5, y + 0.5, size, radius)
            bg = lerp(BG_TOP, BG_BOT, y / size)
            # checkmark coverage
            d = min(
                dist_to_segment(x + 0.5, y + 0.5, *p1, *p2),
                dist_to_segment(x + 0.5, y + 0.5, *p2, *p3),
            )
            cov = max(0.0, min(1.0, (stroke / 2 - d) + 0.5))
            col = lerp(bg, FG, cov)
            if a >= 0.999:
                raw += bytes(col)
            else:
                # composite over transparent -> premultiplied not needed, use white-ish? keep opaque tile only
                col = lerp(col, BG_TOP, 0)  # noop; edge softness handled below
                raw += bytes(lerp((255, 255, 255), col, a)) if a > 0 else bytes((255, 255, 255))
        # note: we output RGB (opaque) for max iOS compatibility
    return encode_png(size, size, bytes(raw))


def encode_png(w, h, rgb_rows):
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)  # 8-bit, color type 2 (RGB)
    idat = zlib.compress(rgb_rows, 9)
    return sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")


for name, size, mask in [
    ("icon-192.png", 192, False),
    ("icon-512.png", 512, False),
    ("icon-512-maskable.png", 512, True),
    ("apple-touch-icon.png", 180, True),
]:
    with open(os.path.join(HERE, name), "wb") as f:
        f.write(make_png(size, mask))
    print("wrote", name)
