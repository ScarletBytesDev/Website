import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App.tsx";
import { preferences } from "./services/Preferences.ts";

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

    it("toggles and persists light mode", () => {
        render(<App />);
        const themeToggle = screen.getAllByRole("switch", {
            name: "Light mode",
        })[0];

        expect(themeToggle.getAttribute("aria-checked")).toBe("false");
        fireEvent.click(themeToggle);

        expect(themeToggle.getAttribute("aria-checked")).toBe("true");
        expect(preferences.get("lightMode")).toBe(true);
        expect(document.documentElement.dataset.theme).toBe("light");
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
