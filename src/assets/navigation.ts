import { type IconComponent, resolveOptionalIcon } from "./icons.ts";
import navigationJson from "./navigation.json";
import { site } from "./site.ts";

export type NavigationAccent = "scarlet" | "purple";

/**
 * href placeholder that resolves to the community Discord invite URL
 * (built from site.json's discordInviteCode).
 */
const DISCORD_HREF = "@discord";

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
        item.accent !== undefined
        && item.accent !== "scarlet"
        && item.accent !== "purple"
    ) {
        throw new Error(`Unknown navigation accent "${String(item.accent)}"`);
    }
    if (
        item.description !== undefined
        && typeof item.description !== "string"
    ) {
        throw new Error("Navigation description must be a string");
    }

    return {
        label: item.label,
        href: item.href === DISCORD_HREF ? site.discordInviteUrl : item.href,
        icon: resolveOptionalIcon(item.icon),
        description: item.description as string | undefined,
        accent: (item.accent as NavigationAccent | undefined) ?? "scarlet",
    };
}

/**
 * Header navigation and section-card entries. Add or reorder sections in
 * navigation.json; optional "description" and "accent" drive the home cards,
 * and entries may declare an icon ("lucide", "simple-icons" or "custom",
 * see icons.ts). An href of "@discord" resolves to the community Discord
 * invite URL from site.json.
 */
export const navigation: readonly NavigationItem[] =
    navigationJson.map(parseEntry);

/**
 * Whether a navigation href points at another website (as opposed to a local
 * hash or path). External links always open in a new window.
 */
export function isExternalHref(href: string): boolean {
    return /^https?:\/\//.test(href);
}
