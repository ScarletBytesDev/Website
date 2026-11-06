import {
  resolveOptionalIcon,
  type IconComponent,
} from "./icons.ts";
import projectsJson from "./projects.json";

export type Project = {
  name: string;
  description: string;
  url?: `https://${string}`;
  icon?: IconComponent;
};

function parseEntry(raw: unknown): Project {
  const item = raw as Record<string, unknown> | null;
  if (!item || typeof item !== "object") {
    throw new Error("Project entry must be an object");
  }
  if (typeof item.name !== "string" || typeof item.description !== "string") {
    throw new Error("Project entry needs string name and description");
  }
  if (item.url !== undefined) {
    if (typeof item.url !== "string" || !item.url.startsWith("https://")) {
      throw new Error(`Project url must be https: "${String(item.url)}"`);
    }
  }

  return {
    name: item.name,
    description: item.description,
    url: item.url as `https://${string}` | undefined,
    icon: resolveOptionalIcon(item.icon),
  };
}

/**
 * Projects shown on the projects page. Add entries to projects.json — each
 * needs a name and description, and may declare a link ("url") and an icon
 * ("lucide", "simple-icons" or "custom", see icons.ts).
 */
export const projects: readonly Project[] = projectsJson.map(parseEntry);
