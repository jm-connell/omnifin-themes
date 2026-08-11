# Omnifin Themes

Custom themes for the [Jellyfin](https://jellyfin.org) web client. Each theme is a
single, self-contained CSS file that layers over the stock client, so you can turn
one on or off without touching your server files.

Verified against Jellyfin **10.11.11**, compatible back to 10.10 and forward to
12.x.

## Themes

| Theme | Description | Tuning | File |
|---|---|---|---|
| **Omnifin Dark** | Refined neutral dark. Near-black surfaces, soft elevation, rounded posters, configurable accent. | accent, corner radius, UI scale | [`themes/omnifin-dark.css`](themes/omnifin-dark.css) |
| **Omnifin Vaporwave** | Neon on deep purple. Drifting sunset gradient, CRT scanlines, perspective grid horizon, chromatic fringing on titles. | two neons, glow, scanlines, grid, drift speed | [`themes/omnifin-vaporwave.css`](themes/omnifin-vaporwave.css) |

More concepts are designed but not yet built; see
[`docs/THEME-BACKLOG.md`](docs/THEME-BACKLOG.md).

## Install

### Option 1: Skin Manager plugin

Best if you want a picker in the dashboard, per-user themes and a settings UI for
each theme's options.

1. **Dashboard > Plugins > Repositories > Add** and paste:
   ```
   https://raw.githubusercontent.com/Jellyfin-PG/Repository/refs/heads/main/manifest.json
   ```
2. Go to the **Catalogue** tab and install **File Transformation** first, then
   **Skin Manager**. Skin Manager will not work without File Transformation.
3. Restart Jellyfin.
4. Open **Dashboard > Skin Manager**, pick a theme, click **Save & Apply**, then
   hard-refresh your browser with `Ctrl+Shift+R`.

Skin Manager loads its catalogue from a curated community list. To get these
themes into that list, submit them using the Theme Submission issue template at
[Jellyfin-PG/Skin-Manager-Themes](https://github.com/Jellyfin-PG/Skin-Manager-Themes);
[`skins.json`](skins.json) in this repo is already in the required format. Until
then, or if you would rather not publish, use Option 2.

Requires Jellyfin 10.11 or newer.

### Option 2: Custom CSS import

Works on every Jellyfin version with no plugins. One line, and the theme updates
whenever this repo does.

**Dashboard > General > Custom CSS Code**, paste one of these, then Save and
refresh:

```css
@import url("https://cdn.jsdelivr.net/gh/jm-connell/omnifin-themes@main/themes/omnifin-dark.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/jm-connell/omnifin-themes@main/themes/omnifin-vaporwave.css");
```

`@import` must be the first thing in the box. Anything you add below it overrides
the theme, which is the intended way to customise:

```css
@import url("https://cdn.jsdelivr.net/gh/jm-connell/omnifin-themes@main/themes/omnifin-dark.css");

:root {
    --accent-color: #f2b01e;
    --corner-radius: 0px;
}
```

To switch themes, change the URL. To turn theming off, clear the box.

jsDelivr caches aggressively. Pin a tag (`@v1.0.0`) for stability, or use
`@main` and accept up to 24 hours of cache lag. `raw.githubusercontent.com` URLs
also work and are not cached, but are slower and less reliable.

### Option 3: Paste the file

If your server has no outbound internet access, or you want the theme frozen at a
known version, open the `.css` file, copy all of it, and paste it into **Dashboard
> General > Custom CSS Code**.

The `@import` line at the top of each theme pulls its fonts from Google Fonts. If
the browser cannot reach `fonts.googleapis.com` the theme still works, falling
back to the fonts already shipped with Jellyfin. Delete that line if you would
rather not make the request at all.

### Option 4: Self-host

Serve the file from any web server and import it:

```css
@import url("https://media.example.com/themes/omnifin-dark.css");
```

Requests must be same-origin or CORS-enabled, and must be HTTPS if Jellyfin is.

## Configuring

Every theme exposes its knobs as CSS custom properties. Under Skin Manager they
appear as a form on the theme card. Everywhere else, set them yourself in Custom
CSS below the `@import`.

**Omnifin Dark**

| Property | Default | What it does |
|---|---|---|
| `--accent-color` | `#00a4dc` | Buttons, focus rings, progress bars, selected library |
| `--corner-radius` | `0.5em` | Rounding on posters, cards, buttons, dialogs. `0px` for square |
| `--ui-scale` | `1` | Scales the whole interface. `1.15` larger, `0.9` denser |

**Omnifin Vaporwave**

| Property | Default | What it does |
|---|---|---|
| `--accent-color` | `#00ffff` | The cyan half of the palette |
| `--accent-secondary` | `#ff00aa` | The hot pink half |
| `--glow-strength` | `1` | Every neon glow and chromatic fringe. `0` off, `2` loud |
| `--scanline-opacity` | `0.05` | CRT scanline overlay. `0` disables |
| `--grid-opacity` | `0.14` | Perspective grid horizon. `0` disables |
| `--background-animation-speed` | `24` | Seconds per background gradient sweep. Higher is slower and cheaper |

On low-powered hardware, set `--scanline-opacity`, `--grid-opacity` and
`--glow-strength` to `0`.

## Notes

**Themes are client-side.** They restyle the web client, which also covers the
Android and iOS apps' web views and most TV clients. Native apps that do not
render the web UI are unaffected.

**Custom CSS is server-wide.** Every user on the server sees it. Skin Manager is
the only way to give different users different themes.

**Reduced motion is respected.** Both themes drop their animations under
`prefers-reduced-motion: reduce`.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Nothing changed | Hard-refresh with `Ctrl+Shift+R`. Browsers cache Jellyfin's CSS aggressively. |
| Some elements are still Jellyfin blue | An `!important` rule in the stock theme is winning. Open an issue with a screenshot; see [`docs/SELECTORS.md`](docs/SELECTORS.md#specificity-and-important). |
| Fonts look wrong | `fonts.googleapis.com` is unreachable. Harmless; the theme falls back to Jellyfin's bundled fonts. |
| Sluggish on a TV or Pi | Set the effect intensities to `0`, as above. |
| Broken after a Jellyfin upgrade | Jellyfin renamed a class. Open an issue with your version. |
| `@import` ignored | It must be the first rule in the Custom CSS box, above everything else. |

## Development

```bash
npm install
npm run reference:sync   # clone jellyfin-web for selector verification
npm run check            # lint, validate skins.json, verify every selector exists
```

| Document | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Repository rules and conventions |
| [`docs/SELECTORS.md`](docs/SELECTORS.md) | Verified Jellyfin selector reference |
| [`docs/AUTHORING.md`](docs/AUTHORING.md) | How to add or edit a theme |
| [`docs/THEME-BACKLOG.md`](docs/THEME-BACKLOG.md) | Designed but unbuilt themes |

## License

MIT. See [LICENSE](LICENSE).

Not affiliated with the Jellyfin project.
