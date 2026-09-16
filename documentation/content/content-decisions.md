# Content decisions

## Open follow-ups

- **Atharva Aware (2024-25)** — flagged by Jesal for investigation, reason
  not yet recorded here. Card is still live pending that review.

## 2026-09-16

Built out Creative Coding - SSD 2024-25 and added Creative Coding - SSD
2023-24 as a 7th gallery (not in the original six-gallery plan — added here,
in `content-plan.md`, `gallery-status.md`, and the root landing page, once
the raw submission archive turned out to have usable material).

Both were sourced from raw per-student submission folders outside this repo
(not tracked here) — 2024-25 from a "Creative Coding Submission 2024-25"
archive organized one folder per student, 2023-24 from a "FY Creative Coding
(2023-24)" archive organized one folder per assignment, then per student.
Each student's raw folder typically contained many candidate zips/folders
(p5 Web Editor auto-exports, iteration/stage/version dumps, screen
recordings, WIP screenshots) rather than one clean final submission. Rules
used to pick what made it into each gallery:

- **"Latest" selection**: candidates were grouped by name after stripping
  p5 Web Editor timestamp suffixes, stage/iteration/part/step/ver markers,
  and words like "final"/"working"/"copy"/"redo"; the group's winner is
  whichever has "final" in its name, else the highest version/step number,
  else the latest embedded export timestamp.
- **Distinct vs. versioned**: candidates that don't share a common base name
  after that stripping are treated as genuinely separate sketches, not
  versions of one thing, and each gets its own card (e.g. Aadit Vanjari has
  4 cards — fish_design, shark_design, UH-OH, OH_OH! — because those are
  differently-themed p5 exports, not iterations). This is a heuristic, not
  hand-verified per student; expect some avoidable duplicates (e.g. a typo
  like "Assigment" vs "Assignment" splitting what's probably one lineage
  into two cards) that can be pruned by hand later.
- **2023-24 "Assig 2 Redo"** supersedes a student's original "Assig 2"
  entirely when a redo folder exists for them (kashish chhugani, Dhruv
  Belekar, Kashvi Shah, kaushik, soham G); two students (Ishwari Patil,
  06.Ishwari Patil's redo) had a redo folder but no original.
- **Students excluded entirely**: no gallery card was created for students
  whose assignment-2 folder contained only screen recordings/screenshots/
  WhatsApp media with no actual p5 code to run (2024-25: Ananya Raut, Diti
  pokar, Hemmenth Kumar, neharika nair, nidhi ganguli, Radhika Mistry,
  sayali, shreeya bhanushali; 2023-24: Bhoomija Pandey, Maanvi, Yasha
  Trivedi, Shreeraj pawar, Ishwari Patil).
- **Non-standard folder names recovered by hand** (2024-25 only): Bhakti
  Sharma's assignment 2 lived under a folder named "Exercise 2", Arpita
  Dhanawade's under "Assign 1 & 2 zip", Pratyush Girap's under "Zip files"
  — these don't match the "assignment 2" naming pattern used everywhere
  else and were found and included manually rather than by the general
  heuristic above.
- **Shared libraries**: both galleries follow the 2025-26 pattern — a
  single `_shared/libs/` per gallery holding one copy each of p5.js and
  p5.sound.min.js (plus p5.min.js/p5.dom.min.js/p5.svg.js for the one 2024-25
  sketch, Parikshit's Car_game, that used the DOM/SVG-addon editor template)
  referenced via `../_shared/libs/...` — regardless of whether a student's
  own export bundled a local copy or pointed at a CDN URL, both were
  rewritten to the shared local path so every sketch runs offline against
  one consistent library version.
- **Thumbnails**: auto-captured by loading each sketch headlessly (Chrome
  via puppeteer-core) and screenshotting its `<canvas>` a couple of seconds
  after load, with a fake webcam device enabled for sketches using
  `createCapture`. Sketches that only draw in response to user interaction
  (clicks, mouse-wheel, drag) will show a blank/near-blank first frame —
  known and accepted, not a bug; can be replaced by hand later.

**Post-review pruning (same day)**, after Jesal reviewed the initial
2024-25 build: for students where the heuristic above produced multiple
cards, he picked the single actual submission by hand rather than leaving
all candidates live —

- Aadit Vanjari: kept "oh oh!" only; removed fish_design, shark_design, and
  UH-OH.
- Arya Ghagare: kept "Bird Game" only; removed bird_body and pipes_only.
- Parikshit: kept "car Game" only; removed Moving_Lanes and
  My_Car_drawing.

The surviving single-card folders/thumbnails for each were renamed to drop
the now-redundant project-label suffix (e.g. `Aadit_Vanjari_oh_oh/` →
`Aadit_Vanjari/`), matching the plain-student-name slug convention used
everywhere else a student has only one card.

Also hidden (code and thumbnail kept on disk, just removed from the
`projects` array so no card shows): **anaya raul** and **Arpita
Dhanawade** — both recovered from non-standard folder names per above;
Jesal wants to hold off surfacing these two for now.

**2023-24 post-review pruning**: Jesal removed four students outright
(folder, thumbnail, and `projects` entry all deleted, not just hidden) —
Aayush Ghadge, Ananya Bhagat, kashish chhugani, and Soham Gaikwad. Note
**soham G** (lowercase, a distinct student — his only submission was an
Assig 2 Redo with no original, see the general rules above) was
deliberately kept and is not the same person as Soham Gaikwad.

He also resolved vignesh shetty's two near-duplicate cards (a typo split
what was probably one lineage into "Assigment" and "Assignment", per the
heuristic's known limitations above): kept "Assigment" (the typo one),
removed "Assignment", and renamed the surviving folder/thumbnail from
`vignesh_shetty_assigment` to the plain `vignesh_shetty` slug.

## 2026-09-04

- The existing (previously repo-root) Creative Coding gallery is the
  **2025-26** batch, not 2024-25 — based on Cabinet's `cabinet-entries.tsv`
  id `students-creative-coding-2025-26` for this repo, confirmed against
  this repo's own commit history (all content added mid-2026).
- Folder/URL slugs use plain ASCII (`ssd-papiermache`, `dragons-of-ssd`)
  while visible page titles use correct typography (Papier-mâché).
- No intermediate category folders (`/creative-coding/`, etc.) — the root
  landing page provides grouping, URLs stay flat.
