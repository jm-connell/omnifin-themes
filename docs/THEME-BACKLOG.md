# Theme backlog

Concepts designed but not yet implemented. Full specifications — mood, palette,
typography, effects and a token block for each — are in
[`../Jellyfin UI Theme Concepts_v2.md`](../Jellyfin%20UI%20Theme%20Concepts_v2.md).

Read [AUTHORING.md](AUTHORING.md) before picking one up. Note that the concepts
document was written for a *fork* of `jellyfin-web` with its own component tree,
so its `--bg-primary` / `--card-radius` token names and its React theme-switcher
section do not apply here. Take the palettes, typography and effect descriptions;
map them onto the real selectors in [SELECTORS.md](SELECTORS.md) and onto this
repo's `--of-*` naming.

## Status

| Theme | Concept | Difficulty | Status |
|---|---|---|---|
| Vaporwave / Synthwave | §3 | Medium | Done — `themes/omnifin-vaporwave.css` |
| General dark | — | Easy | Done — `themes/omnifin-dark.css` |
| Theater Blackout | §1 | Easy | Not started |
| Retro Hi-Fi | §2 | Medium | Not started |
| Arctic Frost | §4 | Medium | Not started |
| Terminal / Monochrome | §5 | Easy | Not started |
| Wabi-Sabi | §6 | Medium | Not started |
| Phoenix TV | §7 | Medium | Not started |
| Mission Control | §8 | Medium | Not started |
| Library of Alexandria | §9 | Medium | Not started |
| Brutalist Concrete | §10 | Easy | Not started |
| Miami Vice | §11 | Medium | Not started |
| Terra / Earthen | §12 | Medium | Not started |
| Glitchcore / Datamosh | §13 | Hard | Not started |
| Cyberpunk / Neo-Shinjuku | §14 | Hard | Not started |

## Feasibility notes

The concepts document assumes some effects that a pure-CSS overlay on the stock
client cannot deliver. Where that is the case, ship the CSS approximation and say
so in the theme's entry in `themes/README.md`.

| Concept asks for | Reality |
|---|---|
| WebGL refractive glass (Cyberpunk, Glitchcore) | Not possible. Approximate with layered offset shadows and `backdrop-filter`, as Vaporwave does. |
| Randomised per-element offsets (Glitchcore) | No randomness in CSS. Use `:nth-child()` buckets with different keyframe delays. |
| Renaming sections, e.g. "Recently Added" → "New Acquisitions" (Alexandria) | Possible only where the string is not inside an element with other children, using `visibility` plus a `::after`. Fragile across locales; prefer not to. |
| Corner decorations and watermarks (Phoenix TV, Miami Vice) | Fine. Use `::before` / `::after` on `.backgroundContainer`, which is fixed and full-viewport. |
| Custom loading spinners | `.progressring-spiner` is themeable; replacing its geometry entirely is not worth the fragility. |
| Per-theme light mode (Arctic Frost, Wabi-Sabi) | Ship as a separate theme file rather than a media query. Jellyfin's own light theme changes different rules than the dark one. |
| Textures via inline SVG noise | Works. Keep data URIs small; they are inlined into every page load. |

Two concepts need a preliminary decision before implementation:

- **Terminal** ships an amber variant. Do it as a second file
  (`omnifin-terminal-amber.css`) rather than a `data-theme` selector, since Skin
  Manager applies one stylesheet at a time.
- **Miami Vice** specifies a light gradient background. Jellyfin's light theme
  rules live in `src/themes/light/theme.scss` and differ from the dark ones; a
  light theme must be verified against that file, not
  `src/themes/dark/theme.scss`.
