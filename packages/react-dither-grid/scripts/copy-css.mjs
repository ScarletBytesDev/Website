import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Plain CSS ships next to the emitted JS so bundlers pick up the side-effect
// imports (import "./DitherGridBackground.css") from the dist output.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "dist"), { recursive: true });

for (const file of readdirSync(join(root, "src"))) {
    if (file.endsWith(".css")) {
        copyFileSync(join(root, "src", file), join(root, "dist", file));
    }
}
