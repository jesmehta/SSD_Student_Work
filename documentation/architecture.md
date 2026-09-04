# Architecture

## Repo purpose

This repository ("SSD Student Work") hosts multiple independent student-work
galleries from different SSD courses and academic years, plus a lightweight
root landing page that links to them.

## Top-level layout

```
/
├── index.html                     — SSD Student Work landing page
├── style.css                      — landing page styles (self-contained)
│
├── ssd-creative-coding-2024-25/   — placeholder, not yet built
├── ssd-creative-coding-2025-26/   — existing Creative Coding gallery (moved from repo root)
│
├── ssd-emergent-tech-2024-25/     — placeholder, not yet built
├── ssd-emergent-tech-2026-27/     — placeholder, not yet built
│
├── dragons-of-ssd/                — placeholder, not yet built
├── ssd-papiermache/                — placeholder, not yet built
│
├── shared/                        — reserved for genuinely cross-gallery resources (currently empty)
│
└── documentation/                 — this folder
```

No intermediate category folders (`/creative-coding/`, `/emergent-tech/`,
`/papiermache/`) — each gallery sits directly at repo root under its own
year-specific slug, and the root landing page provides the conceptual
grouping visually instead.

## Why one universal gallery framework wasn't built

The six planned galleries have different content shapes:

- **Creative Coding** — interactive p5.js sketches, one folder per student,
  each with its own `index.html`/`sketch.js`/`style.css`, driven by a data
  array in a root-level `script.js` per gallery.
- **Emergent Technologies** — project/outcome galleries: images, video,
  interactive projects, descriptions, attribution. May end up reusing the
  Creative Coding interaction model, but that isn't assumed yet since no
  material exists to design against.
- **Dragons of SSD** / **Playing with Pulp** — simpler image-led galleries,
  no interactivity expected.

Forcing all six into one framework now, before the latter four have any
content, would be speculative design. Shared infrastructure belongs in
`shared/` once a second gallery actually demonstrates the same requirement.

## Creative Coding 2025-26 internals

Unchanged from before the move except for location. Each student folder is
self-contained (`index.html`, `sketch.js`, `style.css`, assets) and loads the
shared p5.js/p5.sound libraries via `../_shared/libs/`, which lives inside
`ssd-creative-coding-2025-26/_shared/` (gallery-local, not the repo-root
`shared/` — see that folder's README for why). The gallery's own
`index.html`/`script.js` renders the card grid from a data array in
`script.js`; thumbnails are root-level PNGs inside the gallery folder.
