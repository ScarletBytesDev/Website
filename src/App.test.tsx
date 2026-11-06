import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { preferences } from "./services/Preferences.ts";
import App from "./App.tsx";

function firstSwitch(): HTMLElement {
  return screen.getAllByRole("switch")[0];
}

describe("App motion preference", () => {
  beforeEach(() => {
    window.location.hash = "";
    window.localStorage.clear();
  });

  it("defaults to motion enabled", () => {
    render(<App />);
    expect(firstSwitch().getAttribute("aria-checked")).toBe("true");
  });

  it("restores the saved preference on load", () => {
    preferences.set("motionEnabled", false);
    render(<App />);
    expect(firstSwitch().getAttribute("aria-checked")).toBe("false");
  });

  it("persists toggles", () => {
    render(<App />);
    fireEvent.click(firstSwitch());
    expect(preferences.get("motionEnabled")).toBe(false);
  });

  it("renders the home view by default", () => {
    render(<App />);
    expect(screen.getByText("Build. Stream. Repeat.")).toBeTruthy();
  });

  it("renders the projects view for the #projects hash", () => {
    window.location.hash = "#projects";
    render(<App />);
    expect(screen.getByText("Open source & creative tools.")).toBeTruthy();
  });
});
