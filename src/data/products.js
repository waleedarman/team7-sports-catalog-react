import products from './products.json';

export { products };

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getMaxProductPrice() {
  const maxPrice = Math.max(...products.map((product) => product.price));
  return Math.ceil(maxPrice / 50) * 50;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getProductGallery(product) {
  if (product.gallery?.length) {
    return product.gallery.slice(0, 3);
  }

  return [product.image];
}

export function getCategorySlug(category) {
  return category.trim().toLowerCase().replace(/\s+/g, '-');
}
