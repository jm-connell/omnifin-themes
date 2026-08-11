# Jellyfin selector reference

Every selector in this document was verified against a real checkout of the
official web client. Do not add a selector here without verifying it the same
way.

| | |
|---|---|
| Primary target | `v10.11.11` (current stable) |
| Secondary target | `master` @ `12.0.0` (next major) |
| Verified on | 2026-08-11 |
| Reference checkouts | `.reference/jellyfin-web-stable`, `.reference/jellyfin-web` (`npm run reference:sync`) |

Two facts shape everything else:

1. **Jellyfin class names are global and unhashed.** The client compiles SCSS
   with plain `css-loader`; there are no CSS Modules and no hashed class names.
   Anything you see in `src/**/*.scss` is a real selector you can target.
2. **Jellyfin 10.11 hardcodes its colours.** There are no `--theme-*` custom
   properties to override. The only `--`-prefixed names in the 10.11 stylesheet
   are the unrelated `headroom--pinned` / `headroom--unpinned` class names. To
   recolour anything you must re-declare the actual rule. Jellyfin 12 changes
   this; see [Version differences](#version-differences).

## Contents

- [How stock theming works](#how-stock-theming-works)
- [Specificity and `!important`](#specificity-and-important)
- [Root and layout](#root-and-layout)
- [Header and tabs](#header-and-tabs)
- [Navigation drawer](#navigation-drawer)
- [Cards and library grid](#cards-and-library-grid)
- [Indicators and progress](#indicators-and-progress)
- [Buttons](#buttons)
- [Form controls](#form-controls)
- [Detail pages](#detail-pages)
- [Lists, dialogs, sheets, toasts](#lists-dialogs-sheets-toasts)
- [Player and now playing bar](#player-and-now-playing-bar)
- [Live TV guide](#live-tv-guide)
- [Login, search, dashboard, readers](#login-search-dashboard-readers)
- [Scrollbars](#scrollbars)
- [Version differences](#version-differences)
- [Traps](#traps)

## How stock theming works

`src/themes/dark/theme.scss` is the entire dark colour scheme, 525 lines of flat
colour declarations. A theme is, mechanically, a file that re-declares those same
selectors. Reading that file end to end is the fastest way to find everything a
theme must cover.

The rules that carry the most visual weight:

```css
/* src/themes/dark/theme.scss */
.skinHeader,
html {
    color: rgba(255, 255, 255, 0.8);
}

.backgroundContainer,
.dialog,
.nowPlayingPlaylist,
.nowPlayingContextMenu,
html {
    background-color: #101010;
}

.backgroundContainer.withBackdrop {
    background-color: rgba(0, 0, 0, 0.86);
}

.skinHeader-withBackground {
    background-color: #202020;
}

.skinHeader.semiTransparent {
    backdrop-filter: none !important;
    background-color: rgba(0, 0, 0, 0.4);
}
```

`#00a4dc` is the Jellyfin accent and appears about 30 times in that one file. A
grep for it lists nearly every surface a theme needs to recolour:

```bash
rg -n '#00a4dc' .reference/jellyfin-web-stable/src/themes/dark/theme.scss
```

Note that the page background lives on `html` and `.backgroundContainer`, never
on `body`:

```css
/* src/styles/site.scss */
body {
    background-color: transparent !important;
}
```

Skin Manager injects theme CSS *after* the stock stylesheet, so a rule with equal
specificity wins. You only need `!important` where stock already uses it.

## Specificity and `!important`

These stock rules use `!important` and cannot be overridden without matching it.
Each was confirmed by grep in the 10.11.11 tree.

| Rule | File |
|---|---|
| `.skinHeader.semiTransparent { backdrop-filter: none !important }` | `themes/dark/theme.scss` |
| `.navMenuOption-selected { background: #00a4dc !important }` | `themes/dark/theme.scss` |
| `.card:focus .cardBox.visualCardBox { border-color: #00a4dc !important }` | `themes/dark/theme.scss` |
| `.emby-select-withcolor:focus { border-color: #00a4dc !important }` | `themes/dark/theme.scss` |
| `.emby-select-tv-withcolor:focus { background-color/color ... !important }` | `themes/dark/theme.scss` |
| `.alphaPickerButton-tv:focus { color: #fff !important }` | `themes/dark/theme.scss` |
| `.listItem-border { border-color: ... !important }` | `themes/dark/theme.scss` |
| `.buttonActive { color: #00a4dc !important }` | `themes/dark/theme.scss` |
| `.programCell-sports/-movie/-kids/-news/-active { background: ... !important }` | `themes/dark/theme.scss` |
| `.guide-channelHeaderCell:focus`, `.programCell:focus` | `themes/dark/theme.scss` |
| `body { background-color: transparent !important }` | `styles/site.scss` |
| `.selectedMediaFolder { background-color: #f2f2f2 !important }` | `styles/librarybrowser.scss` |
| `.navMenuOption { display/padding/margin/border-radius ... !important }` | `styles/librarybrowser.scss` |
| `.cardBox { padding: 0 !important; outline: none !important }` | `components/cardbuilder/card.scss` |
| `.cardBox-bottompadded { margin-bottom: 1.8em !important }` | `components/cardbuilder/card.scss` |
| `.card:focus { position/z-index/font-weight ... !important }` | `components/cardbuilder/card.scss` |
| `.itemBackdropProgressBar { position: absolute !important }` | `styles/librarybrowser.scss` |
| `.mainAnimatedPage { contain: style size !important }` | `styles/site.scss` |
| `.bodyWithPopupOpen { overflow-y: hidden !important }` | `styles/site.scss` |
| `.hide { display: none !important }` | `index.html` (inline) |

## Root and layout

| Selector | What it is | Source |
|---|---|---|
| `html` | Page background, base colour, `font-size: 93%`, font family | `styles/site.scss`, `styles/fonts.scss`, `themes/dark/theme.scss` |
| `html[lang\|="ja"]` etc. | Per-language font stacks at specificity `(0,1,1)` | `styles/fonts.noto.scss` |
| `body` | Forced transparent; do not put a background here | `styles/site.scss` |
| `.layout-desktop` / `.layout-mobile` / `.layout-tv` | Layout mode, set on `<html>` | `components/layoutManager.js` |
| `.backgroundContainer` | Fixed full-viewport background layer, `contain: strict` | `styles/site.scss` |
| `.backgroundContainer.withBackdrop` | Dimming scrim shown over library artwork | `themes/dark/theme.scss` |
| `.backdropContainer` | Holds the backdrop image, sits below `.backgroundContainer` | `components/backdrop/backdrop.scss` |
| `.backdropImage` | The artwork itself; `background-image` is set inline by JS | `components/backdrop/backdrop.scss` |
| `.mainAnimatedPage` | Per-route page wrapper | `styles/site.scss` |
| `div[data-role="page"]` | Every view page | `styles/site.scss` |
| `.libraryPage`, `.itemDetailPage` | Page-type hooks | `styles/librarybrowser.scss` |
| `.hide` | Universal hide, `display: none !important` | `index.html` |
| `.hide-scroll` | Added to `<body>` during video playback | `styles/site.scss`, `plugins/htmlVideoPlayer/plugin.js` |
| `.bodyWithPopupOpen` | Added to `<body>` while a modal is open | `styles/site.scss` |
| `.focusable`, `.show-focus` | TV focus system; `.show-focus` gates all focus styling | `components/focusManager.js` |
| `.clipForScreenReader` | Visually hidden text | `styles/site.scss` |

UI scale lives in three rules, all in `styles/fonts.scss`. The whole interface is
sized in `em`, so these are the only knobs that matter:

```css
html { font-size: 93%; }
.layout-tv { font-size: 125%; }   /* 20px floor required by WebOS and Tizen */
.layout-mobile { font-size: 90%; }
```

## Header and tabs

| Selector | What it is | Source |
|---|---|---|
| `.skinHeader` | Fixed top bar, `z-index: 999`, `contain: layout style paint` | `styles/librarybrowser.scss` |
| `.skinHeader-withBackground` | Opaque header, used once scrolled or on solid pages | `themes/dark/theme.scss` |
| `.skinHeader.semiTransparent` | Transparent header over backdrops | `themes/dark/theme.scss` |
| `.layout-tv .skinHeader` | `position: relative` on TV, not fixed | `styles/librarybrowser.scss` |
| `.hiddenViewMenuBar .skinHeader` | Header hidden entirely | `styles/librarybrowser.scss` |
| `.osdHeader`, `.osdHeader-hidden` | Header while the video player is open | `styles/videoosd.scss` |
| `.headerTop` | Inner padding row | `styles/librarybrowser.scss` |
| `.headerLeft`, `.headerRight` | Flex groups either side | `styles/librarybrowser.scss` |
| `.headerButton`, `.headerBackButton`, `.headerCastButton`, `.headerSyncButton` | Header icon buttons | `styles/librarybrowser.scss`, `styles/videoosd.scss` |
| `.headerTabs`, `.sectionTabs` | Tab strips | `styles/librarybrowser.scss` |
| `.pageTitle`, `.pageTitleWithLogo`, `.pageTitleWithDefaultLogo` | Title area; the default variant is a background image | `styles/site.scss`, `styles/librarybrowser.scss`, `themes/dark/theme.scss` |
| `.emby-tab-button`, `.emby-tab-button-active` | Tab items | `themes/dark/theme.scss` |
| `.emby-tab-button.show-focus:focus`, `:hover` | Tab states | `themes/dark/theme.scss` |

## Navigation drawer

| Selector | What it is | Source |
|---|---|---|
| `.mainDrawer`, `.drawer-open` | Sidebar surface | `themes/dark/theme.scss` |
| `.mainDrawer-scrollContainer` | Scrolling inner container | `styles/librarybrowser.scss` |
| `.navMenuOption` | A drawer row; heavily `!important` in stock | `styles/librarybrowser.scss` |
| `.navMenuOption:hover` | Hover state | `themes/dark/theme.scss` |
| `.navMenuOption-selected` | Active row, `!important` background | `themes/dark/theme.scss` |
| `.navMenuOptionIcon`, `.navMenuOptionText` | Row icon and label | `styles/librarybrowser.scss` |
| `.selectedMediaFolder` | Active library, `!important` light background | `styles/librarybrowser.scss` |
| `.sidebarHeader` | Section label inside the drawer | `styles/librarybrowser.scss` |

## Cards and library grid

| Selector | What it is | Source |
|---|---|---|
| `.card` | Outer card element | `components/cardbuilder/card.scss` |
| `.cardBox` | Inner box; `transition: none`, this is what scales on focus | `components/cardbuilder/card.scss` |
| `.cardBox.visualCardBox` | Card variant with a filled background | `components/cardbuilder/card.scss` |
| `.cardScalable` | Wrapper that carries the focus border on non-visual cards | `components/cardbuilder/card.scss` |
| `.cardPadder`, `.cardPadder-portrait\|-backdrop\|-square\|-banner` | Aspect-ratio spacers | `components/cardbuilder/card.scss` |
| `.cardImageContainer` | Poster surface, `border-radius: 0.2em`, `background-clip: content-box !important` | `components/cardbuilder/card.scss` |
| `.cardImage`, `.cardContent` | Image and absolutely positioned content layer | `components/cardbuilder/card.scss` |
| `.cardOverlayContainer` | Hover overlay holding play/more buttons | `components/cardbuilder/card.scss` |
| `.cardText`, `.cardText-secondary`, `.cardTextCentered`, `.cardText-first` | Card labels | `components/cardbuilder/card.scss`, `themes/dark/theme.scss` |
| `.cardFooter`, `.innerCardFooter`, `.fullInnerCardFooter` | Footer bands | `components/cardbuilder/card.scss` |
| `.textCardImageContainer`, `.chapterCardImageContainer` | Text-only and chapter tiles, hardcoded `#333` / `#000` | `components/cardbuilder/card.scss` |
| `.defaultCardBackground1` … `5` | Placeholder tints for items with no artwork | `themes/dark/theme.scss` |
| `.blurhash-canvas` | Blurhash placeholder canvas | `components/cardbuilder/card.scss` |
| `.card:focus .cardBox.visualCardBox`, `.card:focus .cardBox:not(.visualCardBox) .cardScalable` | Focus ring, `!important` | `themes/dark/theme.scss` |
| `.card.show-animation:focus > .cardBox` | Focus scale, `transform: scale(1.07)`, specificity `(0,4,0)` | `components/cardbuilder/card.scss` |
| `.itemsContainer`, `.vertical-wrap`, `.vertical-list` | Grid and list containers | `components/cardbuilder/card.scss` |
| `.sectionTitle`, `.sectionTitleContainer` | Row headings | `styles/librarybrowser.scss` |
| `.emby-scroller`, `.emby-scrollbuttons` | Horizontal row scroller and its arrows | `elements/emby-scroller/emby-scroller.scss`, `elements/emby-scrollbuttons/emby-scrollbuttons.scss` |
| `.itemSelectionPanel`, `.selectionCommandsPanel` | Multi-select mode | `themes/dark/theme.scss` |

## Indicators and progress

| Selector | What it is | Source |
|---|---|---|
| `.itemProgressBar` | Resume bar track | `components/indicators/indicators.scss` |
| `.itemProgressBarForeground` | Resume bar fill | `themes/dark/theme.scss` |
| `.itemProgressBarForeground-recording` | Recording variant, red | `themes/dark/theme.scss` |
| `.indicator`, `.indicatorIcon` | Base corner badge | `components/indicators/indicators.scss` |
| `.countIndicator`, `.playedIndicator`, `.mediaSourceIndicator`, `.fullSyncIndicator` | Unplayed count, watched tick, source and sync badges | `themes/dark/theme.scss` |
| `.timerIndicator`, `.timerIndicator-inactive`, `.videoIndicator`, `.syncIndicator`, `.missingIndicator`, `.unairedIndicator` | Live TV and availability badges | `components/indicators/indicators.scss` |
| `.ratingbutton-icon-withrating`, `.playstatebutton-icon-played`, `.downloadbutton-icon-on` | User-data button states | `themes/dark/theme.scss` |

## Buttons

| Selector | What it is | Source |
|---|---|---|
| `.emby-button` | Base button | `elements/emby-button/emby-button.scss` |
| `.emby-button.show-focus:focus` | Focused button, accent filled | `themes/dark/theme.scss` |
| `.raised`, `.fab` | Elevated and floating action buttons | `themes/dark/theme.scss` |
| `.button-submit`, `.button-delete` | Primary and destructive | `themes/dark/theme.scss` |
| `.button-flat`, `.button-link` | Text buttons | `themes/dark/theme.scss` |
| `.emby-button.block` | Full-width button | `elements/emby-button/emby-button.scss` |
| `.paper-icon-button-light` | Icon-only button, the most common control in the UI | `elements/emby-button/emby-button.scss`, `themes/dark/theme.scss` |
| `.emby-button.detailFloatingButton` | Floating play button on detail pages | `themes/dark/theme.scss` |
| `.buttonActive` | Toggled-on state, `!important` | `themes/dark/theme.scss` |
| `.progressring-spiner` | Loading ring (spelling is stock) | `themes/dark/theme.scss` |

Icon-button hover is scoped by stock to pointer devices, and you should keep that
scoping so touch devices do not get stuck in a hover state:

```css
@media (hover: hover) and (pointer: fine) {
    .paper-icon-button-light:hover:not(:disabled) { /* ... */ }
}
```

## Form controls

| Selector | What it is | Source |
|---|---|---|
| `.emby-input`, `.emby-textarea` | Text fields, `border: 0.16em solid` in stock | `themes/dark/theme.scss` |
| `.emby-select-withcolor`, `> option` | Select control and its options | `themes/dark/theme.scss` |
| `.emby-select-withcolor:focus` | Focus border, `!important` | `themes/dark/theme.scss` |
| `.emby-select-tv-withcolor:focus` | TV select focus, `!important` | `themes/dark/theme.scss` |
| `.emby-checkbox`, `.checkboxOutline` | Checkbox and its drawn box | `themes/dark/theme.scss` |
| `.inputLabel`, `.inputLabelUnfocused`, `.inputLabelFocused` | Field labels | `themes/dark/theme.scss` |
| `.selectLabelFocused`, `.textareaLabelFocused` | Focused labels | `themes/dark/theme.scss` |
| `.checkboxListLabel`, `.paperListLabel`, `.fieldDescription` | Secondary form text | `themes/dark/theme.scss` |
| `.emby-collapsible-button` | Collapsible section header | `themes/dark/theme.scss` |
| `.mdl-slider` | All sliders (volume, seek, settings) | `elements/emby-slider/emby-slider.scss` |
| `.mdl-slider-background-lower`, `.mdl-slider-background-upper` | Filled and unfilled slider track | `elements/emby-slider/emby-slider.scss` |
| `.alphaPickerButton`, `-selected`, `-tv:focus` | A-Z jump list | `themes/dark/theme.scss` |

## Detail pages

| Selector | What it is | Source |
|---|---|---|
| `.itemDetailPage` | Page root | `styles/librarybrowser.scss` |
| `.itemBackdrop`, `#itemBackdrop` | Hero artwork, 40vh, `background-attachment: fixed`, hidden on `.layout-tv` | `styles/librarybrowser.scss` |
| `.itemBackdropProgressBar` | Resume bar over the hero, `position: absolute !important` | `styles/librarybrowser.scss` |
| `.detailRibbon` | Translucent band behind the title block | `themes/dark/theme.scss` |
| `.detailPagePrimaryContainer`, `.detailPageSecondaryContainer` | Upper and lower halves | `styles/librarybrowser.scss` |
| `.detailPagePrimaryContent`, `.detailPageContent` | Content columns (`.detailPageContent` exists in 10.11, removed in 12) | `styles/librarybrowser.scss` |
| `.noBackdropTransparency ...` | Solid variant when backdrops are off | `themes/dark/theme.scss` |
| `.detailImageContainer`, `.detailLogo`, `.itemDetailImage` | Poster and logo | `styles/librarybrowser.scss` |
| `.itemName`, `.originalTitle`, `.parentNameLast` | Title lines | `styles/librarybrowser.scss` |
| `.itemMiscInfo`, `.mediaInfoItem`, `.mediaInfoText` | Year / rating / runtime chips | `styles/librarybrowser.scss`, `components/mediainfo/mediainfo.scss`, `themes/dark/theme.scss` |
| `.mainDetailButtons`, `.detailButton`, `.detailButton-content\|-icon\|-text` | Action row | `styles/librarybrowser.scss` |
| `.trackSelections`, `.detailSectionContent`, `.detailVerticalSection` | Track pickers and content sections | `styles/librarybrowser.scss` |
| `.detailTableBodyRow-shaded:nth-child(even)` | Zebra striping in episode tables | `themes/dark/theme.scss` |
| `.itemOverview`, `.itemTag`, `.itemLinks` | Synopsis, tags, external links | `styles/librarybrowser.scss` |

## Lists, dialogs, sheets, toasts

| Selector | What it is | Source |
|---|---|---|
| `.listItem`, `:hover`, `:focus` | List rows | `components/listview/listview.scss`, `themes/dark/theme.scss` |
| `.listItem-border` | Row separator, `!important` | `themes/dark/theme.scss` |
| `.listItemBody`, `.listItemIcon`, `.listItemImage`, `.listItemAside` | Row parts | `components/listview/listview.scss` |
| `.listItem .secondary` | Secondary row text | `themes/dark/theme.scss` |
| `.paperList` | List surface | `themes/dark/theme.scss` |
| `.dialog` | Modal surface, shares the page background colour | `themes/dark/theme.scss` |
| `.dialogContainer` | Modal wrapper, `z-index: 999999 !important` | `components/dialogHelper/dialoghelper.scss` |
| `.formDialogHeader:not(.formDialogHeader-clear)`, `.formDialogFooter:not(.formDialogFooter-clear)` | Dialog chrome | `themes/dark/theme.scss` |
| `.formDialogContent`, `.formDialogFooterItem` | Dialog body and footer buttons | `components/formdialog.scss` |
| `.actionSheet`, `.actionSheetContent`, `.actionSheetMenuItem`, `.actionSheetTitle` | Context menus | `components/actionSheet/actionSheet.scss` |
| `.actionsheetDivider` | Menu separator | `themes/dark/theme.scss` |
| `.toastContainer`, `.toast`, `.toastVisible`, `.toastHide` | Notifications | `components/toast/toast.scss`, `themes/dark/theme.scss` |
| `.infoBanner` | Inline info callout | `themes/dark/theme.scss` |
| `.collapseContent`, `.visualCardBox` | Panel surfaces sharing the dialog colour | `themes/dark/theme.scss` |

## Player and now playing bar

| Selector | What it is | Source |
|---|---|---|
| `.videoOsdBottom`, `.videoOsdBottom-hidden` | Bottom OSD panel | `styles/videoosd.scss` |
| `.osdControls`, `.videoOsdBottom .buttons` | Transport controls | `styles/videoosd.scss` |
| `.osdTextContainer`, `.osdMainTextContainer`, `.osdTitle`, `.osdTitleSmall` | Title block | `styles/videoosd.scss` |
| `.osdMediaInfo`, `.osdSecondaryMediaInfo`, `.osdTimeText`, `.osdMediaStatus` | Metadata and timecode | `styles/videoosd.scss` |
| `.osdVolumeSliderContainer`, `.volumeButtons` | Volume cluster | `styles/videoosd.scss` |
| `.chapterThumb`, `.chapterThumbContainer`, `.chapterThumbText` | Seek-bar chapter preview | `styles/videoosd.scss` |
| `.videoPlayerContainer`, `.videoPlayerContainer-onTop` | Player surface | `plugins/htmlVideoPlayer/style.scss` |
| `.upNextDialog-countdownText`, `.upNextDialog-title`, `.upNextDialog-button` | Up-next prompt | `components/upnextdialog/upnextdialog.scss`, `themes/dark/theme.scss` |
| `.appfooter` | Bar hosting the now playing strip | `components/appFooter/appFooter.scss`, `themes/dark/theme.scss` |
| `.nowPlayingBar`, `-hidden`, `.nowPlayingBarTop` | Audio bar | `components/nowPlayingBar/nowPlayingBar.scss` |
| `.nowPlayingBarText`, `.nowPlayingBarSecondaryText`, `.nowPlayingBarCenter`, `.nowPlayingBarRight` | Bar contents | `components/nowPlayingBar/nowPlayingBar.scss` |
| `.nowPlayingBarPositionContainer`, `.nowPlayingBarPositionSlider` | Seek bar | `components/nowPlayingBar/nowPlayingBar.scss` |
| `.nowPlayingPlaylist`, `.nowPlayingContextMenu`, `.playlistSectionButton` | Queue surfaces | `themes/dark/theme.scss` |

## Live TV guide

| Selector | What it is | Source |
|---|---|---|
| `.programCell`, `.channelPrograms`, `.guide-channelHeaderCell` | Grid cells and borders | `themes/dark/theme.scss` |
| `.programCell-sports\|-movie\|-kids\|-news\|-active` | Genre tinting, all `!important` | `themes/dark/theme.scss` |
| `.guide-channelHeaderCell:focus`, `.programCell:focus` | Focus state, `!important` | `themes/dark/theme.scss` |
| `.guide-programTextIcon`, `.guide-headerTimeslots`, `.guide-programNameCaret` | Guide chrome | `themes/dark/theme.scss` |
| `.guide-date-tab-button`, `.emby-tab-button-active` variant | Date tabs | `themes/dark/theme.scss` |

## Login, search, dashboard, readers

| Selector | What it is | Source |
|---|---|---|
| `#loginPage` | Login page, also carries `.page .standalonePage .backdropPage` | `controllers/session/login/index.html` |
| `.manualLoginForm`, `.visualLoginForm` | Username/password form and the user-tile picker | `controllers/session/login/index.html` |
| `.loginDisclaimer`, `.loginDisclaimerContainer` | Custom login message | `controllers/session/login/index.html` |
| `.searchFieldsInner`, `.searchfields-icon` | Search input row | `apps/stable/features/search/components/searchfields.scss` |
| `.type-interior` | Admin dashboard pages | `styles/dashboard.scss` |
| `.dashboardSections`, `.dashboardColumn`, `.dashboardFooter` | Dashboard layout | `styles/dashboard.scss` |
| `.wizardPage`, `.wizardStartForm` | First-run wizard | `styles/dashboard.scss`, `themes/dark/theme.scss` |
| `#bookPlayer`, `#comicsPlayer`, `#pdfPlayer`, `#dialogToc` | Reader surfaces | `themes/dark/theme.scss` |
| `.metadataSidebarIcon` | Metadata editor icon | `themes/dark/theme.scss` |

## Scrollbars

Stock styles both the standards track and the WebKit pseudo-elements:

```css
/* src/themes/dark/theme.scss */
* {
    scrollbar-width: thin;
    scrollbar-color: #3b3b3b #202020;
}

::-webkit-scrollbar-track { box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); }
::-webkit-scrollbar-track-piece { background-color: #3b3b3b; }
::-webkit-scrollbar-thumb:horizontal,
::-webkit-scrollbar-thumb:vertical { border-radius: 2px; background: center no-repeat #888; }

.layout-desktop ::-webkit-scrollbar,
.layout-tv ::-webkit-scrollbar { width: 0.4em; height: 0.4em; }
```

The `* { scrollbar-color }` rule wins over anything scoped narrower, so restyle
it at the same `*` selector rather than trying to target individual scrollers.

## Version differences

### 10.11 (primary target)

No theme custom properties. Everything is a literal colour in
`src/themes/<name>/theme.scss`.

### 12.0 (`master`)

Theming moved to MUI. `<html>` gains `data-theme="dark"` (set in
`src/scripts/themeManager.js`) and the SCSS reads custom properties with
hardcoded fallbacks, e.g. `var(--jf-palette-primary-main, #00a4dc)`. The full set
of variables referenced by the stylesheet:

```
--jf-card-borderRadius
--jf-palette-action-focus            --jf-palette-action-hover
--jf-palette-action-selectedOpacity  --jf-palette-Alert-infoFilledBg
--jf-palette-Alert-infoFilledColor   --jf-palette-AppBar-defaultBg
--jf-palette-AppBar-gradient         --jf-palette-AppBar-transparentBg
--jf-palette-background-default      --jf-palette-background-defaultImage
--jf-palette-background-paper        --jf-palette-background-paperChannel
--jf-palette-Button-inheritContainedBg
--jf-palette-Button-inheritContainedHoverBg
--jf-palette-common-white            --jf-palette-divider
--jf-palette-error-contrastText      --jf-palette-error-light
--jf-palette-error-main              --jf-palette-FilledInput-bg
--jf-palette-FilledInput-borderColor --jf-palette-primary-contrastText
--jf-palette-primary-dark            --jf-palette-primary-main
--jf-palette-primary-mainChannel     --jf-palette-secondary-contrastText
--jf-palette-secondary-main          --jf-palette-SnackbarContent-bg
--jf-palette-SnackbarContent-color   --jf-palette-text-primary
--jf-palette-text-secondary
```

Known selector changes between 10.11 and 12:

| Selector | 10.11 | 12 |
|---|---|---|
| `.detailPageContent` | present (`styles/librarybrowser.scss`) | removed; use `.detailPagePrimaryContent` |
| `--theme-*` custom properties | never existed | never existed |
| `.MuiButton-root` and other MUI globals | absent | present on React surfaces |
| `data-theme` on `<html>` | absent | present |

12 also renders parts of the UI with MUI, which emits stable global class names
(`.MuiButton-root`, `.MuiAppBar-root`, `.MuiDrawer-paper`, `.MuiTabs-root`,
`.MuiListItemButton-root`, and so on). Emotion may add hashed classes alongside
them; target only the documented `.Mui*-*` names.

The compatibility strategy this repo uses: style the legacy global classes, which
exist in both versions and do the real work on 10.11, and additionally declare
the `--jf-palette-*` variables so any 12-only surface picks up the palette
instead of falling back to stock blue.

## Traps

**Backdrops are two stacked layers.** `.backdropContainer` holds the artwork;
`.backgroundContainer` sits above it and dims it via
`.backgroundContainer.withBackdrop { background-color: rgba(0,0,0,0.86) }`. To
make artwork more visible, lower that alpha. If you set an opaque
`background-image` on `.backgroundContainer` you will hide backdrops entirely, so
guard it with `.backgroundContainer.withBackdrop { background-image: none }`.

**Header blur is explicitly disabled.** `.skinHeader.semiTransparent` carries
`backdrop-filter: none !important`. Restoring blur requires `!important`, and it
is worth excluding `.layout-tv` since TV hardware handles live blur badly.

**Inline styles beat you.** Backdrop and poster images are applied as inline
`background-image` by JavaScript. You can restyle the element but you cannot
change which image it loads.

**Everything is sized in `em`.** Changing `html { font-size }` rescales the entire
interface, including fixed elements. If you scale it, scale `.layout-tv` and
`.layout-mobile` too, or you will silently undo Jellyfin's 20px TV floor.

**`.cardBox` has `transition: none`.** Any card animation needs a transition
re-declared at higher specificity. Keep your hover rule below `(0,4,0)` so
`.card.show-animation:focus > .cardBox` still wins on TV.

**Never break TV focus.** `.card:focus ... { border-color: ... !important }` and
`.emby-button.show-focus:focus` are the only visible focus affordances in the TV
layout. Recolour them; do not remove them.

**`background` resets `background-image`.** Stock frequently uses the `background`
shorthand (`.raised`, `.toast`, `.listItem:hover`, `.programCell-*`). If you
re-declare one of those with `background-color` only, any stock gradient or image
on that element survives; if you use `background`, it is wiped. Pick deliberately.

**`.hide` is `display: none !important`.** Jellyfin toggles it constantly. Never
write a rule that re-shows a `.hide` element.

**`contain` limits what you can do.** `.backgroundContainer` is `contain: strict`
and `.mainAnimatedPage` is `contain: style size !important`. Pseudo-elements work
inside them, but they are clipped to the element's own box.
