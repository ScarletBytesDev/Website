import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { navigation } from "../../assets/navigation.ts";
import { SiteHeader } from "./SiteHeader.tsx";

describe("SiteHeader", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders the logo and split wordmark for desktop and mobile", () => {
    render(<SiteHeader motionEnabled onToggleMotion={() => {}} />);
    expect(screen.getAllByText("Scarlet")).toHaveLength(2);
    expect(screen.getAllByText("Bytes")).toHaveLength(2);
    expect(screen.getAllByAltText("ScarletBytes fox logo")).toHaveLength(2);
  });

  it("renders every navigation item from the asset", () => {
    render(<SiteHeader motionEnabled onToggleMotion={() => {}} />);
    for (const item of navigation) {
      expect(screen.getAllByText(item.label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders an icon for every navigation item that defines one", async () => {
    const { container } = render(
      <SiteHeader motionEnabled onToggleMotion={() => {}} />,
    );
    const itemsWithIcons = navigation.filter((item) => item.icon).length;
    await waitFor(() =>
      expect(container.querySelectorAll("nav svg").length).toBe(itemsWithIcons),
    );
  });

  it("reflects the motion state on the switch and reports toggles", () => {
    const onToggleMotion = vi.fn();
    render(
      <SiteHeader motionEnabled={false} onToggleMotion={onToggleMotion} />,
    );

    const toggle = screen.getAllByRole("switch")[0];
    expect(toggle.getAttribute("aria-checked")).toBe("false");

    fireEvent.click(toggle);
    expect(onToggleMotion).toHaveBeenCalledTimes(1);
  });

  it("opens the burger menu with links and the motion toggle", () => {
    render(<SiteHeader motionEnabled onToggleMotion={() => {}} />);
    const menu = screen.getByTestId("mobile-menu");
    expect(menu.classList.contains("site-header__menu--open")).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(menu.classList.contains("site-header__menu--open")).toBe(true);
    for (const item of navigation) {
      expect(menu.textContent).toContain(item.label);
    }
    expect(menu.querySelector('[role="switch"]')).not.toBeNull();
  });

  it("closes the burger menu when a link is clicked", () => {
    render(<SiteHeader motionEnabled onToggleMotion={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const menu = screen.getByTestId("mobile-menu");
    const link = menu.querySelector("a");
    expect(link).not.toBeNull();
    if (link) {
      fireEvent.click(link);
    }

    expect(menu.classList.contains("site-header__menu--open")).toBe(false);
  });
});
