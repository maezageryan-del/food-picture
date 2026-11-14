// food-picture-01 entry: "Midnight Melt"
// Ships one food photograph (a smash burger with melting cheddar, shot on a
// dark background) by copying the bundled image to the output directory.
// The image bytes are fixed, so both grader runs produce identical output.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png missing beside main.ts");
}
// The gate allows at most 1 MiB; refuse to ship anything larger.
const size = statSync(src).size;
if (size > 1_048_576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
copyFileSync(src, join(outDir, "entry.png"));
