# Changelog

## 2026-09-16 — Built Creative Coding 2024-25, added 2023-24

- Built out `ssd-creative-coding-2024-25/` (18 students, 25 sketches) from
  the raw "Creative Coding Submission 2024-25" archive, replacing its
  placeholder README.
- Added `ssd-creative-coding-2023-24/` (18 students, 20 sketches) as a new
  7th gallery — not in the original six-gallery plan — from the raw "FY
  Creative Coding (2023-24)" archive. Linked from the root landing page;
  `content-plan.md` and `gallery-status.md` updated accordingly.
- Both follow the 2025-26 gallery's structure exactly (per-student folders,
  gallery-local `_shared/libs/`, `script.js`-driven card grid). See
  `documentation/content/content-decisions.md`'s 2026-09-16 entry for the
  roster-selection rules (raw submissions had many candidate zips per
  student, redo-vs-original handling, exclusions, etc.) and
  `documentation/architecture.md`'s new section for structural notes.
- Not done here: `documentation/deployment.md`'s Cabinet `deploy.yml`
  mount-path fix (still pending from the 2026-09-04 reorg) and
  `cabinet-entries.tsv` rows for these two galleries — both are Cabinet-repo
  changes, out of scope here. **Per `deployment.md`, this repo's `main`
  should not be pushed until that Cabinet-side fix ships.**

## 2026-09-04 — Reorganised into SSD Student Work

Repository reframed from a single-purpose "SSD Creative Coding" site into a
general "SSD Student Work" repo holding multiple galleries.

- Moved the existing Creative Coding gallery (14 student folders, `_shared/`
  libs, thumbnails, and the old root `index.html`/`script.js`/`style.css`)
  from repo root into `ssd-creative-coding-2025-26/`, unchanged internally —
  year determined from Cabinet's `cabinet-entries.tsv` id
  `students-creative-coding-2025-26`.
- Fixed a pre-existing casing bug in the gallery's `script.js`: the data
  array referenced folder `Video_Filters`, but the real folder is
  `Video_filters` — likely a dead card link on the previously-live site
  (GitHub Pages is case-sensitive).
- Replaced the repo-root `index.html`/`style.css` with a new, minimal SSD
  Student Work landing page linking to all six planned galleries, marking
  the five not-yet-built ones as upcoming.
- Created placeholder directories with a minimal README each for
  `ssd-creative-coding-2024-25/`, `ssd-emergent-tech-2024-25/`,
  `ssd-emergent-tech-2026-27/`, `dragons-of-ssd/`, `ssd-papiermache/`. None
  of these were built out.
- Created `shared/` at repo root, empty except a README explaining its
  purpose and why the gallery-local `_shared/` inside
  `ssd-creative-coding-2025-26/` was deliberately left where it is.
- Added this `documentation/` structure (technical) and
  `documentation/content/` (curatorial/content planning), previously absent.
- Not done here: Cabinet's `.github/workflows/deploy.yml` still mounts this
  repo at `teaching/ssd-creative-coding/` (old single-gallery assumption) —
  see `deployment.md` for the required follow-up change, made in the Cabinet
  repo, not this one.
