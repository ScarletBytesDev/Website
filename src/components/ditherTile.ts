export const DITHER_TILE_CELLS = 512;

export type DitherTileOptions = {
  cells: number;
  color: string;
  density: number;
  contrast: number;
  scale: number;
  octaves: number;
  detailScale: number;
  detailOctaves: number;
  detailStrength: number;
  seed: number;
  maxFill: number;
  jitter: number;
};

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mod(value: number, period: number): number {
  return ((value % period) + period) % period;
}

function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const GRADIENTS: ReadonlyArray<readonly [number, number]> = Array.from(
  { length: 16 },
  (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return [Math.cos(angle), Math.sin(angle)] as const;
  },
);

function gradientDot(
  ix: number,
  iy: number,
  seed: number,
  dx: number,
  dy: number,
): number {
  const g = GRADIENTS[
    Math.floor(hash2(ix, iy, seed) * GRADIENTS.length) % GRADIENTS.length
  ];
  return g[0] * dx + g[1] * dy;
}

function perlinNoise(x: number, y: number, period: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;

  const u = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
  const v = fy * fy * fy * (fy * (fy * 6 - 15) + 10);

  const ix0 = mod(x0, period);
  const iy0 = mod(y0, period);
  const ix1 = mod(x0 + 1, period);
  const iy1 = mod(y0 + 1, period);

  const n00 = gradientDot(ix0, iy0, seed, fx, fy);
  const n10 = gradientDot(ix1, iy0, seed, fx - 1, fy);
  const n01 = gradientDot(ix0, iy1, seed, fx, fy - 1);
  const n11 = gradientDot(ix1, iy1, seed, fx - 1, fy - 1);

  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
}

function fbm(
  x: number,
  y: number,
  cells: number,
  scale: number,
  octaves: number,
  seed: number,
): number {
  let amplitude = 1;
  let sum = 0;
  let norm = 0;

  for (let o = 0; o < octaves; o++) {
    const period = Math.max(1, Math.round(cells / (scale * 2 ** o)));
    const frequency = period / cells;
    sum += amplitude * perlinNoise(x * frequency, y * frequency, period, seed + o * 1013);
    norm += amplitude;
    amplitude *= 0.5;
  }

  return clamp((sum / norm) * 0.6 + 0.5, 0, 1);
}

function parseColor(
  ctx: CanvasRenderingContext2D,
  css: string,
): [number, number, number] {
  ctx.fillStyle = "#000000";
  ctx.fillStyle = css;
  const normalized = ctx.fillStyle;

  if (normalized.startsWith("#")) {
    const hex = normalized.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  }

  const match = normalized.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const [r, g, b] = match[1]
      .split(/[,/\s]+/)
      .filter(Boolean)
      .map(Number);
    return [r, g, b];
  }

  return [255, 255, 255];
}

export function createDitherTile({
  cells,
  color,
  density,
  contrast,
  scale,
  octaves,
  detailScale,
  detailOctaves,
  detailStrength,
  seed,
  maxFill,
  jitter,
}: DitherTileOptions): string {
  const size = cells;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const [r, g, b] = parseColor(ctx, color);
  const image = ctx.createImageData(size, size);
  const data = image.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const island = fbm(x, y, cells, scale, octaves, seed);
      const detail = fbm(x, y, cells, detailScale, detailOctaves, seed + 31337);
      const n = clamp(island + (detail - 0.5) * detailStrength, 0, 1);
      const p = clamp((n - 0.5) * contrast + density, 0, maxFill);
      const bayer = BAYER_4X4[y % 4][x % 4];
      const threshold =
        bayer * (1 - jitter) + hash2(x, y, seed + 991) * jitter;

      if (threshold < p) {
        const i = (y * size + x) * 4;
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = Math.round(255 * clamp(0.4 + 0.6 * n, 0, 1));
      }
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}
