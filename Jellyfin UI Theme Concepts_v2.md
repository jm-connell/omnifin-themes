# Jellyfin UI Theme Concepts — Complete Reference

A collection of 14 original theme concepts for a custom Jellyfin web UI redesign, ranging from minimal to maximalist. Each theme includes mood, colors, typography, glass treatment, special effects, and a CSS token block for quick implementation.

---

## Theme Quick Reference

| # | Theme | Vibe | Glass? | Difficulty |
|---|---|---|---|---|
| 1 | [Theater Blackout](#1-theater-blackout) | OLED, IMAX, prestige | Minimal | Easy |
| 2 | [Retro Hi-Fi](#2-retro-hi-fi) | Warm analog, audio gear | Warm-tinted | Medium |
| 3 | [Vaporwave / Synthwave](#3-vaporwave--synthwave-neon) | Neon, 80s, outrun | Heavy chromatic aberration | Medium |
| 4 | [Arctic Frost](#4-arctic-frost) | Frozen, crystalline | Heavy frosted | Medium |
| 5 | [Terminal](#5-terminal--monochrome) | Dev, monospace | None | Easy |
| 6 | [Wabi-Sabi](#6-wabi-sabi--japanese-minimal) | Zen, paper, nature | Rice-paper translucency | Medium |
| 7 | [Phoenix TV](#7-phoenix-tv--broadcast-studio) | Broadcast, on-air branding | CRT-style curvature | Medium |
| 8 | [Mission Control](#8-mission-control) | SpaceX, HUD, telemetry | HUD scan panels | Medium |
| 9 | [Library of Alexandria](#9-library-of-alexandria) | Dark academia, leather | Amber-tinted glass | Medium |
| 10 | [Brutalist Concrete](#10-brutalist-concrete) | Raw, heavy, Soviet | None | Easy |
| 11 | [Miami Vice](#11-miami-vice--1980s-pastel-deco) | 80s pastel, beach | Teal-tinted frosted | Medium |
| 12 | [Terra / Earthen](#12-terra--earthen) | Garden, clay, soil | Woven textile overlay | Medium |
| 13 | [Glitchcore / Datamosh](#13-glitchcore--datamosh) | Corruption, CRT breakup | Glitching/distorting | Hard |
| 14 | [Cyberpunk / Neo-Shinjuku](#14-cyberpunk--neo-shinjuku) | Blade Runner, rain | Full WebGL shader | Hard |

---

## 1. Theater Blackout

*Inspired by IMAX pre-roll, Dolby Cinema, prestige theater presentation.*

**Mood:** Utter darkness with accent lighting. Content is king — the UI disappears when you're watching.

### Design Details

| Element | Value |
|---|---|
| Background | Pure black `#000000` (true AMOLED black) |
| Secondary BG | `#0A0A0A` — barely-there for hover states |
| Accent | Copper/bronze `#B87333` or theater red `#8B0000` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `rgba(255,255,255,0.55)` |
| Card Background | Transparent — no card fills. Just 1px borders. |
| Card Border | `rgba(255,255,255,0.08)` → glows to `rgba(184,115,51,0.4)` on hover |
| Border Radius | `4px` — subtle, never round |
| Heading Font | `'Montserrat', sans-serif` — all-caps, tight tracking |
| Body Font | `'Inter', sans-serif` |
| Glass | Minimal — only on the playback bar. `backdrop-filter: blur(8px)` |

### Effects
- Hover glow on borders — the only "color" in the UI is the copper accent
- Section headers in all-caps with a thin underline accent bar
- Loading spinner is a subtle circular rim light

### CSS Tokens

```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #0A0A0A;
  --bg-tertiary: #111111;
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255,255,255,0.55);
  --text-muted: rgba(255,255,255,0.3);
  --accent-primary: #B87333;
  --accent-secondary: #8B0000;
  --accent-hover: #D4945A;
  --border-subtle: rgba(255,255,255,0.08);
  --border-hover: rgba(184,115,51,0.4);
  --card-radius: 4px;
  --card-bg: transparent;
  --card-shadow: none;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(255,255,255,0.04);
  --glass-blur: 8px;
  --glass-border: rgba(255,255,255,0.06);
  --transition-speed: 0.25s;
}
```

---

## 2. Retro Hi-Fi

*Inspired by high-end audio gear — McIntosh amplifiers, Bang & Olufsen, silver-faced receivers, cassette decks.*

**Mood:** Warm analog warmth. Your media library as a luxury component system.

### Design Details

| Element | Value |
|---|---|
| Background | Dark walnut `#2B1D0E` or charcoal felt `#1A1A1A` |
| Secondary BG | `#1E1E1E` with subtle warmth |
| Accent 1 | VFD teal `#00FFAA` — like a vacuum fluorescent display |
| Accent 2 | Peak-meter amber `#FFB000` |
| Accent 3 | McIntosh blue `#0033CC` |
| Text Primary | `#E8E0D8` — warm white |
| Text Secondary | `rgba(232,224,216,0.6)` |
| Card Background | `rgba(255,255,255,0.04)` |
| Border Radius | `8px` — soft, vintage rounded corners |
| Heading Font | `'Inter', sans-serif` + `'Roboto Slab', serif` for headings |
| Body Font | `'Inter', sans-serif` |
| Glass | Warm-tinted, like looking through a vintage CRT screen |

### Effects
- Animated VU-meter bars in corner decorations (pure CSS keyframes)
- Subtle warm gradient overlay on glass panes
- Progress bar styled like a peak meter (vertical bars that bounce)
- Knob-like circular buttons for play/skip
- Analog clock-style time display

### CSS Tokens

```css
:root {
  --bg-primary: #2B1D0E;
  --bg-secondary: #1A1A1A;
  --bg-tertiary: #3A2A18;
  --text-primary: #E8E0D8;
  --text-secondary: rgba(232,224,216,0.6);
  --text-muted: rgba(232,224,216,0.3);
  --accent-primary: #00FFAA;
  --accent-secondary: #FFB000;
  --accent-tertiary: #0033CC;
  --accent-hover: #33FFC0;
  --border-subtle: rgba(232,224,216,0.08);
  --card-radius: 8px;
  --card-bg: rgba(255,255,255,0.04);
  --card-shadow: 0 4px 20px rgba(0,0,0,0.5);
  --font-heading: 'Roboto Slab', serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(255,200,150,0.05);
  --glass-blur: 12px;
  --glass-border: rgba(255,200,150,0.08);
  --transition-speed: 0.3s;
}
```

---

## 3. Vaporwave / Synthwave Neon

*Inspired by riced Hyprland aesthetic meets Outrun, retrowave, 1980s neon dreams.*

**Mood:** Neon glow on deep purple. Pink sunsets, grid lines, and nostalgia for a future that never came.

### Design Details

| Element | Value |
|---|---|
| Background | Deep purple `#120A2E` |
| Secondary BG | `#1A1040` |
| Accent 1 | Cyan `#00FFFF` |
| Accent 2 | Hot pink `#FF00AA` |
| Accent 3 | Gold `#FFD700` |
| Text Primary | `#E0D0FF` — lavender-white |
| Text Secondary | `rgba(224,208,255,0.55)` |
| Border Radius | `12px` — pillowy, soft |
| Heading Font | `'Poppins', sans-serif` or `'League Spartan', sans-serif` |
| Body Font | `'Inter', sans-serif` |

### Effects
- **Heavy chromatic aberration** on all glass panes — the distortion *is* the theme
- Thin neon borders (drop-shadow colored with the accent)
- Subtle horizontal scanline overlay on backgrounds
- Slow gradient-shift background animation (purple → magenta)
- Pulsing glow on selected items
- 3D depth via colored drop shadows (hot pink and cyan offsets)

### CSS Tokens

```css
:root {
  --bg-primary: #120A2E;
  --bg-secondary: #1A1040;
  --bg-tertiary: #2A1850;
  --text-primary: #E0D0FF;
  --text-secondary: rgba(224,208,255,0.55);
  --text-muted: rgba(224,208,255,0.25);
  --accent-primary: #00FFFF;
  --accent-secondary: #FF00AA;
  --accent-tertiary: #FFD700;
  --accent-hover: #66FFFF;
  --border-subtle: rgba(0,255,255,0.15);
  --border-hover: rgba(255,0,170,0.4);
  --card-radius: 12px;
  --card-bg: rgba(255,255,255,0.04);
  --card-shadow: 0 0 20px rgba(255,0,170,0.2), 0 0 40px rgba(0,255,255,0.1);
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(0,255,255,0.04);
  --glass-blur: 16px;
  --glass-border: rgba(0,255,255,0.2);
  --transition-speed: 0.3s;
}
```

---

## 4. Arctic Frost

*Inspired by Scandinavian design, glacial ice, luxury cold-climate minimalism.*

**Mood:** Cold, crystalline, clean. Like a luxury ski lodge designed by Apple.

### Design Details

| Element | Value |
|---|---|
| Background (dark) | Deep frozen blue `#0A1628` |
| Background (light) | Near-white ice blue `#F0F5FF` |
| Secondary BG | `#0D1E38` |
| Accent 1 | Icy cyan `#88FFFF` |
| Accent 2 | Frost white `#E8F4FD` |
| Accent 3 | Silver `#C0C0C0` |
| Text Primary | `#E8F0FF` |
| Text Secondary | `rgba(232,240,255,0.55)` |
| Border Radius | `16px` — generous, pill-like |
| Heading Font | `'Inter', sans-serif` — thin weight (250) |
| Body Font | `'Inter', sans-serif` |

### Effects
- **Heavy frosted glass** — high blur, high saturate, crystalline feel
- Glass panes have sharp-angled corner decorations (like ice facets)
- Slow shimmer animation on glass borders (like light refracting through ice)
- Cards have a subtle gradient highlight on top edge
- Loading states use crystal shard particles

### CSS Tokens

```css
:root {
  --bg-primary: #0A1628;
  --bg-secondary: #0D1E38;
  --bg-tertiary: #11264A;
  --text-primary: #E8F0FF;
  --text-secondary: rgba(232,240,255,0.55);
  --text-muted: rgba(232,240,255,0.25);
  --accent-primary: #88FFFF;
  --accent-secondary: #E8F4FD;
  --accent-tertiary: #C0C0C0;
  --accent-hover: #AAFFFF;
  --border-subtle: rgba(136,255,255,0.1);
  --border-hover: rgba(136,255,255,0.3);
  --card-radius: 16px;
  --card-bg: rgba(255,255,255,0.03);
  --card-shadow: 0 8px 32px rgba(0,0,0,0.3);
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(136,255,255,0.04);
  --glass-blur: 24px;
  --glass-saturate: 1.6;
  --glass-border: rgba(255,255,255,0.08);
  --transition-speed: 0.3s;
}
```

---

## 5. Terminal / Monochrome

*Inspired by old-school terminals, green phosphor, amber monitors — for the developer who never left the CLI.*

**Mood:** Functional, technical, no-nonsense. The highest information density of any theme.

### Design Details

| Element | Value |
|---|---|
| Background | Terminal green `#0D1B0D` or amber `#1A0F00` |
| Secondary BG | Slightly lighter shade of same |
| Accent 1 | Phosphor green `#00FF41` |
| Accent 2 | Amber `#FFB000` (for amber variant) |
| Text Primary | `#00FF41` (green) or `#FFB000` (amber) |
| Text Secondary | `rgba(0,255,65,0.5)` |
| Card Background | `rgba(0,255,65,0.03)` |
| Border Radius | `0px` — everything is a sharp rectangle |
| Font | `'JetBrains Mono', 'Fira Code', monospace` — everything, including movie titles |

### Effects
- **No glass.** Flat and proud.
- 1px scan-line borders on cards
- True terminal cursor blink animation on focused elements
- ASCII art loading indicators
- Progress bars are `[======>    ]` style
- Movie titles in monospace feel like file paths

### CSS Tokens

```css
:root {
  --bg-primary: #0D1B0D;
  --bg-secondary: #112211;
  --bg-tertiary: #162916;
  --text-primary: #00FF41;
  --text-secondary: rgba(0,255,65,0.5);
  --text-muted: rgba(0,255,65,0.2);
  --accent-primary: #00FF41;
  --accent-secondary: #33FF77;
  --accent-hover: #66FF99;
  --border-subtle: rgba(0,255,65,0.2);
  --border-hover: rgba(0,255,65,0.5);
  --card-radius: 0px;
  --card-bg: rgba(0,255,65,0.03);
  --card-shadow: none;
  --font-heading: 'JetBrains Mono', monospace;
  --font-body: 'JetBrains Mono', monospace;
  --font-mono: 'JetBrains Mono', monospace;
  --transition-speed: 0s;
  --cursor-blink: 1s;
}
```

**Amber variant override:**

```css
[data-theme="terminal-amber"] {
  --bg-primary: #1A0F00;
  --bg-secondary: #221400;
  --bg-tertiary: #2A1A00;
  --text-primary: #FFB000;
  --text-secondary: rgba(255,176,0,0.5);
  --text-muted: rgba(255,176,0,0.2);
  --accent-primary: #FFB000;
  --accent-secondary: #FFCC44;
  --accent-hover: #FFDD66;
  --border-subtle: rgba(255,176,0,0.2);
  --border-hover: rgba(255,176,0,0.5);
  --card-bg: rgba(255,176,0,0.03);
}
```

---

## 6. Wabi-Sabi / Japanese Minimal

*Inspired by Muji architecture, sake bars, Zen gardens, sumi-e ink painting.*

**Mood:** Paper, ink, shadow, imperfection. Calm and meditative — your media disappears into the environment.

### Design Details

| Element | Value |
|---|---|
| Background (light) | Washi paper `#F5F0E8` |
| Background (dark) | Sumi ink `#1C1814` |
| Accent 1 | Vermillion `#D4320F` |
| Accent 2 | Wasabi `#7B8D3F` |
| Accent 3 | Oxidized copper `#5D6D7E` |
| Text Primary | `#2C241C` (light mode) / `#E8E0D0` (dark mode) |
| Card Background | Rice-paper texture (CSS noise) |
| Border Radius | `2px` — barely rounded, like brush strokes |
| Heading Font | `'EB Garamond', serif` or `'Noto Serif JP', serif` |
| Body Font | `'Inter', sans-serif` |

### Effects
- **No glass.** Use *shoji paper* translucency — thin, textured, warm
- Subtle paper texture via CSS noise gradient on backgrounds
- Asymmetrical layouts — not everything needs to align perfectly
- Borders that look like ink brush strokes (irregular opacity)
- Deep drop shadows (shadow is central to Japanese aesthetics)
- Empty space is intentional and emphasized

### CSS Tokens

```css
:root {
  --bg-primary: #1C1814;
  --bg-secondary: #252018;
  --bg-tertiary: #2E2820;
  --text-primary: #E8E0D0;
  --text-secondary: rgba(232,224,208,0.55);
  --text-muted: rgba(232,224,208,0.25);
  --accent-primary: #D4320F;
  --accent-secondary: #7B8D3F;
  --accent-tertiary: #5D6D7E;
  --accent-hover: #E85530;
  --border-subtle: rgba(232,224,208,0.1);
  --border-ink: rgba(212,50,15,0.4);
  --card-radius: 2px;
  --card-bg: rgba(232,224,208,0.03);
  --card-shadow: 0 8px 48px rgba(0,0,0,0.6);
  --font-heading: 'EB Garamond', serif;
  --font-body: 'Inter', sans-serif;
  --paper-texture: url("data:image/svg+xml,...");
  --transition-speed: 0.4s;
}
```

---

## 7. Phoenix TV / Broadcast Studio

*Inspired by live television broadcast, over-the-air analog warmth, network branding.*

**Mood:** You're live on air. Every selection is a network premiere. Co-brand the whole thing as "Phoenix TV."

### Design Details

| Element | Value |
|---|---|
| Background | Dark charcoal `#1A1A1A` |
| Secondary BG | `#222222` |
| Accent 1 | Broadcast yellow `#FFCC00` |
| Accent 2 | Broadcast red `#CC0000` |
| Accent 3 | Pure white `#FFFFFF` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `rgba(255,255,255,0.6)` |
| Border Radius | `0px` — squared corners like on-screen graphics |
| Heading Font | `'Helvetica Neue', 'Inter', sans-serif` — bold, broadcast weight |
| Body Font | `'Inter', sans-serif` |

### Effects
- **Thick, squared borders** on every panel — like broadcast lower-thirds
- TV static grain overlay (pure CSS noise)
- "Phoenix TV" watermark in the bottom-right corner
- Lower-third-style info cards on hover (channel-style metadata bars)
- Loading spinner = spinning broadcast countdown circle
- Section headers styled like channel idents

### CSS Tokens

```css
:root {
  --bg-primary: #1A1A1A;
  --bg-secondary: #222222;
  --bg-tertiary: #2A2A2A;
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255,255,255,0.6);
  --text-muted: rgba(255,255,255,0.3);
  --accent-primary: #FFCC00;
  --accent-secondary: #CC0000;
  --accent-tertiary: #FFFFFF;
  --accent-hover: #FFDD33;
  --border-subtle: rgba(255,255,255,0.15);
  --border-hover: rgba(255,204,0,0.5);
  --card-radius: 0px;
  --card-bg: rgba(255,255,255,0.03);
  --card-shadow: 0 2px 8px rgba(0,0,0,0.5);
  --font-heading: 'Helvetica Neue', sans-serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(255,255,255,0.04);
  --glass-blur: 8px;
  --glass-border: rgba(255,255,255,0.1);
  --transition-speed: 0.2s;
  --brand-watermark: 'PHOENIX TV';
}
```

---

## 8. Mission Control

*Inspired by SpaceX Dragon cockpit, NASA mission ops, sci-fi HUD displays.*

**Mood:** You're piloting the media. Every panel is an instrument reading. Your library is a launch manifest.

### Design Details

| Element | Value |
|---|---|
| Background | Matte black `#0B0B0D` |
| Secondary BG | `#121216` |
| Accent 1 | Alert orange `#FF5E00` |
| Accent 2 | Status green `#00FF88` |
| Accent 3 | Radar blue `#00BFFF` |
| Text Primary | `#E0E0E0` |
| Text Secondary | `rgba(224,224,224,0.5)` |
| Border Radius | `2px` — functional minimal rounding |
| Font | `'JetBrains Mono', 'Fira Code', monospace` — everything reads like telemetry |

### Effects
- **Flat HUD-style panels** — no glass, but thin animated scanlines that sweep every 10s
- Faint grid overlay on the background
- Loading screen = orbital trajectory animation
- Volume bar = throttle indicator (with "THR" label)
- Progress bar styled as a telemetry readout: `83.4% |||||||||||||-------`
- Movie/TV show metadata displayed as telemetry panels: `TITLE: Interstellar | RUNT: 02:49:00 | RATING: 8.7`
- The loading spinner is a radar sweep

### CSS Tokens

```css
:root {
  --bg-primary: #0B0B0D;
  --bg-secondary: #121216;
  --bg-tertiary: #1A1A22;
  --text-primary: #E0E0E0;
  --text-secondary: rgba(224,224,224,0.5);
  --text-muted: rgba(224,224,224,0.2);
  --accent-primary: #FF5E00;
  --accent-secondary: #00FF88;
  --accent-tertiary: #00BFFF;
  --accent-danger: #FF3333;
  --accent-hover: #FF7744;
  --border-subtle: rgba(255,94,0,0.15);
  --border-hover: rgba(0,255,136,0.4);
  --card-radius: 2px;
  --card-bg: rgba(255,255,255,0.02);
  --card-shadow: 0 0 4px rgba(0,255,136,0.1);
  --font-heading: 'JetBrains Mono', monospace;
  --font-body: 'JetBrains Mono', monospace;
  --font-mono: 'JetBrains Mono', monospace;
  --transition-speed: 0.15s;
  --grid-color: rgba(0,255,136,0.03);
}
```

---

## 9. Library of Alexandria

*Inspired by classic libraries, leather-bound books, dark academia, candlelit reading rooms.*

**Mood:** Tall shelves with rolling ladders, warm brass lamps, the smell of old paper.

### Design Details

| Element | Value |
|---|---|
| Background | Dark mahogany `#2C1810` |
| Secondary BG | `#1E0F08` |
| Accent 1 | Brass `#C5A55A` |
| Accent 2 | Emerald `#1B6B4A` |
| Accent 3 | Deep burgundy `#4A0E17` |
| Text Primary | `#E8DCC8` — parchment white |
| Text Secondary | `rgba(232,220,200,0.55)` |
| Border Radius | `4px` — classic framed corners |
| Heading Font | `'Crimson Text', 'EB Garamond', serif` |
| Body Font | `'Inter', sans-serif` |

### Effects
- Posters sit inside **illustrated carved frame** borders (CSS pseudo-elements)
- Warm amber-tinted glass — like looking through an old display case
- Subtle woodgrain texture on sidebars (CSS repeating gradients)
- Genre sections labeled "Wings" or "Sections"
- "Recently Added" → "New Acquisitions"
- Section headers like engraved brass plaques (gold text on dark background, serif)
- Progress bar = a decorative book ribbon bookmark

### CSS Tokens

```css
:root {
  --bg-primary: #2C1810;
  --bg-secondary: #1E0F08;
  --bg-tertiary: #3A2218;
  --text-primary: #E8DCC8;
  --text-secondary: rgba(232,220,200,0.55);
  --text-muted: rgba(232,220,200,0.25);
  --accent-primary: #C5A55A;
  --accent-secondary: #1B6B4A;
  --accent-tertiary: #4A0E17;
  --accent-hover: #D4BC78;
  --border-subtle: rgba(197,165,90,0.15);
  --border-hover: rgba(197,165,90,0.4);
  --card-radius: 4px;
  --card-bg: rgba(255,255,255,0.03);
  --card-shadow: 0 6px 32px rgba(0,0,0,0.6);
  --font-heading: 'Crimson Text', serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(197,165,90,0.04);
  --glass-blur: 12px;
  --glass-border: rgba(197,165,90,0.12);
  --transition-speed: 0.3s;
}
```

---

## 10. Brutalist Concrete

*Inspired by Soviet architecture, Le Corbusier, raw exposed materials, honest design.*

**Mood:** Heavy, monumental, unapologetic. No decoration, no gradients, no glass. Only structure.

### Design Details

| Element | Value |
|---|---|
| Background | Raw concrete `#3A3A3A` |
| Secondary BG | `#2E2E2E` |
| Accent 1 | Rust red `#8B4513` |
| Accent 2 | Faded warning yellow `#BFA36B` |
| Accent 3 | Oxidized copper `#4A7C59` |
| Text Primary | `#D0D0D0` |
| Text Secondary | `rgba(208,208,208,0.5)` |
| Border Radius | `0px` — no rounding. Ever. |
| Heading Font | `'Oswald', 'Bebas Neue', sans-serif` — heavy, all-caps, crushed tracking |
| Body Font | `'Inter', sans-serif` |

### Effects
- **No glass. No gradients. No shadows that aren't cast-concrete shadows.**
- Heavy, thick borders — like prefabricated concrete panels
- Subtle concrete texture via CSS noise
- Section dividers look like structural beams
- Progress bar is exposed rebar — rusted orange stripes
- Loading spinner = a heavy rotating cog or jackhammer bounce
- Cards have a "cast" heaviness — thick `box-shadow` like concrete depth

### CSS Tokens

```css
:root {
  --bg-primary: #3A3A3A;
  --bg-secondary: #2E2E2E;
  --bg-tertiary: #454545;
  --text-primary: #D0D0D0;
  --text-secondary: rgba(208,208,208,0.5);
  --text-muted: rgba(208,208,208,0.2);
  --accent-primary: #8B4513;
  --accent-secondary: #BFA36B;
  --accent-tertiary: #4A7C59;
  --accent-hover: #A55A2E;
  --border-subtle: rgba(208,208,208,0.15);
  --border-heavy: #5A5A5A;
  --card-radius: 0px;
  --card-bg: #3A3A3A;
  --card-shadow: 0 4px 0 #2A2A2A;
  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Inter', sans-serif;
  --transition-speed: 0.1s;
}
```

---

## 11. Miami Vice / 1980s Pastel Deco

*Inspired by 80s Miami, pink sunsets, white linen suits, pastel neon, art deco architecture.*

**Mood:** Heat. Pastels. Palm trees reflected in glass. Every movie feels like a summer night.

### Design Details

| Element | Value |
|---|---|
| Background | Sunset gradient `#FF6B9D` → `#C084FC` → `#38BDF8` |
| Secondary BG | `rgba(255,255,255,0.08)` |
| Accent 1 | Hot pink neon `#FF1493` |
| Accent 2 | Aquamarine `#00FFFF` |
| Accent 3 | Pure white `#FFFFFF` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `rgba(255,255,255,0.6)` |
| Border Radius | `20px` — very pillowy, deco curves |
| Heading Font | `'Pacifico', 'Great Vibes', cursive` for headings |
| Body Font | `'Inter', sans-serif` |

### Effects
- **Heavy teal-tinted glass with pink highlights** — like sunglasses at a beach bar
- Slow neon-pulse glow on hover states
- Every card casts a long beach-sunset shadow (low, stretched)
- Search bar is a white deco arch
- Progress bar = a neon tube (gradient with glow)
- Palm tree silhouette decorations (subtle, in bottom corners)

### CSS Tokens

```css
:root {
  --bg-primary: #0A0018;
  --bg-secondary: rgba(255,255,255,0.05);
  --bg-tertiary: rgba(255,255,255,0.08);
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255,255,255,0.6);
  --text-muted: rgba(255,255,255,0.25);
  --accent-primary: #FF1493;
  --accent-secondary: #00FFFF;
  --accent-tertiary: #FFFFFF;
  --accent-hover: #FF66B2;
  --border-subtle: rgba(255,255,255,0.1);
  --border-hover: rgba(255,20,147,0.4);
  --card-radius: 20px;
  --card-bg: rgba(255,255,255,0.06);
  --card-shadow: 0 20px 60px rgba(255,20,147,0.15), 0 -8px 0 rgba(0,255,255,0.1);
  --gradient-sunset: linear-gradient(135deg, #FF6B9D, #C084FC, #38BDF8);
  --font-heading: 'Pacifico', cursive;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(0,255,255,0.06);
  --glass-blur: 16px;
  --glass-border: rgba(255,20,147,0.15);
  --transition-speed: 0.3s;
}
```

---

## 12. Terra / Earthen

*Inspired by garden soil, terracotta pots, sun-baked clay, woven textiles, dried grasses.*

**Mood:** Grounded. Natural. Warm. Your media server as a cozy farmhouse hearth.

### Design Details

| Element | Value |
|---|---|
| Background | Warm terracotta `#CC5533` or dark earth `#3D2B1F` |
| Secondary BG | `#4A3828` |
| Accent 1 | Sage green `#8FA88F` |
| Accent 2 | Ochre `#CC7722` |
| Accent 3 | Clay `#B86F52` |
| Accent 4 | Dry grass `#D4B872` |
| Text Primary | `#E8DCC8` |
| Text Secondary | `rgba(232,220,200,0.55)` |
| Border Radius | `6px` — soft, handmade |
| Heading Font | `'Lora', 'Zilla Slab', serif` — warm, readable serifs |
| Body Font | `'Inter', sans-serif` |

### Effects
- **No glass.** Replace with woven textile textures (CSS repeating linear gradients that look like fabric weave)
- Parchment-style overlay on cards
- Progress bar = a vine growing animation (green stem that extends)
- Loading = seed germinating / sprout appearing
- Audio visualizer = wheat stalks swaying in wind
- Section headers like hand-painted signs

### CSS Tokens

```css
:root {
  --bg-primary: #3D2B1F;
  --bg-secondary: #4A3828;
  --bg-tertiary: #5A4530;
  --text-primary: #E8DCC8;
  --text-secondary: rgba(232,220,200,0.55);
  --text-muted: rgba(232,220,200,0.25);
  --accent-primary: #8FA88F;
  --accent-secondary: #CC7722;
  --accent-tertiary: #B86F52;
  --accent-quaternary: #D4B872;
  --accent-hover: #A8C4A8;
  --border-subtle: rgba(232,220,200,0.1);
  --border-hover: rgba(143,168,143,0.4);
  --card-radius: 6px;
  --card-bg: rgba(232,220,200,0.04);
  --card-shadow: 0 4px 24px rgba(0,0,0,0.5);
  --font-heading: 'Lora', serif;
  --font-body: 'Inter', sans-serif;
  --textile-weave: repeating-linear-gradient(
    90deg,
    transparent 0px,
    rgba(232,220,200,0.02) 1px,
    transparent 2px
  );
  --transition-speed: 0.35s;
}
```

---

## 13. Glitchcore / Datamosh

*Inspired by corrupted video files, analog TV breakup, VHS tracking errors, CRT artifacts.*

**Mood:** Deliberately broken. Nothing is stable. The UI itself is a glitching terminal of lost data.

### Design Details

| Element | Value |
|---|---|
| Background | Static gray `#1A1A1A` with very faint moving noise |
| Secondary BG | `#111111` |
| Accent 1 | CRT cyan `#00FFFF` |
| Accent 2 | Oversaturated magenta `#FF00FF` |
| Accent 3 | Static white `#FFFFFF` |
| Text Primary | `#E0E0E0` |
| Text Secondary | `rgba(224,224,224,0.5)` |
| Border Radius | Random — some cards offset by 1-2px on load |
| Font | `'Monoton', 'Rubik Glitch', sans-serif` — literal glitch fonts for headings, monospace for body |

### Effects
- **Elements randomly offset by 1-2px** — like the page just finished corrupting
- Horizontal line tearing across card edges (CSS pseudo-elements)
- The glass itself glitches — liquid glass with random frame skips, color channel delays, and horizontal shift bursts
- Every click triggers a brief 100ms static flash overlay
- Progress bar = VHS tracking bar style
- Randomly corrupted poster thumbnails (CSS `mix-blend-mode` channel offset on a few cards)
- Loading spinner is a rapidly scanning horizontal line like a CRT

### CSS Tokens

```css
:root {
  --bg-primary: #1A1A1A;
  --bg-secondary: #111111;
  --bg-tertiary: #222222;
  --text-primary: #E0E0E0;
  --text-secondary: rgba(224,224,224,0.5);
  --text-muted: rgba(224,224,224,0.2);
  --accent-primary: #00FFFF;
  --accent-secondary: #FF00FF;
  --accent-tertiary: #FFFFFF;
  --accent-hover: #66FFFF;
  --border-subtle: rgba(0,255,255,0.15);
  --border-hover: rgba(255,0,255,0.4);
  --card-radius: 0px;
  --card-bg: rgba(255,255,255,0.03);
  --card-shadow: none;
  --font-heading: 'Rubik Glitch', sans-serif;
  --font-body: 'JetBrains Mono', monospace;
  --glass-bg: rgba(0,255,255,0.05);
  --glass-blur: 8px;
  --glass-border: rgba(255,0,255,0.2);
  --transition-speed: 0.05s;
  --glitch-offset: 2px;
}
```

**Keyframe for the glitch animation:**

```css
@keyframes glitch {
  0% { transform: translate(0); }
  10% { transform: translate(-2px, 1px); }
  20% { transform: translate(2px, -1px); }
  22% { transform: translate(0); }
  100% { transform: translate(0); }
}

@keyframes static-flash {
  0%, 90%, 100% { opacity: 0; }
  95% { opacity: 0.15; }
}
```

---

## 14. Cyberpunk / Neo-Shinjuku

*Inspired by Blade Runner 2049, Ghost in the Shell, Akira, rain-soaked neon streets.*

**Mood:** Wet asphalt, holographic ads, perpetual night. The most visually rich and demanding theme.

### Design Details

| Element | Value |
|---|---|
| Background | Dark blue-black `#0A0B1A` |
| Secondary BG | `#111228` |
| Accent 1 | Magenta `#FF00FF` |
| Accent 2 | Cyan `#00FFFF` |
| Accent 3 | Hologram gold `#FFD700` |
| Text Primary | `#E0E0FF` |
| Text Secondary | `rgba(224,224,255,0.55)` |
| Border Radius | `4px` — tech-cold |
| Heading Font | `'Orbitron', 'Rajdhani', sans-serif` — futuristic, geometric |
| Body Font | `'Inter', sans-serif` |

### Effects
- **The holy grail of glass** — heavy chromatic aberration, rain streaks on the glass surface, true refractive distortion (WebGL shader on key panels)
- Holographic gradient-shifting borders that slowly cycle through the rainbow
- Glowing elements with `text-shadow` and `box-shadow` in accent colors
- Animated downward rain streaks on the background (very subtle CSS gradient animation)
- Neon glow on all interactive elements
- Time display = digital cyberdeck readout
- Volume = decibel counter with dB label
- Movie descriptions fade in like text appearing on a terminal

### CSS Tokens

```css
:root {
  --bg-primary: #0A0B1A;
  --bg-secondary: #111228;
  --bg-tertiary: #1A1C3A;
  --text-primary: #E0E0FF;
  --text-secondary: rgba(224,224,255,0.55);
  --text-muted: rgba(224,224,255,0.2);
  --accent-primary: #FF00FF;
  --accent-secondary: #00FFFF;
  --accent-tertiary: #FFD700;
  --accent-hover: #FF66FF;
  --border-subtle: rgba(0,255,255,0.12);
  --border-hover: rgba(255,0,255,0.4);
  --card-radius: 4px;
  --card-bg: rgba(255,255,255,0.02);
  --card-shadow: 0 0 20px rgba(255,0,255,0.1), 0 0 40px rgba(0,255,255,0.05);
  --font-heading: 'Orbitron', sans-serif;
  --font-body: 'Inter', sans-serif;
  --glass-bg: rgba(0,255,255,0.03);
  --glass-blur: 20px;
  --glass-saturate: 1.5;
  --glass-border: rgba(255,0,255,0.15);
  --neon-glow-magenta: 0 0 10px rgba(255,0,255,0.3);
  --neon-glow-cyan: 0 0 10px rgba(0,255,255,0.3);
  --transition-speed: 0.25s;
}
```

**Keyframe for the slow holographic border shift:**

```css
@keyframes hologram-shift {
  0% { border-color: #FF00FF; box-shadow: 0 0 15px rgba(255,0,255,0.2); }
  25% { border-color: #00FFFF; box-shadow: 0 0 15px rgba(0,255,255,0.2); }
  50% { border-color: #FFD700; box-shadow: 0 0 15px rgba(255,215,0,0.2); }
  75% { border-color: #FF00FF; box-shadow: 0 0 15px rgba(255,0,255,0.2); }
  100% { border-color: #FF00FF; box-shadow: 0 0 15px rgba(255,0,255,0.2); }
}
```

---

## Implementation Architecture

### File Structure

```
src/themes/
├── _tokens.css          # Shared CSS custom properties file
├── phoenix-tv.css       # Variable overrides + theme-specific extras
├── cyberpunk.css
├── theater-blackout.css
├── vaporwave.css
├── terminal.css
├── ...
└── theme-switcher.tsx   # React component for dynamic switching
```

### Theme Switcher Component

```tsx
const THEMES = [
  { id: 'theater',      name: 'Theater Blackout' },
  { id: 'retro-hifi',   name: 'Retro Hi-Fi' },
  { id: 'vaporwave',    name: 'Vaporwave Neon' },
  { id: 'arctic',       name: 'Arctic Frost' },
  { id: 'terminal',     name: 'Terminal' },
  { id: 'wabi-sabi',    name: 'Wabi-Sabi' },
  { id: 'phoenix-tv',   name: 'Phoenix TV' },
  { id: 'mission',      name: 'Mission Control' },
  { id: 'alexandria',   name: 'Library of Alexandria' },
  { id: 'brutalist',    name: 'Brutalist Concrete' },
  { id: 'miami',        name: 'Miami Vice' },
  { id: 'terra',        name: 'Terra' },
  { id: 'glitch',       name: 'Glitchcore' },
  { id: 'cyberpunk',    name: 'Cyberpunk' },
];

function ThemeSwitcher() {
  const [theme, setTheme] = useUserSetting('ui_theme', 'theater');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={e => setTheme(e.target.value)}
      className="theme-switcher"
    >
      {THEMES.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  );
}
```

### CSS Structure for Swapping

```css
/* _tokens.css — always loaded */
:root {
  /* ... default tokens (Theater Blackout) ... */
}

/* Each theme file just overrides variables */
@import url('themes/cyberpunk.css') (prefers-reduced-motion: no-preference);

/* Dynamic via data attribute */
[data-theme="cyberpunk"] {
  --bg-primary: #0A0B1A;
  /* ... overrides ... */
}
```

### What Each Theme Needs Beyond CSS Variables

| Theme | Extra CSS Needed (animations, pseudo-elements, keyframes) |
|---|---|
| Theater Blackout | None |
| Retro Hi-Fi | VU-meter keyframes, warm tint gradient |
| Vaporwave | Scanline overlay, glow keyframes, gradient-shift animation |
| Arctic Frost | Ice-crystal mask on glass corners |
| Terminal | Cursor blink keyframe, scanline overlay |
| Wabi-Sabi | Paper texture (CSS noise gradient), ink animation |
| Phoenix TV | TV static grain, broadcast lower-thirds styling |
| Mission Control | Grid overlay, scan-sweep animation |
| Library of Alexandria | Woodgrain texture, brass shimmer keyframes |
| Brutalist Concrete | Concrete texture via CSS noise |
| Miami Vice | Pastel gradient BG, long-shadow pseudo-elements, neon pulse |
| Terra | Woven textile repeating gradient, vine-progress keyframes, sprout animation |
| Glitchcore | Random offset keyframes, horizontal tear pseudo-elements, static burst |
| Cyberpunk | Rain animation, hologram border keyframes, neon glow |

### Limitations (What CSS Alone Can't Do)

1. **True liquid glass distortion** — noise-based displacement that actually warps content behind the element. Requires a WebGL shader or Canvas overlay. Only needed for Cyberpunk and Glitchcore themes.
2. **Real-time per-pixel effects** — glass that reacts to mouse position or video content behind it. JS required.
3. **Persistent theme preference** without JS — you need a small script to read `localStorage` and set `data-theme` before paint.

Everything else — frosted glass, blur, color tinting, border effects, subtle color fringing via layered pseudo-elements, scanlines, textures, animations — is **pure CSS**.

---

*Generated as a design reference for forking `jellyfin/jellyfin-web` and building a custom theme system.*