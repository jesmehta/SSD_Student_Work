# Deployment

## GitHub Pages

This repo may also have its own GitHub Pages deployment configured directly
in repo Settings — that can't be verified from a local checkout. Check
https://github.com/jesmehta/SSD_CreativeCodingPage/settings/pages if the
direct URL matters.

## Cabinet multi-repo assembly (the primary consumer)

`CabinetOfCuriosities/.github/workflows/deploy.yml` checks this repo out on
every Cabinet deploy and copies it whole into the built site:

```yaml
- name: Checkout SSD Creative Coding
  uses: actions/checkout@v4
  with:
    repository: jesmehta/SSD_CreativeCodingPage
    path: _external/ssd-creative-coding

- name: Assemble SSD Creative Coding
  run: |
    mkdir -p public/teaching/ssd-creative-coding
    cp -r _external/ssd-creative-coding/. public/teaching/ssd-creative-coding/
    rm -rf public/teaching/ssd-creative-coding/.git
```

It validates with `test -f public/teaching/ssd-creative-coding/index.html`
and `test -f public/teaching/ssd-creative-coding/script.js`.

### Before this reorg

- Public URL: `<cabinet-domain>/teaching/ssd-creative-coding/` served the
  Creative Coding gallery directly (this repo's old root `index.html`).
- `CabinetOfCuriosities/content/cabinet-entries.tsv` already records this as
  id `students-creative-coding-2025-26`, confirming the moved gallery's year.

### After this reorg (as currently structured in this repo)

With Cabinet's deploy.yml unchanged, the mount destination
(`public/teaching/ssd-creative-coding/`) doesn't match this repo's new
top-level layout. The assembled result would put the new "SSD Student Work"
landing page at `teaching/ssd-creative-coding/index.html` and the actual
gallery one level deeper than intended, and Cabinet's validation step would
fail outright (`script.js` no longer exists at this repo's root).

**This repo was not changed to route around that — Cabinet's deploy.yml
needs a corresponding update, done in the Cabinet repo, not here:**

- Change the mount destination from `public/teaching/ssd-creative-coding/`
  to `public/teaching/` (copy this repo's root directly into `teaching/`),
  so the six gallery slugs land at `teaching/ssd-creative-coding-2025-26/`
  etc. — which is exactly what `CabinetOfCuriosities/docs/teaching/index.md`
  already links to.
- Update the validation step's paths accordingly (e.g.
  `public/teaching/ssd-creative-coding-2025-26/script.js`).
- Update `cabinet-entries.tsv` row `students-creative-coding-2025-26`'s path
  from `teaching/ssd-creative-coding/` to
  `teaching/ssd-creative-coding-2025-26/` once the mount change ships, and
  add rows for `ssd-creative-coding-2024-25` and `ssd-creative-coding-2023-24`
  (both now built, see `documentation/changelog.md`'s 2026-09-16 entry) plus
  the other four galleries once they're built.

### Expected new public URLs, once Cabinet is updated

- `<cabinet-domain>/teaching/` → new SSD Student Work landing page
- `<cabinet-domain>/teaching/ssd-creative-coding-2025-26/` → the moved gallery
- `<cabinet-domain>/teaching/ssd-creative-coding-2024-25/` → built, awaiting this mount fix
- `<cabinet-domain>/teaching/ssd-creative-coding-2023-24/` → built, awaiting this mount fix
- (the four other gallery slugs, once built)

Until Cabinet's deploy.yml is updated, do not push this repo's `main` to
avoid breaking Cabinet's next deploy — see the repo's own
`documentation/changelog.md` for when this move happened.
