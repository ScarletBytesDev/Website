import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { generateIconRegistry } from "./scripts/generateIconRegistry.ts";

function iconRegistry(): Plugin {
    return {
        name: "icon-registry",
        buildStart() {
            generateIconRegistry();
        },
        handleHotUpdate({ file }) {
            if (!file.endsWith("iconRegistry.generated.ts")) {
                generateIconRegistry();
            }
        },
    };
}

export default defineConfig({
    base: "./",
    plugins: [react(), tailwindcss(), iconRegistry()],
});
