# Authoring a theme

How to add a theme to this repo. Assumes you have read [AGENTS.md](../AGENTS.md)
and have `docs/SELECTORS.md` open alongside.

## Before you start

```bash
npm install
npm run reference:sync
```

This clones the official client into `.reference/`. Every selector you write must
be verifiable there:

```bash
rg -n '\.cardOverlayContainer' .reference/jellyfin-web-stable/src
```

The single most useful file in that tree is
`.reference/jellyfin-web-stable/src/themes/dark/theme.scss`. It is the complete
stock dark colour scheme in 525 lines, and a theme is essentially a rewrite of
it. Read it top to bottom once before writing anything.

## Naming

| Thing | Convention | Example |
|---|---|---|
| Theme ID | `omnifin-<concept>`, lowercase, hyphenated | `omnifin-vaporwave` |
| File | `themes/<theme-id>.css` | `themes/omnifin-vaporwave.css` |
| Display name | Title case | `Omnifin Vaporwave` |
| Preview | `previews/<theme-id>.png` | `previews/omnifin-vaporwave.png` |
| Custom properties | `--of-<role>` | `--of-surface-2` |

Name tokens by role, not by appearance. `--of-surface-2` survives a palette
change; `--of-dark-purple` does not.

## File skeleton

Keep this structure and section order. It makes themes diffable against each
other, which is how you spot a surface one theme covers and another forgot.

```css
/*!
 * <Display Name>
 * <One-line description>
 *
 * Theme ID:   <theme-id>
 * Version:    1.0.0
 * Jellyfin:   10.10, 10.11 (verified against 10.11.11), 12.x (bridged)
 * Author:     <author>
 * Source:     https://github.com/jm-connell/omnifin-themes
 * License:    MIT
 */

@import url("https://fonts.googleapis.com/css2?family=...&display=swap");

/*  1.  Tokens                          :root, --of-* */
/* 1b.  Jellyfin 12 bridge              --jf-palette-* */
/*  2.  Base surfaces and typography    html, .backgroundContainer, text colours */
/*  3.  Header and tabs                 .skinHeader, .emby-tab-button */
/*  4.  Navigation drawer               .mainDrawer, .navMenuOption */
/*  5.  Buttons                         .emby-button, .raised, .paper-icon-button-light */
/*  6.  Form controls                   .emby-input, .emby-select-withcolor, .emby-checkbox */
/*  7.  Cards and library grid          .card, .cardImageContainer, .defaultCardBackground* */
/*  8.  Indicators and progress         .itemProgressBar*, .playedIndicator */
/*  9.  Detail pages                    .itemBackdrop, .detailRibbon, .mediaInfoText */
/* 10.  Lists, dialogs, sheets, toasts  .listItem, .dialog, .actionSheet, .toast */
/* 11.  Player and now playing bar      .videoOsdBottom, .appfooter */
/* 12.  Live TV guide                   .programCell* */
/* 13.  Scrollbars                      * { scrollbar-color }, ::-webkit-scrollbar-* */
/* 14.  Book, comic and PDF readers     #bookPlayer, #comicsPlayer, #pdfPlayer */
/* 15.  Reduced motion                  @media (prefers-reduced-motion: reduce) */
```

`@import` must be the first rule in the file after the header comment; CSS
ignores it anywhere else.

## Coverage checklist

A theme that only recolours the background looks unfinished the moment you open a
dialog. Cover all of these, in roughly this priority order:

- [ ] `html` background and text colour
- [ ] `.backgroundContainer` and `.backgroundContainer.withBackdrop`
- [ ] `.skinHeader-withBackground` and `.skinHeader.semiTransparent`
- [ ] `.mainDrawer`, `.navMenuOption:hover`, `.navMenuOption-selected`,
      `.selectedMediaFolder`
- [ ] `.raised` / `.fab`, `.button-submit`, `.button-delete`, `.button-link`,
      `.emby-button.show-focus:focus`
- [ ] `.paper-icon-button-light` hover, active and focus
- [ ] `.emby-input`, `.emby-textarea`, `.emby-select-withcolor` and their focus
      states, `.emby-checkbox` checked state, the `.inputLabel*` family
- [ ] `.cardImageContainer` radius and placeholder colour,
      `.defaultCardBackground1`–`5`, the `.card:focus` ring
