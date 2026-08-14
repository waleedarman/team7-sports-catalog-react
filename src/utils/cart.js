import { publishAddToCart } from '../mfe/cartBridge';

/**
 * Adds a product to the shared cart via the cross-MFE `cart:add` contract.
 * The Cart microfrontend owns persistence; this catalog only announces intent.
 */
export function addToCart(product, options = {}) {
  return publishAddToCart(product, options);
}
