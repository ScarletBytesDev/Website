import { type IconComponent, resolveOptionalIcon } from "./icons.ts";
import navigationJson from "./navigation.json";

export type NavigationAccent = "scarlet" | "purple";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: IconComponent;
  description?: string;
  accent: NavigationAccent;
};

function parseEntry(raw: unknown): NavigationItem {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Navigation entry must be an object");
  }
  if (typeof item.label !== "string" || typeof item.href !== "string") {
    throw new Error("Navigation entry needs string label and href");
  }
  if (
    item.accent !== undefined &&
    item.accent !== "scarlet" &&
    item.accent !== "purple"
  ) {
    throw new Error(`Unknown navigation accent "${String(item.accent)}"`);
  }
  if (item.description !== undefined && typeof item.description !== "string") {
    throw new Error("Navigation description must be a string");
  }

  return {
    label: item.label,
    href: item.href,
    icon: resolveOptionalIcon(item.icon),
    description: item.description as string | undefined,
    accent: (item.accent as NavigationAccent | undefined) ?? "scarlet",
  };
}

/**
 * Header navigation and section-card entries. Add or reorder sections in
 * navigation.json; optional "description" and "accent" drive the home cards,
 * and entries may declare an icon ("lucide", "simple-icons" or "custom",
 * see icons.ts).
 */
export const navigation: readonly NavigationItem[] =
  navigationJson.map(parseEntry);
