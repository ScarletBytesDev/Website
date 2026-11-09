import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { type Project, projects } from "../assets/projects.ts";
import { ProjectsPage } from "./ProjectsPage.tsx";

function flatten(items: readonly Project[]): Project[] {
    return items.flatMap((item) => [item, ...flatten(item.children)]);
}

describe("ProjectsPage", () => {
    it("renders the page heading", () => {
        render(<ProjectsPage />);
        expect(screen.getByText("Projects")).toBeTruthy();
        expect(screen.getByText("Open source & creative tools.")).toBeTruthy();
    });

    it("renders every project from the asset, nested children included", () => {
        render(<ProjectsPage />);
        const all = flatten(projects);
        expect(all.length).toBeGreaterThan(0);
        for (const project of all) {
            expect(screen.getByText(project.name)).toBeTruthy();
            expect(screen.getByText(project.description)).toBeTruthy();
        }
    });

    it("renders a button for every project link", () => {
        render(<ProjectsPage />);
        for (const project of flatten(projects)) {
            for (const link of project.links) {
                const buttons = screen.getAllByRole("link", {
                    name: link.label,
                });
                expect(
                    buttons.some(
                        (button) => button.getAttribute("href") === link.href,
                    ),
                ).toBe(true);
            }
        }
    });

    it("starts expanded and toggles nested projects", () => {
        render(<ProjectsPage />);
        expect(screen.getByText("Dither Background")).toBeTruthy();

        const collapse = screen.getByRole("button", {
            name: "Collapse This Website",
        });
        expect(collapse.getAttribute("aria-expanded")).toBe("true");

        fireEvent.click(collapse);
        expect(screen.queryByText("Dither Background")).toBeNull();

        const expand = screen.getByRole("button", {
            name: "Expand This Website",
        });
        expect(expand.getAttribute("aria-expanded")).toBe("false");

        fireEvent.click(expand);
        expect(screen.getByText("Dither Background")).toBeTruthy();
        expect(
            screen
                .getByRole("button", { name: "Collapse This Website" })
                .getAttribute("aria-expanded"),
        ).toBe("true");
    });
});
