import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter.tsx";

describe("SiteFooter", () => {
  it("renders the tagline with a heart icon", async () => {
    const { container } = render(<SiteFooter />);
    expect(screen.getByText("Good code. good vibes.")).toBeTruthy();
    await waitFor(() => expect(container.querySelector("svg")).not.toBeNull());
  });

  it("renders the scarlet line segments", () => {
    const { container } = render(<SiteFooter />);
    const segments = container.querySelectorAll("span[aria-hidden='true']");
    expect(segments).toHaveLength(2);
  });
});
