import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "../../assets/site.ts";
import { LiveCard } from "./LiveCard.tsx";

describe("LiveCard", () => {
    it("renders the live badge and caption", () => {
        render(<LiveCard />);
        expect(screen.getByText("LIVE")).toBeTruthy();
        expect(screen.getByText("Live on Twitch")).toBeTruthy();
    });

    it("embeds the Twitch player for the configured channel", () => {
        const { container } = render(<LiveCard />);
        const frame = container.querySelector("iframe");
        expect(frame).not.toBeNull();
        expect(frame?.getAttribute("src")).toContain("player.twitch.tv");
        expect(frame?.getAttribute("src")).toContain(
            `channel=${site.twitchChannel}`,
        );
    });
});
