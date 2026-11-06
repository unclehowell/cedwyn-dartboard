# `site` branch: static copy of the Disclosure Dartboard for bucklerfamily.estate/dartboard/

Plan for unclehowell/cedwyn#431 (REPO SPLIT step 3b). Nothing here is deployed; the workflow runs only by hand after merge.

## What it does
`.github/workflows/site-snapshot.yml` (manual dispatch only):
1. Reads the live app once (read-only GET crawl, the same `wget` flags as Cedwyn `tools/assemble.py` `crawl()`).
2. Saves `_db/section.sqlite` under its real name (see "Defect found" below).
3. Runs the guards the Cedwyn site build runs for this theme, from `unclehowell/cedwyn` tools: `rewrite.py`, `selfcontain.py --fix --only=dartboard`, `privacy_scrub.py`, `check_links.py --fix` then strict, `selfcontain.py` strict.
4. Fails closed unless the page carries the shared header boot (`/_cedwyn/ghf/basecamp.js`, `/_cedwyn/ghf/ghf-boot.js`) and the database file is a real SQLite file.
5. Commits the result to the `site` branch (normal push, never force), with `SNAPSHOT.json` (origin, tools commit, time, file count) and `SHARED-PATHS.txt` (every root path outside `/dartboard/` the page uses; these stay on the apex router).

The path Worker `bfe-dartboard` (same code as `bfe-argentina-3d`, source `cedwyn-dartboard@site`) would then serve `bucklerfamily.estate/dartboard/*`.

## Why not serve the raw crawl
The raw copy of the live app is not fit to publish as it is. On 6 Nov 2026 21:2xZ the same guards, run on this box against a fresh crawl, made these changes: `rewrite.py` prefixed 8 root paths and found 17 outbound links; `privacy_scrub.py` rewrote 17 passages in 9 files; `selfcontain.py` moved the header boot into 4 places and vendored 3 CDN files. After the guards: 0 outbound links, 0 subdomain or external references, header boot present, 17 files, 4.5 MB. All 26 shared non-archive paths the page uses answered on the apex.

## Open points (before any route)
- **Static header links.** The live page also carries about 70 links that Cedwyn `tools/site.py` and `tools/nav.py` add (the site directory and the webapp chain). Those two scripts need the whole site root (run alone they stop at a missing curated asset, `/nft-art/art/nfa-0001.webp`, and `areas.json`), so this copy has the client-side header (basecamp) but not those static links. Compare both at 390 px before the route goes on; if the static links are needed, read them from the live `/areas.json` in a later step.
- **Origin.** The copy is of the deployed app at `dartboard.righteous.workers.dev`, which is not yet deployed from this repo's main. Recorded as such in `SNAPSHOT.json`.
- **Shared paths.** `/_cedwyn/`, `/_ext/`, `/wiki/`, `/research/`, `/wayback/go/` stay on the apex router; when the site build stops building `/dartboard/`, check they are still built for other themes.

## Defect found (live now)
`https://bucklerfamily.estate/dartboard/_db/section.sqlite` answers 404 (checked 21:28Z, mobile Safari UA, cache-busted). The page links it (`<link rel="alternate" type="application/vnd.sqlite3">`). Cause: the origin sends no content type for that file, so `wget --adjust-extension` saves it as `section.sqlite.html`. Step 2 of the workflow fetches it by name. A lasting fix in the app: send `content-type: application/vnd.sqlite3` for `/_db/*.sqlite`.

## Order
Owner merge of this PR → dispatch the workflow → check the `site` branch → 390 px check of the copy → deploy `bfe-dartboard` with routes `bucklerfamily.estate/dartboard` and `bucklerfamily.estate/dartboard/*` → verify live → drop the dartboard row from the Cedwyn build.

— Sion's Tab agent
