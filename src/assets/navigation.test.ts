import { describe, expect, it } from "vitest";
import { isExternalHref, navigation } from "./navigation.ts";

describe("isExternalHref", () => {
    it("detects links to other websites", () => {
        expect(isExternalHref("https://example.com")).toBe(true);

        // noinspection HttpUrlsUsage
        expect(isExternalHref("http://example.com")).toBe(true);
    });

    it("treats hashes and local paths as internal", () => {
        expect(isExternalHref("#home")).toBe(false);
        expect(isExternalHref("#projects")).toBe(false);
        expect(isExternalHref("/projects")).toBe(false);
    });
});

describe("navigation", () => {
    it("keeps local entries in the same window", () => {
        for (const item of navigation) {
            if (!isExternalHref(item.href)) {
                expect(item.href.startsWith("#")).toBe(true);
            }
        }
    });
});
