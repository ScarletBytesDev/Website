import { createElement } from "react";
import type { ComponentType } from "react";
import { GENERATED_ICONS } from "./iconRegistry.generated.ts";

export type IconProps = { className?: string; strokeWidth?: number };

export type IconComponent = ComponentType<IconProps>;

/** How an icon is referenced from the JSON assets. */
export type IconReference =
  | { source: "lucide"; name: string }
  | { source: "simple-icons"; name: string }
  | { source: "custom"; name: string }
  | { source: "custom"; src: string };

/** Hand-made icon components usable from the JSON assets, keyed by name. */
const CUSTOM_ICONS: Record<string, IconComponent> = {};

function extractPathFromSvg(svg: string): string {
  const match = svg.match(/<path d="([^"]+)"/);
  if (!match) {
    throw new Error("simple-icons SVG without a path");
  }
  return match[1];
}

function svgIconComponent(path: string): IconComponent {
  return ({ className }: IconProps) =>
    createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        className,
        fill: "currentColor",
        "aria-hidden": true,
      },
      createElement("path", { d: path }),
    );
}

export function parseIconReference(raw: unknown): IconReference {
  const ref = raw as Record<string, unknown> | null;
  if (!ref || typeof ref !== "object") {
    throw new Error("Icon must be an object");
  }

  switch (ref.source) {
    case "lucide":
      if (typeof ref.name !== "string") {
        throw new Error('Lucide icon needs a "name"');
      }
      return { source: "lucide", name: ref.name };
    case "simple-icons":
      if (typeof ref.name !== "string") {
        throw new Error('simple-icons mark needs a "name"');
      }
      return { source: "simple-icons", name: ref.name };
    case "custom":
      if (typeof ref.name === "string") {
        return { source: "custom", name: ref.name };
      }
      if (typeof ref.src === "string") {
        return { source: "custom", src: ref.src };
      }
      throw new Error('Custom icon needs a "name" or "src"');
    default:
      throw new Error(`Unknown icon source "${String(ref.source)}"`);
  }
}

/**
 * Resolves an icon reference to a renderable component. Any lucide or
 * simple-icons name works as long as it is referenced from a JSON asset (or
 * code) — the icon registry is generated from those references at build time,
 * so only used icons are bundled. Custom references either point at an image
 * file ("src") or at a component registered in CUSTOM_ICONS.
 */
export function resolveIcon(ref: IconReference): IconComponent {
  switch (ref.source) {
    case "lucide": {
      const icon = GENERATED_ICONS[`lucide:${ref.name}`];
      if (!icon) {
        throw new Error(
          `Unknown lucide icon "${ref.name}" — reference it from a JSON asset (e.g. navigation.json) and the registry picks it up`,
        );
      }
      return icon as IconComponent;
    }
    case "simple-icons": {
      const svg = GENERATED_ICONS[`simple-icons:${ref.name}`];
      if (typeof svg !== "string") {
        throw new Error(
          `Unknown simple-icons mark "${ref.name}" — reference it from a JSON asset (e.g. sociallinks.json) and the registry picks it up`,
        );
      }
      return svgIconComponent(extractPathFromSvg(svg));
    }
    case "custom": {
      if ("src" in ref) {
        return ({ className }: IconProps) =>
          createElement("img", { src: ref.src, alt: "", className });
      }
      const icon = CUSTOM_ICONS[ref.name];
      if (!icon) {
        throw new Error(
          `Unknown custom icon "${ref.name}" — add it to CUSTOM_ICONS in icons.ts`,
        );
      }
      return icon;
    }
  }
}

/**
 * Resolves an optional icon reference from a JSON asset entry.
 * Returns undefined when the entry has no "icon" field.
 */
export function resolveOptionalIcon(raw: unknown): IconComponent | undefined {
  return raw === undefined ? undefined : resolveIcon(parseIconReference(raw));
}
