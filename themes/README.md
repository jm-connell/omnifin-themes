# Theme catalogue

Implementation notes for each theme. For installation, see the
[root README](../README.md).

---

## Omnifin Dark — `omnifin-dark.css`

A near-black theme meant to be the everyday default. Nothing in it competes
with poster artwork.

**Design intent.** Four surface steps from `#08090c` to `#1e2028` carry
elevation so panels read as layers rather than outlined boxes. Primary text is
near-white (`#f5f5f7`); secondary stays at ~78% opacity so metadata remains
readable. The ice-cyan accent (`#58e0fb`) appears only on interactive and
stateful elements.

**Typography.** Oxanium for UI and titles (one geometric family). Header tabs
are sized up (~1.15em) with an accent underline on the active tab. Text colours
are forced through stock `color: inherit !important` on cards and section
titles so the theme stays readable even when Jellyfin’s built-in Light theme
is selected.

**Beyond recolouring.** Posters round via `.cardPadder` (stock's visible shape),
not only `.cardImageContainer`. The translucent header gets a real backdrop blur
(stock disables it). Desktop hover lifts the poster slightly (not `.cardBox` —
that fights stock TV focus scale) and tints it gray. Detail-page hero
art fades into the page; scrollbars are thin overlays. Player seek/volume
sliders use the accent — stock hardcodes `#00a4dc` on `.mdl-slider`.

**Tuning**

| Property | Default | Notes |
|---|---|---|
| `--accent-color` | `#58e0fb` | Derivatives are computed with `color-mix()`. Engines without it keep the default cyan derivatives. |
| `--corner-radius` | `0.75em` | `0px` gives a squared-off look. `em` units scale with `--ui-scale`. |
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
