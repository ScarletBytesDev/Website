import siteJson from "./site.json";

export type SiteConfig = {
    twitchChannel: string;
    twitchUrl: `https://${string}`;
    discordInviteCode: string;
    discordInviteUrl: `https://${string}`;
};

function parseSiteConfig(raw: unknown): SiteConfig {
    const item = raw as Record<string, unknown> | null;
    if (!item || typeof item !== "object") {
        throw new Error("Site config must be an object");
    }
    if (
        typeof item.twitchChannel !== "string"
        || typeof item.twitchUrl !== "string"
        || typeof item.discordInviteCode !== "string"
    ) {
        throw new Error(
            "Site config needs string twitchChannel, twitchUrl and discordInviteCode",
        );
    }
    if (!item.twitchUrl.startsWith("https://")) {
        throw new Error(
            `Site config twitchUrl must be https: "${item.twitchUrl}"`,
        );
    }

    return {
        twitchChannel: item.twitchChannel,
        twitchUrl: item.twitchUrl as `https://${string}`,
        discordInviteCode: item.discordInviteCode,
        discordInviteUrl: `https://discord.gg/${item.discordInviteCode}`,
    };
}

/**
 * Common site configuration (src/assets/site.json) - the shared constants
 * (Twitch channel and URL, Discord invite code) referenced across the app.
 * discordInviteUrl is derived from discordInviteCode.
 */
export const site: SiteConfig = parseSiteConfig(siteJson);
