import { DitherTile } from "@code-of-chaos/dither";

/**
 * Static alpha dither tile for window panels. The tile is deliberately white
 * because the panel applies its theme-aware Tailwind color through a mask.
 */
export const windowDitherTile = new DitherTile({
    cells: 64,
    color: "#ffffff",
    density: 1,
    contrast: 1.7,
    scale: 100,
    octaves: 1,
    detailScale: 4,
    detailOctaves: 4,
    detailStrength: 0.5,
    clampLow: 0.3,
    clampHigh: 0.85,
    seed: 21,
    maxFill: 0.6,
    jitter: 0.3,
}).toDataURL();
