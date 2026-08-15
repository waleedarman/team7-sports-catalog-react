/**
 * Web Component entry — wraps the Catalog as <pulse7-catalog>.
 *
 * Standalone deployment keeps using main.jsx + App.jsx (BrowserRouter),
 * which reads the real browser URL. Inside a Web Components shell the URL is
 * owned by the shell, so here we use MemoryRouter (self-contained routing)
 * instead. App.jsx is intentionally NOT imported to avoid its BrowserRouter.
 *
 * The whole catalog renders inside an open shadow root, and every stylesheet it
 * needs — the base reset plus everything MUI generates through Emotion — is
 * injected into that shadow root. Global CSS from the shell or from a sibling
 * microfrontend therefore cannot restyle the catalog, and the catalog no longer
 * emits any global CSS of its own.
 */
import { useEffect, useMemo, useState } from 'react';
import r2wc from '@r2wc/react-to-web-component';
import { MemoryRouter, Routes, Route } from 'react-router';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import shadowStyles from './webcomponent.css?inline';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/layout/ScrollToTop';
import { connectSharedCart } from './mfe/cartBridge';
import theme from './theme/theme';

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap';

/**
 * `@font-face` is resolved per document and is ignored inside a shadow root, so
 * the catalog loads its own webfonts into the host document rather than relying
 * on the shell having them. Font *usage* stays inside the shadow root.
 */
function ensureCatalogFonts() {
  if (typeof document === 'undefined' || document.querySelector('link[data-pulse7-fonts]')) {
    return;
  }

  const link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = FONTS_HREF;
  link.dataset.pulse7Fonts = '';
  document.head.appendChild(link);
}

function WrappedApp({ container }) {
  const [portalNode, setPortalNode] = useState(null);

  // One cache per element instance, writing its <style> tags into that
  // instance's shadow root instead of document.head.
  const [emotionCache] = useState(() => createCache({ key: 'pulse7', container }));

  // Modal, Drawer, Dialog, Menu and Select portal into document.body by
  // default, which is outside the shadow root and therefore outside the cache
  // above — they would render unstyled and exposed to the shell's CSS. Point
  // them at a node inside the shadow root instead. Overriding defaults here
  // rather than in theme/theme.js keeps the standalone theme untouched.
  const shadowTheme = useMemo(
    () =>
      createTheme(theme, {
        components: {
          MuiModal: { defaultProps: { container: portalNode } },
          MuiPopover: { defaultProps: { container: portalNode } },
          MuiPopper: { defaultProps: { container: portalNode } },
        },
      }),
    [portalNode],
  );

  useEffect(() => connectSharedCart(), []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={shadowTheme}>
        {/* ScopedCssBaseline applies the html/body reset to this element
            instead of the document, which is what CssBaseline would need. */}
        <ScopedCssBaseline className="pulse7-catalog-root">
          <MemoryRouter initialEntries={['/']}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Routes>
          </MemoryRouter>
          {/* Portal target for Drawer / Dialog / Select menus. */}
          <div ref={setPortalNode} />
        </ScopedCssBaseline>
      </ThemeProvider>
    </CacheProvider>
  );
}

const CatalogBaseElement = r2wc(WrappedApp, { shadow: 'open' });

class Pulse7CatalogElement extends CatalogBaseElement {
  constructor() {
    super();

    const style = document.createElement('style');

    style.textContent = shadowStyles;
    // First stylesheet in the tree, so Emotion's later rules keep winning the
    // same ties they win against index.css in the standalone build.
    this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild);
  }
}

ensureCatalogFonts();

if (!customElements.get('pulse7-catalog')) {
  customElements.define('pulse7-catalog', Pulse7CatalogElement);
}

export default Pulse7CatalogElement;