- [ ] `.itemProgressBarForeground`, `.playedIndicator`, `.countIndicator`
- [ ] `.detailRibbon`, `.noBackdropTransparency ...`, `.mediaInfoText`,
      `.detailTableBodyRow-shaded:nth-child(even)`
- [ ] `.listItem:hover` / `:focus`, `.listItem-border`, `.paperList`,
      `.actionsheetDivider`, `.toast`, `.infoBanner`
- [ ] `.appfooter`, `.videoOsdBottom`
- [ ] `.programCell-*` and the guide focus states
- [ ] scrollbars
- [ ] reader IDs
- [ ] `@media (prefers-reduced-motion: reduce)`

Missing any of the `!important` rules listed in
[SELECTORS.md](SELECTORS.md#specificity-and-important) leaves stock Jellyfin blue
showing through your palette. That is the usual reason a theme looks half-applied.

## Exposing settings

Skin Manager turns a `vars` entry in `skins.json` into a CSS custom property and
injects it ahead of your stylesheet. Key casing does not matter; the plugin
kebab-cases it. `accentColor` and `ACCENT_COLOR` both become `--accent-color`.

Read it with a complete fallback, because users on Custom CSS or older plugin
versions never get the injected value:

```css
:root {
    --of-accent: var(--accent-color, #00a4dc);
}
```

Types are `text`, `color`, `number` and `boolean`. There is no conditional logic
in CSS, so express toggles as numeric intensities that mean "off" at zero rather
than as booleans:

```css
/* Good: setting --scanline-opacity to 0 removes the effect entirely. */
body::after {
    opacity: var(--scanline-opacity, 0.05);
}

/* Also works: a duration of 0s stops an animation. */
animation: of-drift calc(var(--background-animation-speed, 24) * 1s) infinite;
```

Reserve `boolean` vars for `@sm-import-if` addon sheets, which are the only real
conditional the plugin offers:

```css
/* @sm-import-if mediaBarSupport https://cdn.jsdelivr.net/gh/jm-connell/omnifin-themes@main/themes/addons/media-bar.css */
```

`npm run validate` cross-checks the manifest against the stylesheet in both
directions: every declared var must be used, and every non-`--of-`/`--jf-` var
the stylesheet reads must be declared.

## Deriving colours

Accent-derived shades cannot be computed at runtime without `color-mix()`, which
older TV webviews lack. Declare the literal fallback first and let unsupported
engines drop the second line:

```css
--of-accent-soft: rgba(0, 164, 220, 0.18);
--of-accent-soft: color-mix(in srgb, var(--of-accent) 18%, transparent);
```

On those devices the derivative stays at its default colour even if the user
recolours the accent, which is acceptable degradation. Wrap the block in
`/* stylelint-disable declaration-block-no-duplicate-custom-properties */` with a
comment explaining why.

## Performance

Themes run on Raspberry Pis, 2018 smart TVs and phones.

- `backdrop-filter` is the single most expensive property here. Use it on the
  header and dialogs at most, and exclude `.layout-tv`.
- Animate only `transform` and `opacity`. Animating `background-position` on
  `.backgroundContainer` is acceptable because it is one fixed, `contain: strict`
  element, but keep the duration long.
- Never animate `box-shadow` or `filter` on cards; there can be a hundred on
  screen. Animate them on hover only, scoped to `.layout-desktop` and
  `(hover: hover) and (pointer: fine)`.
- Anything continuous must be reachable from `@media (prefers-reduced-motion:
  reduce)` and tunable to zero through a variable.

## Before you open a PR

```bash
npm run check
```

That runs stylelint, validates `skins.json` against your stylesheet in both
directions, and fails if you used a class name that does not exist in the
Jellyfin source. The last check needs `.reference/` present, so run
`npm run reference:sync` first.

Then load the theme on a real server and walk: Home, a library grid, a movie
detail page, a season/episode list, search results, the video OSD, a right-click
action sheet, Settings, and the admin dashboard. Check both a desktop browser and
either a phone or TV client. Capture `previews/<theme-id>.png` from the Home
screen at 1920×1080.

Finally, update `skins.json` (bump `version` if the CSS changed),
`themes/README.md`, the table in `README.md`, and mark the theme done in
`docs/THEME-BACKLOG.md`.
