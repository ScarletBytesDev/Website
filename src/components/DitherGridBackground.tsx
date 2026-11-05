import { useMemo } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createDitherTile, DITHER_TILE_CELLS } from "./ditherTile.ts";
import "./DitherGridBackground.css";

type CSSVars = CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

export interface DitherGridBackgroundProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  backgroundColor?: string;

  gridColor?: string;
  gridSize?: number;
  gridOpacity?: number;

  noiseColor?: string;
  noiseOpacity?: number;
  noiseSize?: number;
  noiseTileCells?: number;
  noiseDensity?: number;
  noiseContrast?: number;
  noiseScale?: number;
  noiseOctaves?: number;
  noiseDetailScale?: number;
  noiseDetailOctaves?: number;
  noiseDetailStrength?: number;
  noiseClampLow?: number;
  noiseClampHigh?: number;
  noiseSeed?: number;
  noiseMaxFill?: number;
  noiseJitter?: number;
  noiseSpeed?: number;
  noiseAngle?: number;
  noiseTravel?: number;

  fadeStart?: number;
  fadeEnd?: number;

  animateNoise?: boolean;
  animateGlow?: boolean;

  children?: ReactNode;
}

export function DitherGridBackground({
  backgroundColor = "#101a22",

  gridColor = "#5b8293",
  gridSize = 41,
  gridOpacity = 0.23,

  noiseColor = "#a32338",
  noiseOpacity = 0.5,
  noiseSize = 3,
  noiseTileCells = DITHER_TILE_CELLS,
  noiseDensity = 0.55,
  noiseContrast = 1.8,
  noiseScale = 32,
  noiseOctaves = 3,
  noiseDetailScale = 5,
  noiseDetailOctaves = 3,
  noiseDetailStrength = 0.2,
  noiseClampLow = 0,
  noiseClampHigh = 0.9,
  noiseSeed = 69,
  noiseMaxFill = 0.6,
  noiseJitter = 0.3,
  noiseSpeed = 180,
  noiseAngle = 100, // Yes this is slightly higher than 90
  noiseTravel = 1,

  fadeStart = 0,
  fadeEnd = 90,

  animateNoise = true,
  animateGlow = true,

  children,
  className = "",
  style,
  ...props
}: DitherGridBackgroundProps) {
  const noiseImage = useMemo(
    () =>
      createDitherTile({
        cells: noiseTileCells,
        color: noiseColor,
        density: noiseDensity,
        contrast: noiseContrast,
        scale: noiseScale,
        octaves: noiseOctaves,
        detailScale: noiseDetailScale,
        detailOctaves: noiseDetailOctaves,
        detailStrength: noiseDetailStrength,
        clampLow: noiseClampLow,
        clampHigh: noiseClampHigh,
        seed: noiseSeed,
        maxFill: noiseMaxFill,
        jitter: noiseJitter,
      }),
    [
      noiseTileCells,
      noiseColor,
      noiseDensity,
      noiseContrast,
      noiseScale,
      noiseOctaves,
      noiseDetailScale,
      noiseDetailOctaves,
      noiseDetailStrength,
      noiseClampLow,
      noiseClampHigh,
      noiseSeed,
      noiseMaxFill,
      noiseJitter,
    ],
  );

  const tileSize = noiseTileCells * noiseSize;
  const angle = (noiseAngle * Math.PI) / 180;
  const travelX = Math.round(Math.cos(angle) * noiseTravel) * tileSize;
  const travelY = Math.round(Math.sin(angle) * noiseTravel) * tileSize;
  const overscan = Math.max(Math.abs(travelX), Math.abs(travelY)) + tileSize;

  const variables: CSSVars = {
    "--background-color": backgroundColor,

    "--grid-color": gridColor,
    "--grid-size": `${gridSize}px`,
    "--grid-opacity": gridOpacity,

    "--noise-image": `url("${noiseImage}")`,
    "--noise-tile-size": `${tileSize}px`,
    "--noise-color": noiseColor,
    "--noise-opacity": noiseOpacity,
    "--noise-speed": `${noiseSpeed}s`,
    "--noise-x": `${travelX}px`,
    "--noise-y": `${travelY}px`,
    "--noise-overscan": `${overscan}px`,

    "--fade-start": `${fadeStart}%`,
    "--fade-end": `${fadeEnd}%`,

    ...style,
  };

  return (
    <div
      className={[
        "dither-grid-background",
        animateNoise && "dither-grid-background--animated",
        animateGlow && "dither-grid-background--glow",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={variables}
      {...props}
    >
      <div className="dither-grid-background__noise" aria-hidden="true">
        <div className="dither-grid-background__noise-texture" />
      </div>

      <div className="dither-grid-background__grid" aria-hidden="true" />

      <div className="dither-grid-background__content">{children}</div>
    </div>
  );
}
