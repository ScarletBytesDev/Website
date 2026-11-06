import { describe, expect, it } from "vitest";
import { socialLinks } from "./sociallinks.ts";

describe("socialLinks", () => {
    it("attaches an icon to every entry", () => {
        for (const link of socialLinks) {
            expect(link.icon).toBeDefined();
        }
    });

    it("uses https URLs", () => {
        for (const link of socialLinks) {
            expect(link.href.startsWith("https://")).toBe(true);
        }
    });

    it("contains one entry per JSON platform", () => {
        expect(socialLinks.length).toBeGreaterThan(0);
        expect(new Set(socialLinks.map((link) => link.platform)).size).toBe(
            socialLinks.length,
        );
    });
});
