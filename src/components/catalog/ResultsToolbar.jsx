import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import { SORT_OPTIONS } from '../../hooks/useProductFilters';
import { pulse7Colors } from '../../theme/theme';

function ResultsToolbar({
  resultCount,
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
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 2.5,
        pt: { xs: 1, md: 2 },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.9375rem',
          color: pulse7Colors.secondaryText,
          fontWeight: 500,
        }}
      >
        Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
      </Typography>

      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListOutlined />}
          onClick={onOpenFilters}
          sx={{
            minHeight: 46,
            px: 2.5,
            borderRadius: '10px',
            borderColor: pulse7Colors.border,
            bgcolor: pulse7Colors.surface,
            color: pulse7Colors.primaryText,
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.04em',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: pulse7Colors.background,
              borderColor: pulse7Colors.primaryText,
              boxShadow: 'none',
            },
          }}
        >
          {filtersLabel}
        </Button>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            displayEmpty
            renderValue={(value) => {
              const option = SORT_OPTIONS.find((item) => item.value === value);
              return `SORT BY: ${option?.label ?? 'Featured'}`;
            }}
            sx={{
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
            }}
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
  );
}

export default ResultsToolbar;
