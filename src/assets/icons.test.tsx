import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolveIcon } from "./icons.ts";

describe("icons", () => {
    it("resolves any lucide icon by name without registration", async () => {
        const Icon = resolveIcon({ source: "lucide", name: "Sparkles" });
        const { container } = render(<Icon className="size-4" />);
        await waitFor(() =>
            expect(container.querySelector("svg")).not.toBeNull(),
        );
    });

    it("resolves any simple-icons mark by slug without registration", async () => {
        const Icon = resolveIcon({ source: "simple-icons", name: "discord" });
        const { container } = render(<Icon />);
        await waitFor(() =>
            expect(container.querySelector("svg")).not.toBeNull(),
        );
    });

    it("accepts PascalCase and kebab-case lucide names", () => {
        expect(() =>
            resolveIcon({ source: "lucide", name: "Gamepad2" }),
        ).not.toThrow();
        expect(() =>
            resolveIcon({ source: "lucide", name: "gamepad-2" }),
        ).not.toThrow();
    });

    it("throws for unknown names", () => {
        expect(() =>
            resolveIcon({ source: "lucide", name: "NotAnIcon" }),
        ).toThrow();
        expect(() =>
            resolveIcon({ source: "simple-icons", name: "not-a-mark" }),
        ).toThrow();
    });
});
