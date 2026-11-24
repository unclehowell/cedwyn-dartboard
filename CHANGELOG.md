# Changelog

## [Unreleased]

### Updated
- Separate the NPCC 29 September internal-review outcome (six-week guidance point: 10 November) from the 9 October search-disclosure response (six-week guidance point: 20 November); clarify that the latter is ICO guidance, not a hard expiry, and keep the complaint status as not submitted.
- Record the National Library of Wales's 17 November 2026 response on the two 1974 Report Wales recordings; preserve the conflicting FOI/2026/16 and FOI/2026/17 references, link both catalogue entries, and keep the separate preservation action visibly unresolved.


## [0.1.0] - 2026-10-24

### Improved
- Add a consistent, high-contrast `:focus-visible` outline for links, buttons and form controls to make keyboard navigation easier to track.
- Respect the existing dark/brass design tokens; no case data or FOI statuses changed.

### Reviewed
- Read the static styles and public-record workflow documentation. Dynamic data correctness requires running the app and its existing tests in the deployment environment; this CSS-only change was not represented as a full runtime test.
