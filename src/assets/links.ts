import type { LucideIcon } from "lucide-react";
import { Code, Tv, Video } from "lucide-react";

export type LinkPlatform = "twitch" | "youtube" | "github";

export type LinkItem = {
  platform: LinkPlatform;
  label: string;
  href: `https://${string}`;
  icon: LucideIcon;
};

export const links : LinkItem[] = [
  {
    platform: "twitch",
    label: "Twitch",
    href: "https://twitch.tv/",
    icon: Tv,
  },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://youtube.com/",
    icon: Video,
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/",
    icon: Code,
  },
];
