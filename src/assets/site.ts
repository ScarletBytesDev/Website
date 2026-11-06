import siteJson from "./site.json";

export type SiteConfig = {
    twitchChannel: string;
    twitchUrl: `https://${string}`;
};

function parseSiteConfig(raw: unknown): SiteConfig {
    const item = raw as Record<string, unknown> | null;
    if (!item || typeof item !== "object") {
        throw new Error("Site config must be an object");
    }
    if (
        typeof item.twitchChannel !== "string"
        || typeof item.twitchUrl !== "string"
    ) {
        throw new Error("Site config needs string twitchChannel and twitchUrl");
    }
    if (!item.twitchUrl.startsWith("https://")) {
        throw new Error(
            `Site config twitchUrl must be https: "${item.twitchUrl}"`,
        );
    }

    return {
        twitchChannel: item.twitchChannel,
        twitchUrl: item.twitchUrl as `https://${string}`,
    };
}

/**
 * Common site configuration (src/assets/site.json) — the shared constants
 * (Twitch channel and URL) referenced across the app.
 */
export const site: SiteConfig = parseSiteConfig(siteJson);
