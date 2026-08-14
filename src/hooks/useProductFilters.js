import { useCallback, useMemo, useState } from 'react';
import { getMaxProductPrice } from '../data/products';

export const CATEGORY_TABS = [
  { slug: 'all', label: 'ALL GEAR' },
  { slug: 'running', label: 'RUNNING', categoryName: 'Running' },
  { slug: 'training', label: 'TRAINING', categoryName: 'Training' },
  { slug: 'strength', label: 'STRENGTH', categoryName: 'Strength' },
  { slug: 'home-fitness', label: 'HOME FITNESS', categoryName: 'Home Fitness' },
  { slug: 'recovery', label: 'RECOVERY', categoryName: 'Recovery' },
  { slug: 'outdoor', label: 'OUTDOOR', categoryName: 'Outdoor' },
  { slug: 'team-sports', label: 'TEAM SPORTS', categoryName: 'Team Sports' },
];

export const VALID_CATEGORIES = CATEGORY_TABS.map((tab) => tab.slug);

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export const VALID_SORT_VALUES = SORT_OPTIONS.map((option) => option.value);

export const RATING_OPTIONS = [
  { value: 0, label: 'All ratings' },
  { value: 4, label: '4.0 and above' },
  { value: 4.5, label: '4.5 and above' },
  { value: 4.8, label: '4.8 and above' },
];

export function normalizeCategory(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function resolveCategoryFromUrl(categoryParam) {
  const normalized = normalizeCategory(categoryParam || 'all');
  return VALID_CATEGORIES.includes(normalized) ? normalized : 'all';
}

export function resolveSortFromUrl(sortParam) {
  const sort = sortParam || 'featured';
  return VALID_SORT_VALUES.includes(sort) ? sort : 'featured';
}

export function getCategoryNameFromSlug(slug) {
  const tab = CATEGORY_TABS.find((item) => item.slug === slug);
  return tab?.categoryName ?? null;
}

function matchesSearch(product, searchTerm) {
  if (!searchTerm.trim()) {
    return true;
  }

  const searchableText = [
    product.name,
    product.category,
    product.description,
    ...(product.tags || []),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(searchTerm.trim().toLowerCase());
}

function sortProducts(items, sortBy) {
  const sortedProducts = [...items];

  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sortedProducts.sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return a.name.localeCompare(b.name);
      });
  }
}

export function useProductFilters(
  products,
  { selectedCategory = 'all', search = '', sortBy = 'featured' } = {},
) {
  const defaultMaxPrice = getMaxProductPrice();

  const [priceRange, setPriceRange] = useState([0, defaultMaxPrice]);
  const [minimumRating, setMinimumRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = products.filter((product) => {
      if (!matchesSearch(product, search)) {
        return false;
      }

      if (
        selectedCategory !== 'all' &&
        normalizeCategory(product.category) !== selectedCategory
      ) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      if (minimumRating > 0 && product.rating < minimumRating) {
        return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    results = sortProducts(results, sortBy);

    return results;
  }, [
    products,
    search,
    selectedCategory,
    priceRange,
    minimumRating,
    inStockOnly,
    sortBy,
  ]);

  const clearLocalFilters = useCallback(() => {
    setPriceRange([0, defaultMaxPrice]);
    setMinimumRating(0);
    setInStockOnly(false);
  }, [defaultMaxPrice]);

  const hasActiveFilters = useMemo(() => {
    const isDefaultPriceRange =
      priceRange[0] === 0 && priceRange[1] === defaultMaxPrice;

    return (
      search.trim().length > 0 ||
      selectedCategory !== 'all' ||
      !isDefaultPriceRange ||
      minimumRating > 0 ||
      inStockOnly ||
      sortBy !== 'featured'
    );
  }, [
    search,
    selectedCategory,
    priceRange,
    minimumRating,
    inStockOnly,
    sortBy,
    defaultMaxPrice,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (search.trim()) count += 1;
    if (selectedCategory !== 'all') count += 1;
    if (priceRange[0] !== 0 || priceRange[1] !== defaultMaxPrice) count += 1;
    if (minimumRating > 0) count += 1;
    if (inStockOnly) count += 1;
    if (sortBy !== 'featured') count += 1;

    return count;
  }, [
    search,
    selectedCategory,
    priceRange,
    minimumRating,
    inStockOnly,
    sortBy,
    defaultMaxPrice,
  ]);

  return {
    priceRange,
    setPriceRange,
    minimumRating,
    setMinimumRating,
    inStockOnly,
    setInStockOnly,
    filteredProducts,
    clearLocalFilters,
    activeFilterCount,
    hasActiveFilters,
    defaultMaxPrice,
  };
}
