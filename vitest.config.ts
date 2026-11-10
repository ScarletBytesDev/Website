import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { generateIconRegistry } from "./scripts/generateIconRegistry.ts";

function iconRegistry(): Plugin {
    return {
        name: "icon-registry",
        buildStart() {
            generateIconRegistry();
        },
    };
}

export default defineConfig({
    plugins: [react(), iconRegistry()],
    test: {
        environment: "happy-dom",
        include: ["src/**/*.test.{ts,tsx}"],
        setupFiles: ["./vitest.setup.ts"],
    },
});
