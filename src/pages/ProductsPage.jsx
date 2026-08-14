import { useCallback, useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSearchParams } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CatalogHeader from '../components/catalog/CatalogHeader';
import CatalogControls from '../components/catalog/CatalogControls';
import ResultsToolbar from '../components/catalog/ResultsToolbar';
import ActiveFilterChips from '../components/catalog/ActiveFilterChips';
import CatalogProductCard from '../components/catalog/CatalogProductCard';
import EmptyProductsState from '../components/catalog/EmptyProductsState';
import FilterDrawer from '../components/catalog/FilterDrawer';
import { products } from '../data/products';
import {
  resolveCategoryFromUrl,
  resolveSortFromUrl,
  useProductFilters,
  SORT_OPTIONS,
} from '../hooks/useProductFilters';
import { pulse7Colors } from '../theme/theme';

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const selectedCategory = resolveCategoryFromUrl(searchParams.get('category'));
  const search = searchParams.get('q') || '';
  const sortBy = resolveSortFromUrl(searchParams.get('sort'));

  const updateCategory = useCallback(
    (category) => {
      const nextCategory = resolveCategoryFromUrl(category);

      if (selectedCategory === nextCategory) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);

      if (nextCategory === 'all') {
        nextParams.delete('category');
      } else {
        nextParams.set('category', nextCategory);
      }

      setSearchParams(nextParams, { replace: true });
    },
    [selectedCategory, searchParams, setSearchParams],
  );

  const updateSearch = useCallback(
    (query) => {
      const nextParams = new URLSearchParams(searchParams);

      if (!query) {
        nextParams.delete('q');
      } else {
        nextParams.set('q', query);
      }

      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const updateSort = useCallback(
    (sort) => {
      const nextSort = resolveSortFromUrl(sort);
      const nextParams = new URLSearchParams(searchParams);

      if (nextSort === 'featured') {
        nextParams.delete('sort');
      } else {
        nextParams.set('sort', nextSort);
      }

      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const {
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
  } = useProductFilters(products, {
    selectedCategory,
    search,
    sortBy,
  });

  const drawerFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count += 1;
    if (priceRange[0] !== 0 || priceRange[1] !== defaultMaxPrice) count += 1;
    if (minimumRating > 0) count += 1;
    if (inStockOnly) count += 1;
    return count;
  }, [selectedCategory, priceRange, minimumRating, inStockOnly, defaultMaxPrice]);

  const handleClearAll = () => {
    clearLocalFilters();
    setSearchParams({}, { replace: true });
    setFilterDrawerOpen(false);
  };

  const handleOpenFilters = () => {
    setFilterDrawerOpen(true);
  };

  const handleShowResults = () => {
    setFilterDrawerOpen(false);
  };

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? sortBy;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: pulse7Colors.background }}>
        <CatalogHeader />

        <CatalogControls
          search={search}
          onSearchChange={updateSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={updateCategory}
          sortBy={sortBy}
          onSortChange={updateSort}
          onOpenFilters={handleOpenFilters}
          drawerFilterCount={drawerFilterCount}
        />

        <Box sx={{ py: { xs: 3, md: 5 }, ...pagePadding }}>
          <Container maxWidth={false} sx={{ maxWidth: 1280, px: 0 }}>
            <ResultsToolbar
              resultCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={updateSort}
              onOpenFilters={handleOpenFilters}
              drawerFilterCount={drawerFilterCount}
            />

            <ActiveFilterChips
              search={search}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              minimumRating={minimumRating}
              inStockOnly={inStockOnly}
              sortBy={sortBy}
              sortLabel={sortLabel}
              defaultMaxPrice={defaultMaxPrice}
              onRemoveSearch={() => updateSearch('')}
              onRemoveCategory={() => updateCategory('all')}
              onRemovePrice={() => setPriceRange([0, defaultMaxPrice])}
              onRemoveRating={() => setMinimumRating(0)}
              onRemoveInStock={() => setInStockOnly(false)}
              onRemoveSort={() => updateSort('featured')}
              onClearAll={handleClearAll}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
            />

            {filteredProducts.length === 0 ? (
              <EmptyProductsState onClearFilters={handleClearAll} />
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    lg: 'repeat(3, minmax(0, 1fr))',
                  },
                  columnGap: { xs: 1.5, sm: 2.5, md: '28px' },
                  rowGap: { xs: 3, md: '44px' },
                }}
              >
                {filteredProducts.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </Box>
            )}
          </Container>
        </Box>
      </Box>

      <Footer />

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={updateCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        minimumRating={minimumRating}
        onMinimumRatingChange={setMinimumRating}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        defaultMaxPrice={defaultMaxPrice}
        drawerFilterCount={drawerFilterCount}
        onClearAll={handleClearAll}
        onShowResults={handleShowResults}
      />
    </Box>
  );
}

export default ProductsPage;
