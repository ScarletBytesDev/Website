import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { socialLinks } from "../../assets/sociallinks.ts";
import { SocialLinks } from "./SocialLinks.tsx";

describe("SocialLinks", () => {
    it("renders one button per social link from the asset", () => {
        render(<SocialLinks />);
        expect(socialLinks.length).toBeGreaterThan(0);
        for (const link of socialLinks) {
            const button = screen.getByRole("link", { name: link.label });
            expect(button.getAttribute("href")).toBe(link.href);
        }
    });
});
