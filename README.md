# PULSE7 — Catalog Microfrontend

PULSE7 is Team 7’s **Catalog & Discovery** microfrontend for sporting goods and fitness gear.

It is built with **React** and **Material UI (MUI)**, and published as a **Web Component** so a Shell (and other microfrontends built with different frameworks) can load it from a live URL.

## What it does

- **Home** — hero, performance categories, trending gear
- **Product listing** — searchable product grid
- **Search and filters** — category, price, rating, availability, sorting
- **Product details** — gallery, options, quantity, specifications

Cart, checkout, and payment are owned by a separate Cart microfrontend.

## Framework

| Area | Choice |
| --- | --- |
| Framework | React |
| UI library | Material UI (MUI) + Emotion |
| Integration | Web Components |
| Build | Vite |

## Web Component

Custom element:

```html
<pulse7-catalog></pulse7-catalog>
```

Live bundle:

```text
https://team7-sports-catalog-react.vercel.app/pulse7-catalog.js
```

The Catalog is **independently deployable**. The Shell loads it from that live URL. Styles are isolated with **Shadow DOM** — do **not** load `pulse7-catalog.css`. MUI/Emotion styles are injected into the Shadow Root, so Shell or Lit CSS cannot restyle the Catalog.

## Shell integration

```html
<script
  type="module"
  src="https://team7-sports-catalog-react.vercel.app/pulse7-catalog.js"
></script>

<pulse7-catalog></pulse7-catalog>
```

No stylesheet link is required.

## Internal routes

Inside the Web Component, routing uses React Router with **MemoryRouter** (the Shell owns the browser URL):

| Path | Page |
| --- | --- |
| `/` | Home |
| `/products` | Product listing (search / filters) |
| `/products/:id` | Product details |

The standalone app (`npm run dev` / normal Vite deploy) still uses `BrowserRouter` and the same routes.

## Integration events

| Direction | Event / key | Role |
| --- | --- | --- |
| Emits | `cart:add` | Announce “add this product to cart” |
| Listens | `cart:changed` | Refresh the navbar cart badge in the same tab |
| Listens | `storage` | Refresh the badge when cart state changes in another tab |
| Shared storage | `mfe_cart_state` | Read-only snapshot; Catalog never writes this key |

Events are dispatched on `window`. Persistence belongs to the Cart microfrontend.

## Integration Notes

- Web Components were chosen because teams use different frameworks (this Catalog is React; the Cart side uses Lit).
- The main integration challenge was **CSS isolation** between React/MUI and Lit global styles.
- **Shadow DOM** keeps Catalog styles inside `<pulse7-catalog>`, with Emotion writing MUI styles into the Shadow Root instead of `document.head`.

## Getting started

```bash
npm install
npm run dev      # standalone Catalog (http://localhost:5173)
npm run build    # standalone app + pulse7-catalog.js
npm run preview
npm run lint
```

Local Web Component smoke test (after build): open `test-wc.html`.

## Project structure

```
src/
├── main.jsx                 # Standalone entry (ThemeProvider + CssBaseline)
├── App.jsx                  # Standalone BrowserRouter routes
├── webcomponent-entry.jsx   # <pulse7-catalog> entry (Shadow DOM + MemoryRouter)
├── webcomponent.css         # Styles injected into the Shadow Root
├── theme/theme.js
├── pages/                   # Home, Products, Product Details
├── components/
├── hooks/useProductFilters.js
├── data/
├── utils/cart.js
└── mfe/
    ├── mfe-events.js        # Cross-MFE event contract
    └── cartBridge.js        # cart:add + shared cart mirror
```

## Design system

Defined in `src/theme/theme.js`:

| Token | Value |
| --- | --- |
| Background | `#F9F9F7` |
| Surface | `#FFFFFF` |
| Primary text | `#1A1C1B` |
| Muted text | `#5F625F` |
| Electric lime | `#CCFF00` |
| Lime hover | `#B8E600` |
| Secondary blue | `#0040E0` |
| Border | `#E3E5DF` |
| Error | `#BA1A1A` |

Typography: **Anton** (headings), **Inter** (body).
