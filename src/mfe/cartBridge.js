/**
 * Bridge between the catalog's internal cart helpers and the shared
 * cross-microfrontend contract (see `mfe-events.js` and EVENTS.md).
 *
 * SINGLE SOURCE OF TRUTH: the Cart microfrontend (Lit `cart-store.js`) is the
 * only writer of `mfe_cart_state`. This file must NEVER call
 * `localStorage.setItem(CART_STORAGE_KEY, …)`.
 *
 * The catalog is a *producer + mirror*:
 *  - it announces intent by dispatching `cart:*` events, and
 *  - it keeps a read-only snapshot fed by `cart:changed` (same tab) and the
 *    `storage` event (other tabs), which the Navbar badge subscribes to.
 */

import {
  CART_STATE_VERSION,
  CART_STORAGE_KEY,
  emitCartAdd,
  normalizeCartItem,
  onCartEvents,
} from './mfe-events';

/** Read-only. Writing this key is reserved for the cart microfrontend. */
function readSharedCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!parsed || parsed.version !== CART_STATE_VERSION || !Array.isArray(parsed.items)) {
      return [];
    }

    return parsed.items.map(normalizeCartItem).filter(Boolean);
  } catch {
    return [];
  }
}

function summarize(items) {
  return {
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
  };
}

/* -------------------------------------------------------------------------
 * Read-only snapshot store (feeds the Navbar badge via useSyncExternalStore)
 * ---------------------------------------------------------------------- */

let snapshot = summarize(typeof window === 'undefined' ? [] : readSharedCart());

const snapshotListeners = new Set();

function setSnapshot(next) {
  snapshot = next;
  snapshotListeners.forEach((listener) => listener());
}

/** Subscribe to shared cart changes. Returns an unsubscribe function. */
export function subscribeSharedCart(listener) {
  snapshotListeners.add(listener);

  return () => snapshotListeners.delete(listener);
}

/** Number of units in the shared cart, for badges. */
export function getSharedCartCount() {
  return snapshot.count;
}

/** Full read-only snapshot: `{ items, count, subtotal }`. */
export function getSharedCartSnapshot() {
  return snapshot;
}

/* -------------------------------------------------------------------------
 * Producer
 * ---------------------------------------------------------------------- */

function toColorName(selectedColor) {
  if (!selectedColor) {
    return '';
  }

  if (typeof selectedColor === 'object') {
    return selectedColor.name || selectedColor.id || '';
  }

  return String(selectedColor);
}

/**
 * Maps a catalog product onto the shared cart item shape and dispatches
 * `cart:add`. Deliberately does not touch localStorage — the cart
 * microfrontend applies the event and persists the result.
 *
 * @param {{ id: string, name: string, price: number, image: string }} product
 * @param {{ quantity?: number, selectedSize?: string, selectedColor?: unknown }} options
 */
export function publishAddToCart(product, options = {}) {
  return emitCartAdd({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    qty: options.quantity ?? 1,
    size: options.selectedSize ?? '',
    color: toColorName(options.selectedColor),
  });
}

/* -------------------------------------------------------------------------
 * Mirror
 * ---------------------------------------------------------------------- */

/**
 * Keeps the catalog's read-only snapshot in sync with the cart microfrontend:
 *  - `cart:changed` covers mutations in this tab,
 *  - the `storage` event covers mutations made in another tab.
 * Call once from the app root.
 *
 * @param {(summary: { items: Array, count: number, subtotal: number }) => void} [onChange]
 * @returns {() => void} unsubscribe function
 */
export function connectSharedCart(onChange) {
  const apply = (summary) => {
    setSnapshot(summary);
    onChange?.(summary);
  };

  const detachEvents = onCartEvents({
    changed: (summary) => {
      if (!summary || !Array.isArray(summary.items)) {
        return;
      }

      const items = summary.items.map(normalizeCartItem).filter(Boolean);
      const fallback = summarize(items);

      apply({
        items,
        count: typeof summary.count === 'number' ? summary.count : fallback.count,
        subtotal:
          typeof summary.subtotal === 'number' ? summary.subtotal : fallback.subtotal,
      });
    },
  });

  const handleStorage = (event) => {
    if (event.key !== CART_STORAGE_KEY) {
      return;
    }

    apply(summarize(readSharedCart()));
  };

  window.addEventListener('storage', handleStorage);

  // Hydrate once in case the cart microfrontend wrote before this mounted.
  apply(summarize(readSharedCart()));

  return () => {
    detachEvents();
    window.removeEventListener('storage', handleStorage);
  };
}
