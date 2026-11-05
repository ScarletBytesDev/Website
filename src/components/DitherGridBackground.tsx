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
  noiseOpacity = 0.85,
  noiseSize = 3,
  noiseTileCells = DITHER_TILE_CELLS,
  noiseDensity = 0.55,
  noiseContrast = 1.8,
  noiseScale = 20,
  noiseOctaves = 3,
  noiseDetailScale = 5,
  noiseDetailOctaves = 2,
  noiseDetailStrength = 0.6,
  noiseSeed = 7,
  noiseMaxFill = 0.85,
  noiseJitter = 0.2,
  noiseSpeed = 180,
  noiseAngle = 90,
  noiseTravel = 1,

  fadeStart = 35,
  fadeEnd = 82,

  animateNoise = true,
  animateGlow = false,

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
      noiseSeed,
      noiseMaxFill,
      noiseJitter,
    ],
  );

  const tileSize = noiseTileCells * noiseSize;
  const angle = (noiseAngle * Math.PI) / 180;
  const travelX = Math.round(Math.cos(angle) * noiseTravel) * tileSize;
  const travelY = Math.round(Math.sin(angle) * noiseTravel) * tileSize;

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
      <div className="dither-grid-background__noise" aria-hidden="true" />

      <div className="dither-grid-background__grid" aria-hidden="true" />

      <div className="dither-grid-background__content">{children}</div>
    </div>
  );
}
