import { createElement } from "react";
import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { Code, House, Rocket, Tv, Users, Video } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { siGithub, siTwitch, siYoutube } from "simple-icons";

export type IconComponent = ComponentType<{ className?: string }>;

/** How an icon is referenced from the JSON assets. */
export type IconReference =
  | { source: "lucide"; name: string }
  | { source: "simple-icons"; name: string }
  | { source: "custom"; name: string }
  | { source: "custom"; src: string };

/** Lucide icons usable from the JSON assets, keyed by export name. */
const LUCIDE_ICONS: Record<string, LucideIcon> = {
  Code,
  House,
  Rocket,
  Tv,
  Users,
  Video,
};

/** simple-icons marks usable from the JSON assets, keyed by slug. */
const SIMPLE_ICONS: Record<string, SimpleIcon> = {
  twitch: siTwitch,
  youtube: siYoutube,
  github: siGithub,
};

/** Custom icon components usable from the JSON assets, keyed by name. */
const CUSTOM_ICONS: Record<string, IconComponent> = {};

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

export function resolveIcon(ref: IconReference): IconComponent {
  switch (ref.source) {
    case "lucide": {
      const icon = LUCIDE_ICONS[ref.name];
      if (!icon) {
        throw new Error(
          `Unknown lucide icon "${ref.name}" — add it to LUCIDE_ICONS in icons.ts`,
        );
      }
      return icon;
    }
    case "simple-icons": {
      const icon = SIMPLE_ICONS[ref.name];
      if (!icon) {
        throw new Error(
          `Unknown simple-icons mark "${ref.name}" — add it to SIMPLE_ICONS in icons.ts`,
        );
      }
      return ({ className }) =>
        createElement(
          "svg",
          {
            viewBox: "0 0 24 24",
            className,
            fill: "currentColor",
            "aria-hidden": true,
          },
          createElement("path", { d: icon.path }),
        );
    }
    case "custom": {
      if ("src" in ref) {
        return ({ className }) =>
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
