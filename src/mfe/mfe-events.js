/**
 * PULSE7 cross-microfrontend event contract.
 *
 * This file is the single source of truth for how the Catalog microfrontend
 * (React + MUI) and the Cart microfrontend (Lit + Material Web) talk to each
 * other. An identical copy lives in the cart repo at `src/lib/mfe-events.js`.
 * Keep both files byte-for-byte equivalent — see EVENTS.md.
 *
 * Rules:
 *  - All events are dispatched on `window` (no direct imports between MFEs).
 *  - Every payload travels in `event.detail`.
 *  - Shared cart state is mirrored into localStorage under CART_STORAGE_KEY.
 *
 *  Event              | Payload                                              | Dispatched by | Listened to by
 *  -------------------|------------------------------------------------------|---------------|---------------
 *  cart:add           | { productId, name, price, image, qty }               | Catalog       | Cart
 *  cart:remove        | { productId }                                        | Cart, Catalog | Cart
 *  cart:update-qty    | { productId, qty }                                   | Cart, Catalog | Cart
 *  cart:clear         | undefined                                            | Cart, Catalog | Cart
 *  cart:changed       | { items, count, subtotal }                           | Cart          | Catalog
 */

export const CART_EVENTS = Object.freeze({
  ADD: 'cart:add',
  REMOVE: 'cart:remove',
  UPDATE_QTY: 'cart:update-qty',
  CLEAR: 'cart:clear',
  /** Broadcast by the cart after any mutation so other MFEs can refresh badges. */
  CHANGED: 'cart:changed',
});

/** localStorage key shared by both microfrontends. */
export const CART_STORAGE_KEY = 'mfe_cart_state';

/** Bump when the persisted shape changes; readers discard older versions. */
export const CART_STATE_VERSION = 1;

/**
 * Builds the composite key that identifies one cart line.
 * Variants of the same product (different size/color) are separate lines.
 */
export function cartLineKey(item) {
  return [item.productId, item.size ?? '', item.color ?? ''].join('|');
}

/**
 * Coerces any incoming payload into the agreed cart item shape.
 * Foreign MFEs may send extra fields; only the contract fields survive.
 */
export function normalizeCartItem(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const productId = String(input.productId ?? input.id ?? '').trim();

  if (!productId) {
    return null;
  }

  const price = Number(input.price);
  const qty = Math.max(1, Math.floor(Number(input.qty ?? input.quantity ?? 1)) || 1);

  const item = {
    productId,
    name: String(input.name ?? 'Unknown product'),
    price: Number.isFinite(price) ? price : 0,
    image: String(input.image ?? ''),
    qty,
  };

  // Optional variant fields — preserved when present so the cart can show them.
  if (input.size) {
    item.size = String(input.size);
  }

  if (input.color) {
    item.color = String(input.color);
  }

  return item;
}

function emit(name, detail) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/** Catalog side: "add this product to the cart". */
export function emitCartAdd(item) {
  const normalized = normalizeCartItem(item);

  if (normalized) {
    emit(CART_EVENTS.ADD, normalized);
  }

  return normalized;
}

/** Remove an entire line from the cart. */
export function emitCartRemove(productId, variant = {}) {
  emit(CART_EVENTS.REMOVE, {
    productId: String(productId),
    ...(variant.size ? { size: String(variant.size) } : {}),
    ...(variant.color ? { color: String(variant.color) } : {}),
  });
}

/** Set an absolute quantity for a line. `qty <= 0` removes the line. */
export function emitCartUpdateQty(productId, qty, variant = {}) {
  emit(CART_EVENTS.UPDATE_QTY, {
    productId: String(productId),
    qty: Math.floor(Number(qty)) || 0,
    ...(variant.size ? { size: String(variant.size) } : {}),
    ...(variant.color ? { color: String(variant.color) } : {}),
  });
}

/** Empty the cart. Carries no payload by contract. */
export function emitCartClear() {
  emit(CART_EVENTS.CLEAR);
}

/** Cart side: announce the new state after a mutation. */
export function emitCartChanged(summary) {
  emit(CART_EVENTS.CHANGED, summary);
}

/**
 * Subscribes to one contract event.
 * @returns {() => void} unsubscribe function
 */
export function onCartEvent(eventName, handler) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const listener = (event) => handler(event.detail, event);

  window.addEventListener(eventName, listener);

  return () => window.removeEventListener(eventName, listener);
}

/**
 * Convenience: subscribe to every mutation event at once.
 * @param {{ add?: Function, remove?: Function, updateQty?: Function, clear?: Function, changed?: Function }} handlers
 * @returns {() => void} unsubscribe function that detaches all listeners
 */
export function onCartEvents(handlers = {}) {
  const pairs = [
    [CART_EVENTS.ADD, handlers.add],
    [CART_EVENTS.REMOVE, handlers.remove],
    [CART_EVENTS.UPDATE_QTY, handlers.updateQty],
    [CART_EVENTS.CLEAR, handlers.clear],
    [CART_EVENTS.CHANGED, handlers.changed],
  ];

  const teardowns = pairs
    .filter(([, handler]) => typeof handler === 'function')
    .map(([name, handler]) => onCartEvent(name, handler));

  return () => teardowns.forEach((teardown) => teardown());
}
