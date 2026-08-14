import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';
import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import CatalogSearch from './CatalogSearch';
import CategoryTabs from './CategoryTabs';
import { SORT_OPTIONS } from '../../hooks/useProductFilters';
import { pulse7Colors } from '../../theme/theme';

function CatalogControls({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onOpenFilters,
  drawerFilterCount,
}) {
  const filtersLabel =
    drawerFilterCount > 0 ? `FILTERS (${drawerFilterCount})` : 'FILTERS';

  return (
    <Box
      sx={{
        bgcolor: pulse7Colors.background,
        borderBottom: `1px solid ${pulse7Colors.border}`,
        py: { xs: 3, md: 4 },
        px: { xs: 2.5, md: 6, lg: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 1.5,
            alignItems: { lg: 'stretch' },
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CatalogSearch search={search} onSearchChange={onSearchChange} />
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<FilterListOutlined />}
              onClick={onOpenFilters}
              sx={controlButtonSx}
            >
              {filtersLabel}
            </Button>
            <FormControl size="small" sx={{ flex: 1, minWidth: 140 }}>
              <Select
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value)}
                sx={sortSelectSx}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </Box>
    </Box>
  );
}

const controlButtonSx = {
  flex: 1,
  minHeight: 46,
  borderRadius: '10px',
  borderColor: pulse7Colors.border,
  bgcolor: pulse7Colors.surface,
  color: pulse7Colors.primaryText,
  fontWeight: 600,
  fontSize: '0.8125rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  boxShadow: 'none',
  '&:hover': {
    bgcolor: pulse7Colors.background,
    borderColor: pulse7Colors.primaryText,
    boxShadow: 'none',
  },
};

const sortSelectSx = {
  minHeight: 46,
  borderRadius: '10px',
  bgcolor: pulse7Colors.surface,
  fontWeight: 600,
  fontSize: '0.8125rem',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: pulse7Colors.border,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: pulse7Colors.primaryText,
  },
};

export default CatalogControls;
