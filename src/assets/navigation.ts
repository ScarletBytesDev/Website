import {
  resolveOptionalIcon,
  type IconComponent,
} from "./icons.ts";
import navigationJson from "./navigation.json";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: IconComponent;
};

function parseEntry(raw: unknown): NavigationItem {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Navigation entry must be an object");
  }
  if (typeof item.label !== "string" || typeof item.href !== "string") {
    throw new Error("Navigation entry needs string label and href");
  }

  return {
    label: item.label,
    href: item.href,
    icon: resolveOptionalIcon(item.icon),
  };
}

/**
 * Header navigation entries. Add or reorder sections directly in
 * navigation.json; entries may declare an optional icon ("lucide",
 * "simple-icons" or "custom", see icons.ts) which this wrapper resolves.
 */
export const navigation: readonly NavigationItem[] =
  navigationJson.map(parseEntry);
