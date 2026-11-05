import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter.tsx";

describe("SiteFooter", () => {
  it("renders the tagline with a heart icon", () => {
    const { container } = render(<SiteFooter />);
    expect(screen.getByText("Good code. Good Vibes")).toBeTruthy();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders the scarlet line segments", () => {
    const { container } = render(<SiteFooter />);
    const segments = container.querySelectorAll("span[aria-hidden='true']");
    expect(segments).toHaveLength(2);
  });
});
