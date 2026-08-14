# PULSE7 — Sports Catalog

A modern, premium sporting-goods storefront built with **React + Material UI (MUI)**.
PULSE7 is the **Catalog** microfrontend: it handles the homepage, product listing,
search & filtering, and product details. Cart, checkout, and payment live in a
separate Cart microfrontend and communicate only through shared `window` events.

---

## Features

- **Homepage** — hero section, "Shop by Performance" categories, trending gear
- **Product listing** (`/products`) — search, category pills, price/rating/availability
  filters in a slide-out drawer, sorting, and active-filter chips
- **URL-driven state** — category, search, and sort are stored in the URL query
  string, so filters survive refresh and browser back/forward
- **Product details** (`/products/:id`) — image gallery, color/size options,
  quantity selector, and specifications
- **Add to cart** — publishes the shared `cart:add` event; the navbar badge
  reflects the shared cart count
- **Responsive design** — 1 / 2 / 3 column grids across mobile, tablet, desktop
- **Consistent theming** — the PULSE7 palette and Anton/Inter typography are
  centralized in the MUI theme

---

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| UI library | Material UI (MUI) + Emotion |
| Routing | React Router |
| Build tool | Vite |
| Linting | ESLint |

---

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# create a production build
npm run build

# preview the production build
npm run preview

# lint the project
npm run lint
```

---

## Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | Home | Hero, categories, trending products |
| `/products` | Catalog | Search, filters, sorting, product grid |
| `/products/:id` | Product Details | Gallery, options, specifications |

---

## Project Structure

```
src/
├── main.jsx                 # App entry, MUI ThemeProvider + CssBaseline
├── App.jsx                  # Routes + ScrollToTop + shared cart connection
├── theme/
│   └── theme.js             # PULSE7 colors, typography, MUI theme
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   └── ProductDetailsPage.jsx
├── components/
│   ├── layout/              # Navbar, Footer, ScrollToTop
│   ├── home/                # Hero, ShopByPerformance, TrendingGear, cards
│   ├── catalog/             # Search, CategoryTabs, FilterDrawer, cards, chips
│   └── product-details/     # Gallery, Info, Options, Specifications, etc.
├── hooks/
│   └── useProductFilters.js # Filtering, sorting, and category helpers
├── data/
│   ├── products.json        # Product catalog data
│   ├── products.js          # Data helpers (getProductById, formatPrice, …)
│   ├── categories.json      # "Shop by Performance" categories
│   └── homepage.json        # Homepage copy and hero config
├── utils/
│   └── cart.js              # addToCart → publishes the shared cart:add event
└── mfe/
    ├── mfe-events.js        # Cross-microfrontend event contract
    └── cartBridge.js        # Emits cart:add, mirrors shared cart state
```

---

## Cart Integration (Microfrontends)

PULSE7 does not own the cart. When a user adds a product, the catalog dispatches a
`cart:add` event on `window`; the separate **Cart microfrontend** owns cart state
and persists it under the shared `localStorage` key `mfe_cart_state`. The catalog
reads that state back (via the `cart:changed` and `storage` events) only to display
the navbar badge — it never writes cart storage itself.

Relevant files: `src/mfe/mfe-events.js` and `src/mfe/cartBridge.js`.

---

## Design System

Colors are defined once in `src/theme/theme.js`:

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

Typography: **Anton** for display headings, **Inter** for body text.
