# Repository rules

Themes for the Jellyfin web client. Read this before changing anything.

## What this repo is

Pure CSS. Every theme is one self-contained stylesheet that gets injected into
the **stock, unmodified** Jellyfin web client, either by the Skin Manager plugin
or by pasting into Dashboard > General > Custom CSS. There is no build step, no
preprocessor and no JavaScript. If a feature cannot be done in a single CSS file
that a user can paste into a textarea, it does not belong here.

## Layout

```
themes/                 One .css file per theme. This is the product.
themes/README.md        Catalogue and per-theme tuning tables.
skins.json              Skin Manager manifest. Must stay in sync with themes/.
docs/SELECTORS.md       Verified Jellyfin selector reference. Start here.
docs/AUTHORING.md       Step-by-step for adding or editing a theme.
docs/THEME-BACKLOG.md   Designed but unimplemented themes.
previews/               One screenshot per theme, named <theme-id>.png.
scripts/                Reference sync and manifest validation.
.reference/             Gitignored checkouts of jellyfin-web. Never edit.
```

## Hard rules

1. **Verify every selector before you use it.** Run `npm run reference:sync`,
   then grep `.reference/jellyfin-web-stable/src` for the class. A selector that
   does not exist in that tree does not go in a theme file. Guessing at class
   names is the single most common way these themes break.
2. **One file per theme.** Splitting is only allowed for Skin Manager addon
   sheets (`@sm-import-if`), which must be optional and off by default.
3. **Never fork or patch jellyfin-web.** Themes must work against a stock server.
4. **Namespace custom properties `--of-`.** The only exceptions are the
   `--jf-palette-*` bridge block and Skin Manager user variables, which the
   plugin names for you.
5. **Match stock `!important`, do not add new ones.** Use `!important` only where
   the stock rule already has it, and say so in a comment on the rule.
6. **Do not break TV.** Keep the `.card:focus` border and
   `.emby-button.show-focus:focus` visible, keep `.layout-tv` font scaling, and
   exclude TV from `backdrop-filter`.
7. **Every user-facing knob is a Skin Manager variable** declared in `skins.json`
   and consumed as `var(--name, fallback)` with a complete fallback. Expensive
   effects must be tunable to zero.
8. **`npm run check` must pass** before you call any change done.

## Working agreements

- Keep the section banner structure used by the existing themes. Same order,
  same headings, so the files stay diffable against each other.
- Comment *why*, never *what*. The only comments worth writing here explain a
  stock rule you are fighting, a specificity choice, or a compatibility
  fallback.
- Prefer legacy global class names over `.Mui*` ones: the former work on both
  10.11 and 12, the latter only on 12.
- Avoid `color-mix()`, `oklch()`, `:has()` and `inset` shorthand as load-bearing
  syntax. Old Tizen and WebOS webviews are a real part of the audience. Where a
  modern function is genuinely worth it, ship a plain fallback declaration
  immediately before it.
- When adding a theme, update in the same change: `themes/<id>.css`,
  `skins.json`, `themes/README.md`, the table in `README.md`, and
  `docs/THEME-BACKLOG.md`.

## Adding a theme

`docs/THEME-BACKLOG.md` holds the designed-but-unbuilt concepts with their
palettes. Follow `docs/AUTHORING.md`; it has the file skeleton and the checklist
of surfaces a theme must cover to look finished.

## Verifying

```bash
npm run reference:sync   # clone/refresh the jellyfin-web checkouts
npm run check            # lint + manifest validation + selector existence check
```

`npm run verify` is the one that enforces rule 1: it fails if a theme uses a
class name that does not appear anywhere in the Jellyfin source. It silently
passes if `.reference/` is missing, so run `reference:sync` first or the check is
meaningless.

There is no way to unit-test a theme. Visual verification means loading it on a
real server and walking Home, a library grid, a movie detail page, an episode
list, search, the video OSD, an action sheet, and the dashboard.
