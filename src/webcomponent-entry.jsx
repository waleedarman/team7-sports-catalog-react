/**
 * Web Component entry — wraps the Catalog as <pulse7-catalog>.
 *
 * Standalone deployment keeps using main.jsx + App.jsx (BrowserRouter),
 * which reads the real browser URL. Inside a Web Components shell the URL is
 * owned by the shell, so here we use MemoryRouter (self-contained routing)
 * instead. App.jsx is intentionally NOT imported to avoid its BrowserRouter.
 */
import { useEffect } from 'react';
import r2wc from '@r2wc/react-to-web-component';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/layout/ScrollToTop';
import { connectSharedCart } from './mfe/cartBridge';
import theme from './theme/theme';

function WrappedApp() {
  useEffect(() => connectSharedCart(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

const CatalogElement = r2wc(WrappedApp);

if (!customElements.get('pulse7-catalog')) {
  customElements.define('pulse7-catalog', CatalogElement);
}

export default CatalogElement;
