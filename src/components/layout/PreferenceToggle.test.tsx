import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PreferenceToggle } from "./PreferenceToggle.tsx";

describe("PreferenceToggle", () => {
    it("renders its label and checked state accessibly", () => {
        render(
            <PreferenceToggle
                label="Theme"
                ariaLabel="Light mode"
                checked
                onToggle={() => {}}
                activeClassName="bg-amber-500"
                activeIcon={<span data-testid="active-icon" />}
            />,
        );

        const toggle = screen.getByRole("switch", { name: "Light mode" });
        expect(screen.getByText("Theme")).toBeTruthy();
        expect(toggle.getAttribute("aria-checked")).toBe("true");
        expect(screen.getByTestId("active-icon")).toBeTruthy();
        expect(toggle.querySelectorAll("span")[1]?.className).toContain(
            "bg-amber-500",
        );
    });

    it("renders the inactive state and calls its handler", () => {
        const onToggle = vi.fn();
        render(
            <PreferenceToggle
                label="Motion"
                ariaLabel="Motion"
                checked={false}
                onToggle={onToggle}
                activeClassName="bg-scarlet-600"
                inactiveIcon={<span data-testid="inactive-icon" />}
            />,
        );

        const toggle = screen.getByRole("switch", { name: "Motion" });
        expect(toggle.getAttribute("aria-checked")).toBe("false");
        expect(screen.getByTestId("inactive-icon")).toBeTruthy();
        expect(toggle.querySelectorAll("span")[1]?.className).toContain(
            "bg-ink-800",
        );

        fireEvent.click(toggle);
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
});
