// office-joke-open-01: writes one office-life joke to /output/entry.txt
// Gate: UTF-8 text, 1-200 characters, single line, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I set my status to 'in a meeting' so I could attend the meeting about why we're in too many meetings.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must have no leading or trailing whitespace");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      throw new Error("entry must not contain control characters");
    }
  }
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

validate(JOKE);
writeFileSync(outPath, JOKE, "utf8");

// Read back and verify byte-for-byte.
const back = readFileSync(outPath, "utf8");
if (back !== JOKE) {
  throw new Error("entry.txt read-back mismatch");
}
validate(back);
console.log(`wrote ${outPath} (${JOKE.length} chars)`);
