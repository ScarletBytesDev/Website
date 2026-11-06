import { type IconComponent, resolveOptionalIcon } from "./icons.ts";
import projectsJson from "./projects.json";

export type ProjectLink = {
  label: string;
  href: `https://${string}`;
  icon?: IconComponent;
};

export type Project = {
  name: string;
  description: string;
  icon?: IconComponent;
  links: readonly ProjectLink[];
};

function parseLink(raw: unknown): ProjectLink {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Project link must be an object");
  }
  if (typeof item.label !== "string" || typeof item.href !== "string") {
    throw new Error("Project link needs string label and href");
  }
  if (!item.href.startsWith("https://")) {
    throw new Error(`Project link href must be https: "${item.href}"`);
  }

  return {
    label: item.label,
    href: item.href as `https://${string}`,
    icon: resolveOptionalIcon(item.icon),
  };
}

function parseEntry(raw: unknown): Project {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Project entry must be an object");
  }
  if (typeof item.name !== "string" || typeof item.description !== "string") {
    throw new Error("Project entry needs string name and description");
  }
  if (item.links !== undefined && !Array.isArray(item.links)) {
    throw new Error("Project links must be an array");
  }

  return {
    name: item.name,
    description: item.description,
    icon: resolveOptionalIcon(item.icon),
    links: Array.isArray(item.links) ? item.links.map(parseLink) : [],
  };
}

/**
 * Projects shown on the projects page. Add entries to projects.json — each
 * needs a name and description, and may declare an icon and a list of link
 * buttons (e.g. "Website" and "GitHub"), each with its own optional icon
 * ("lucide", "simple-icons" or "custom", see icons.ts).
 */
export const projects: readonly Project[] = projectsJson.map(parseEntry);
