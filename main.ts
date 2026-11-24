// The Most Honest Outage Line — make.fun entry.
// Writes a single honest status-page line to /output/entry.txt.
// Deterministic, standard library only, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Every server I talk to is down from here, and I can't tell yet whether it's my connection or theirs — I'm still here, and I'll update as soon as I can check.";

const OUTPUT_PATH = "/output/entry.txt";

function validate(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry line must be 1-160 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
}

function main(): void {
  validate(LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE + "\n", "utf8");
}

main();
