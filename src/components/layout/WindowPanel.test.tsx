import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WindowPanel } from "./WindowPanel.tsx";

describe("WindowPanel", () => {
    it("renders the bracketed tab and its content", () => {
        const { container } = render(
            <WindowPanel tab="streaming.exe">
                <p>Inside</p>
            </WindowPanel>,
        );
        expect(container.textContent).toContain("[ streaming.exe ]");
        expect(screen.getByText("Inside")).toBeTruthy();
    });
});
