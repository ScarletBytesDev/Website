import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero.tsx";

describe("Hero", () => {
    it("renders the split wordmark and tagline", () => {
        render(<Hero />);
        expect(screen.getByText("Scarlet")).toBeTruthy();
        expect(screen.getByText("Bytes")).toBeTruthy();
        expect(screen.getByText("Build. Stream. Repeat.")).toBeTruthy();
    });

    it("renders the mascot", () => {
        render(<Hero />);
        expect(screen.getByAltText(/mascot/i)).toBeTruthy();
    });
});
