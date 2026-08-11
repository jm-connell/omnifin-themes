# Theme catalogue

Implementation notes for each theme. For installation, see the
[root README](../README.md).

---

## Omnifin Dark — `omnifin-dark.css`

A neutral, low-chroma dark theme meant to be the everyday default. Nothing in it
competes with poster artwork.

**Design intent.** Four surface steps from `#0d0d0f` to `#26262e` carry all
elevation, so panels read as layers rather than as outlined boxes. Text uses
three opacity tiers instead of three greys, which keeps contrast correct if the
background is changed. The accent appears only on interactive and stateful
elements.

**Beyond recolouring.** Posters get the corner radius from `--corner-radius`, the
translucent header gets a real backdrop blur (stock explicitly disables it),
desktop cards lift on hover, detail-page hero art fades into the page, and
scrollbars become thin unobtrusive overlays.

**Tuning**

| Property | Default | Notes |
|---|---|---|
| `--accent-color` | `#00a4dc` | Derivatives are computed with `color-mix()`. Engines without it keep the default blue derivatives. |
| `--corner-radius` | `0.5em` | `0px` gives a squared-off look. `em` units scale with `--ui-scale`. |
| `--ui-scale` | `1` | Multiplies `html`, `.layout-tv` and `.layout-mobile` font sizes together, so Jellyfin's 20px TV floor is preserved. |

---

## Omnifin Vaporwave — `omnifin-vaporwave.css`

Outrun. Deep purple, cyan and hot pink, with the distortion treated as part of
the design rather than decoration.

**Design intent.** The palette is two neons on a purple field. Cyan marks state
(focus, active, links), pink marks selection and emphasis. Titles carry a
two-colour text shadow that approximates chromatic aberration.

**Effects and how they are built.**

| Effect | Implementation |
|---|---|
| Drifting sunset background | `background-position` animation on `.backgroundContainer`, a single fixed `contain: strict` element |
| Perspective grid horizon | `.backgroundContainer::before` with two repeating gradients and `perspective() rotateX()` |
| CRT scanlines | `body::after`, fixed, `z-index: 9999` — above the header and now playing bar, below `.dialogContainer` |
| Chromatic fringing | Paired pink/cyan `text-shadow` offsets on `.itemName` and `.sectionTitle` |
| Neon card depth | Offset pink and cyan `box-shadow` layers on `.cardImageContainer` |
| Pulsing selected library | `box-shadow` keyframe on `.navMenuOption-selected` |

Scanlines hide themselves during video playback via `body.hide-scroll`, and are
disabled entirely in the TV layout.

**Tuning**

| Property | Default | Notes |
|---|---|---|
| `--accent-color` | `#00ffff` | Cyan half of the palette |
| `--accent-secondary` | `#ff00aa` | Pink half |
| `--glow-strength` | `1` | Multiplies the alpha of every glow and fringe. `0` removes them without changing layout |
| `--scanline-opacity` | `0.05` | Above about `0.12` it starts to hurt readability |
| `--grid-opacity` | `0.14` | `0` disables |
| `--background-animation-speed` | `24` | Seconds per sweep. Raise it on weak hardware; the animation is cheap but not free |

**Known limits.** Real refractive glass distortion is not possible in CSS; the
fringing here is a layered-shadow approximation. `backdrop-filter` on the header
is skipped in the TV layout because TV webviews handle it poorly.
