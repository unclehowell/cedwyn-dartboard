import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../public/data");
const disclosure = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/disclosure-record.json"), "utf8"));
const roadmap = JSON.parse(readFileSync(resolve(root, "roadmap.json"), "utf8"));
const parts = [1, 2, 3].map((n) => JSON.parse(readFileSync(resolve(root, `roadmap-part-${n}.json`), "utf8")));

assert.equal(disclosure.generated, "2026-11-21T12:02:36Z");
assert.equal(disclosure.positionAsOf, "21 Nov 2026");
assert.equal(disclosure.countBasis, "6 Nov 2026");
assert.equal(disclosure.totals.requests, 318);
assert.equal(disclosure.totals.institutions, 85);
assert.equal(disclosure.totals.clocked, 96);
assert.equal(disclosure.totals.met, 35);
assert.equal(disclosure.totals.missed, 9);
assert.equal(disclosure.totals.pending, 31);
assert.equal(disclosure.totals.attachments, 53);
assert.equal(disclosure.byClass["substantive disclosure"], 13);
assert.equal(disclosure.byClass.partial, 22);
assert.equal(disclosure.byClass["not held"], 39);
assert.equal(disclosure.byClass["acknowledgement only"], 67);
assert.equal(disclosure.byClass["no reply"], 81);
assert.equal(disclosure.byClass["no reply by deadline"], 3);
assert.equal(Object.values(disclosure.byClass).reduce((a, b) => a + b, 0), 318);
assert.equal(disclosure.closures.length, 18);
assert.equal(disclosure.closures.every((c) => c.status === "requester_closed"), true);
assert.equal(disclosure.classes.includes("requester_closed"), false);
assert.ok(disclosure.liveProcesses.some((p) => p.reference === "Z084NQV" && p.status === "live"));
assert.ok(disclosure.liveProcesses.some((p) => p.reference === "FOI 261029052" && p.due === "2026-11-26"));
assert.ok(disclosure.liveProcesses.some((p) => p.reference === "FOI 3203/2026" && p.status === "overdue"));
assert.ok(disclosure.closures.some((c) => c.body === "Ministry of Defence" && c.laterUpdate?.reference === "FOI2026/25726" && c.laterUpdate.date === "2026-11-21"));
assert.ok(disclosure.institutions.find((i) => i.name === "Amgueddfa Cymru - Museum Wales").convs.some((c) => c.ref === "FOI 2026-020" && !c.closure));
assert.equal(roadmap.as_of, "2026-11-21");
assert.equal(roadmap.statuses.requester_closed.length > 0, true);
assert.equal(roadmap.request_summary.requests, 318);
assert.equal(roadmap.current_position.live_processes.length, 9);
assert.equal(roadmap.current_position.missing_records.length, 9);
for (const p of parts) {
  assert.equal(p.as_of, "2026-11-21");
  assert.equal(p.generated, "2026-11-21T12:02:36Z");
}
assert.ok(roadmap.lanes.find((l) => l.id === "ministry-of-defence").closures.some((c) => c.date === "2026-11-21"));
console.log("Disclosure snapshot checks passed.");
