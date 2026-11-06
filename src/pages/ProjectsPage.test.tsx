import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "../assets/projects.ts";
import { ProjectsPage } from "./ProjectsPage.tsx";

describe("ProjectsPage", () => {
  it("renders the page heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Projects")).toBeTruthy();
    expect(screen.getByText("Open source & creative tools.")).toBeTruthy();
  });

  it("renders every project from the asset", () => {
    render(<ProjectsPage />);
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(screen.getByText(project.name)).toBeTruthy();
      expect(screen.getByText(project.description)).toBeTruthy();
    }
  });
});
