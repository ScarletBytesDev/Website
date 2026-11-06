import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { navigation } from "../../assets/navigation.ts";
import { FeatureCards } from "./FeatureCards.tsx";

describe("FeatureCards", () => {
  it("renders a card for every section that has a description", () => {
    render(<FeatureCards />);
    const cards = navigation.filter((item) => item.description);
    expect(cards.length).toBeGreaterThan(0);

    for (const item of cards) {
      expect(screen.getByText(item.label)).toBeTruthy();
      expect(screen.getByText(item.description as string)).toBeTruthy();
    }
  });
});
