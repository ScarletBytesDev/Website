import { describe, expect, it } from "vitest";
import { site } from "./site.ts";

describe("site", () => {
    it("derives the Discord invite URL from the invite code", () => {
        expect(site.discordInviteCode.length).toBeGreaterThan(0);
        expect(site.discordInviteUrl).toBe(
            `https://discord.gg/${site.discordInviteCode}`,
        );
    });

    it("keeps Twitch values in sync", () => {
        expect(site.twitchUrl.toLowerCase()).toContain(
            site.twitchChannel.toLowerCase(),
        );
    });
});
