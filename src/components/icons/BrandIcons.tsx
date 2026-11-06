import { siTwitch } from "simple-icons";
import type { IconProps } from "../../assets/icons.ts";

/** Twitch brand mark (simple-icons), for hardcoded UI usage. */
export function TwitchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={siTwitch.path} />
    </svg>
  );
}
