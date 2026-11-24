// Make the AI Judge Laugh: Cat Reviews Its Human — make.fun entry
// Writes one funny single-line one-star review, written by a house cat
// about its human, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. He fills the bowl at 6 a.m. sharp, then sleeps through my 3 a.m. performance review of his face.";

// Gate from the competition rules: UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
function checkGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`gate: entry is ${points} code points, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
  if (text.includes("\n")) {
    throw new Error("gate: entry must be a single line");
  }
}

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");

// Read-back verification: the file on disk must hold exactly the entry.
const written = readFileSync(outPath, "utf8").replace(/\n$/, "");
if (written !== ENTRY) {
  throw new Error("verify: file content differs from the entry");
}
checkGate(written);
const sha256 = createHash("sha256").update(written, "utf8").digest("hex");
console.log(
  `wrote ${outPath} (${[...ENTRY].length} code points, sha256 ${sha256}), verified: ${JSON.stringify(ENTRY)}`,
);
