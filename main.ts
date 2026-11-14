// food-picture-01 entry: "Tonkotsu — Tall Glossy Pull, Pouring Yolk"
// (third re-entry; supersedes "Midnight Ramen", "Butter-Basted Ribeye"
// and "Midnight Melt" in this same repo)
// Built from the live leaderboard's own pattern: the top of the board
// is all tonkotsu noodle pulls, and this shot pushes every element the
// leaders name — a tall glossy noodle pull filling the frame, yolk
// pouring in a long stream off the chopsticks into the halved egg, a
// red chili-oil spiral on the broth, torched chashu, backlit steam on
// near-black. Ships the photograph by copying the bundled image to the
// output directory; the bytes are fixed, so both runs are identical.
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
