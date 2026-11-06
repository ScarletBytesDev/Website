import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "../../assets/site.ts";
import { Hero } from "./Hero.tsx";

describe("Hero", () => {
  it("renders the split wordmark and tagline", () => {
    render(<Hero />);
    expect(screen.getByText("Scarlet")).toBeTruthy();
    expect(screen.getByText("Bytes")).toBeTruthy();
    expect(screen.getByText("Build. Stream. Repeat.")).toBeTruthy();
  });

  it("renders the calls to action", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /watch on twitch/i })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /explore projects/i }),
    ).toBeTruthy();
  });

  it("renders the mascot and the live card", () => {
    render(<Hero />);
    expect(screen.getByAltText(/mascot/i)).toBeTruthy();
    expect(screen.getByText("LIVE")).toBeTruthy();
    expect(screen.getByText("Live on Twitch")).toBeTruthy();
  });

  it("embeds the ScarletBytes Twitch player", () => {
    const { container } = render(<Hero />);
    const frame = container.querySelector("iframe");
    expect(frame).not.toBeNull();
    expect(frame?.getAttribute("src")).toContain("player.twitch.tv");
    expect(frame?.getAttribute("src")).toContain(
      `channel=${site.twitchChannel}`,
    );
  });
});
