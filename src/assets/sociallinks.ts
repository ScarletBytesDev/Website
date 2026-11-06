import {
  type IconComponent,
  parseIconReference,
  resolveIcon,
} from "./icons.ts";
import socialLinksJson from "./sociallinks.json";

export type SocialLink = {
  platform: string;
  label: string;
  href: `https://${string}`;
  icon: IconComponent;
};

function parseEntry(raw: unknown): SocialLink {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Social link entry must be an object");
  }
  if (
    typeof item.platform !== "string" ||
    typeof item.label !== "string" ||
    typeof item.href !== "string"
  ) {
    throw new Error("Social link needs string platform, label and href");
  }
  if (!item.href.startsWith("https://")) {
    throw new Error(`Social link href must be https: "${item.href}"`);
  }

  return {
    platform: item.platform,
    label: item.label,
    href: item.href as `https://${string}`,
    icon: resolveIcon(parseIconReference(item.icon)),
  };
}

/**
 * Social links shown under the hero. Entries are edited in sociallinks.json;
 * each declares its icon ("lucide", "simple-icons" or "custom", see icons.ts)
 * and this wrapper validates the data and resolves the icon component.
 */
export const socialLinks: readonly SocialLink[] =
  socialLinksJson.map(parseEntry);
