import { DitherTile } from "../noise/DitherTile.ts";

/**
 * Static steel bitmap dither tile for window panels. Unlike the page
 * background it never scrolls; the CSS fades it from right to left over the
 * panel fill. The color is a slightly brighter steel than the panel
 * background, resolved through the theme.
 */
export const windowDitherTile = new DitherTile({
    cells: 64,
    color: "var(--color-steel-900, #365461)",
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
