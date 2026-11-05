# Dartboard

The Dartboard webapp of [cedwyn.bucklerfamily.estate](https://cedwyn.bucklerfamily.estate/dartboard/), in its own repository.

It was split out of `unclehowell/cedwyn` (branch `dartboard`) on 5 Nov 2026, because that repository holds about 290 branches
(~43 GB with history) and a job on one webapp should never need the rest. This repository is a few MB
(143 files, 5.4 MB at the split).

## Get the code

```
git clone --depth 1 https://github.com/unclehowell/cedwyn-dartboard.git
```

## Where to send changes (read this first)

`split-repos.json` on `unclehowell/cedwyn` main sets the mode:

- **mirror** (now): the old branch `dartboard` on unclehowell/cedwyn is still the source. `mirror.yml` here copies it every
  30 minutes. Send pull requests to `dartboard` on unclehowell/cedwyn (clone it with
  `git clone --depth 1 --single-branch --branch dartboard --filter=blob:none https://github.com/unclehowell/cedwyn.git`).
- **split-repo** (after the owner switches it): this repository is the source; send pull requests here.
  unclehowell/cedwyn copies `main` back into `dartboard`, so the live page and every old path keep working.

`SPLIT.json` records the source commit of the last copy. The app's own notes, if the branch had any, are in `APP-README.md`.

## Previews

`preview.yml` deploys every pull request to Cloudflare Pages and comments the link, once the repository secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set (Settings → Secrets → Actions). Without them it stops quietly.

## History before the split

The full history stays on the old branch: https://github.com/unclehowell/cedwyn/commits/dartboard

Latest commits on `dartboard` at the split:

| Date | Commit | Change |
| --- | --- | --- |
| 2026-10-30 | `73900e3` | Update Disclosure Dartboard through 30 Oct 2026 |
| 2026-10-27 | `129be5d` | Privacy: provenance and change-log lines reduced to sources; no working-process attributions |
| 2026-10-24 | `7943bd0` | docs(dartboard): add initial semantic changelog |
| 2026-10-24 | `3420244` | chore(dartboard): establish semantic version 0.1.0 |
| 2026-10-24 | `dd45d56` | fix(dartboard): add consistent keyboard focus indicators |
| 2026-10-24 | `2daae56` | dartboard: archaeology timeline 30 → 39 records from the research chronology — St Dochdwy’s (c. 650), the 1974 |
| 2026-10-23 | `2e3f1b7` | dartboard: archaeology timeline 29 Apr 1994 entry carries the Echo's free archive-preview line on the burial g |
| 2026-10-23 | `e1ae749` | dartboard: archaeology timeline +7 dated records from the media register (1980 Neath Guardian, 1993 and 29 Apr |
| 2026-10-23 | `303e928` | dartboard: Hive draft tier badge on each body's roadmap lane ("Draft: IN REVIEW / READY TO SEND / …", links to |
| 2026-10-23 | `9b9b4f5` | dartboard: neutral fee marker wording (£ fee asked) |
| 2026-10-23 | `9e5b787` | dartboard: neutral £ key and comment (fee asked) |
| 2026-10-23 | `4a0f23c` | dartboard: neutral wording on the free GOV.UK property search step |

Never force-push; never delete the old branch.
