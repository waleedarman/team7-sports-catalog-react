import { Box, Button, Chip } from '@mui/material';
import { getCategoryNameFromSlug } from '../../hooks/useProductFilters';
import { formatPrice } from '../../data/products';
import { pulse7Colors } from '../../theme/theme';

const chipSx = {
  bgcolor: pulse7Colors.background,
  border: `1px solid ${pulse7Colors.border}`,
  borderRadius: '999px',
  color: pulse7Colors.primaryText,
  fontWeight: 500,
  fontSize: '0.8125rem',
  '& .MuiChip-deleteIcon': {
    color: pulse7Colors.secondaryText,
    '&:hover': {
      color: pulse7Colors.primaryText,
    },
  },
};

function ActiveFilterChips({
  search,
  selectedCategory,
  priceRange,
  minimumRating,
  inStockOnly,
  sortBy,
  sortLabel,
  defaultMaxPrice,
  onRemoveSearch,
  onRemoveCategory,
  onRemovePrice,
  onRemoveRating,
  onRemoveInStock,
  onRemoveSort,
  onClearAll,
  hasActiveFilters,
  activeFilterCount,
}) {
  if (!hasActiveFilters) {
    return null;
  }

  const isDefaultPriceRange =
    priceRange[0] === 0 && priceRange[1] === defaultMaxPrice;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1,
        mb: 3,
      }}
    >
      {search.trim() && (
        <Chip
          label={`Search: ${search.trim()}`}
          onDelete={onRemoveSearch}
          sx={chipSx}
        />
      )}

      {selectedCategory !== 'all' && (
        <Chip
          label={getCategoryNameFromSlug(selectedCategory)}
          onDelete={onRemoveCategory}
          sx={chipSx}
        />
      )}

      {!isDefaultPriceRange && (
        <Chip
          label={`${formatPrice(priceRange[0])} – ${formatPrice(priceRange[1])}`}
          onDelete={onRemovePrice}
          sx={chipSx}
        />
      )}

      {minimumRating > 0 && (
        <Chip
          label={`${minimumRating}+ Stars`}
          onDelete={onRemoveRating}
          sx={chipSx}
        />
      )}

      {inStockOnly && (
        <Chip label="In Stock" onDelete={onRemoveInStock} sx={chipSx} />
      )}

      {sortBy !== 'featured' && (
        <Chip label={`Sort: ${sortLabel}`} onDelete={onRemoveSort} sx={chipSx} />
      )}

      {activeFilterCount > 1 && (
        <Button
          variant="text"
          onClick={onClearAll}
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: pulse7Colors.secondaryText,
            textTransform: 'uppercase',
            minWidth: 'auto',
            letterSpacing: '0.04em',
          }}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
}

export default ActiveFilterChips;
