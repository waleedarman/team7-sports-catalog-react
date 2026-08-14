import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  IconButton,
  Rating,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  CATEGORY_TABS,
  RATING_OPTIONS,
} from '../../hooks/useProductFilters';
import { formatPrice } from '../../data/products';
import { pulse7Colors } from '../../theme/theme';

const categoryOptions = CATEGORY_TABS.map((tab) => ({
  slug: tab.slug,
  name: tab.slug === 'all' ? 'All Gear' : tab.categoryName,
}));

function FilterDrawer({
  open,
  onClose,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minimumRating,
  onMinimumRatingChange,
  inStockOnly,
  onInStockOnlyChange,
  defaultMaxPrice,
  drawerFilterCount,
  onClearAll,
  onShowResults,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380, md: 420 },
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
          borderBottom: `1px solid ${pulse7Colors.border}`,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Anton", sans-serif',
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            FILTER PRODUCTS
          </Typography>
          {drawerFilterCount > 0 && (
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: pulse7Colors.secondaryText,
                mt: 0.5,
              }}
            >
              {drawerFilterCount} active{' '}
              {drawerFilterCount === 1 ? 'filter' : 'filters'}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={onClearAll}
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: pulse7Colors.secondaryText,
              textTransform: 'uppercase',
            }}
          >
            Clear All
          </Button>
          <IconButton aria-label="Close filters" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2 }}>
        <Accordion
          defaultExpanded
          elevation={0}
          disableGutters
          sx={{
            bgcolor: 'transparent',
            '&::before': { display: 'none' },
            borderBottom: `1px solid ${pulse7Colors.border}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
              CATEGORY
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categoryOptions.map((category) => {
                const isSelected = selectedCategory === category.slug;

                return (
                  <Button
                    key={category.slug}
                    type="button"
                    onClick={() => onCategoryChange(category.slug)}
                    sx={{
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: '0.9375rem',
                      color: pulse7Colors.primaryText,
                      bgcolor: isSelected ? pulse7Colors.background : 'transparent',
                      border: isSelected
                        ? `2px solid ${pulse7Colors.electricLime}`
                        : `1px solid ${pulse7Colors.border}`,
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: pulse7Colors.background,
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {category.name}
                    {isSelected && (
                      <CheckIcon sx={{ fontSize: 18, color: pulse7Colors.primaryText }} />
                    )}
                  </Button>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          elevation={0}
          disableGutters
          sx={{
            bgcolor: 'transparent',
            '&::before': { display: 'none' },
            borderBottom: `1px solid ${pulse7Colors.border}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
              PRICE RANGE
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 3 }}>
            <Typography
              sx={{
                fontFamily: '"Anton", sans-serif',
                fontSize: '1.5rem',
                mb: 2,
              }}
            >
              {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  flex: 1,
                  px: 2,
                  py: 1.25,
                  borderRadius: '8px',
                  border: `1px solid ${pulse7Colors.border}`,
                  bgcolor: pulse7Colors.surface,
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {formatPrice(priceRange[0])}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  px: 2,
                  py: 1.25,
                  borderRadius: '8px',
                  border: `1px solid ${pulse7Colors.border}`,
                  bgcolor: pulse7Colors.surface,
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {formatPrice(priceRange[1])}
              </Box>
            </Box>
            <Slider
              value={priceRange}
              onChange={(_event, newValue) => onPriceRangeChange(newValue)}
              min={0}
              max={defaultMaxPrice}
              step={5}
              aria-label="Price range"
              sx={{
                color: pulse7Colors.electricLime,
                height: 6,
                '& .MuiSlider-rail': {
                  opacity: 1,
                  bgcolor: '#E8E8E6',
                },
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 18,
                  height: 18,
                  bgcolor: pulse7Colors.electricLime,
                  border: `2px solid ${pulse7Colors.primaryText}`,
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0 0 0 6px rgba(204, 255, 0, 0.25)`,
                  },
                },
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          elevation={0}
          disableGutters
          sx={{
            bgcolor: 'transparent',
            '&::before': { display: 'none' },
            borderBottom: `1px solid ${pulse7Colors.border}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
              MINIMUM RATING
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {RATING_OPTIONS.map((option) => {
                const isSelected = minimumRating === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    onClick={() => onMinimumRatingChange(option.value)}
                    sx={{
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '0.9375rem',
                      color: pulse7Colors.primaryText,
                      bgcolor: isSelected ? pulse7Colors.background : 'transparent',
                      border: isSelected
                        ? `2px solid ${pulse7Colors.electricLime}`
                        : `1px solid ${pulse7Colors.border}`,
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: pulse7Colors.background,
                        boxShadow: 'none',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {option.value > 0 ? (
                        <Rating
                          value={option.value}
                          readOnly
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: pulse7Colors.primaryText,
                            },
                          }}
                        />
                      ) : (
                        <Typography sx={{ fontWeight: 500 }}>{option.label}</Typography>
                      )}
                      {option.value > 0 && (
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          {option.label}
                        </Typography>
                      )}
                    </Box>
                    {isSelected && <CheckIcon sx={{ fontSize: 18 }} />}
                  </Button>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ py: 3 }}>
          <Typography
            sx={{
              fontWeight: 600,
              letterSpacing: '0.06em',
              fontSize: '0.8125rem',
              mb: 2,
            }}
          >
            AVAILABILITY
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: 2,
              py: 1.75,
              borderRadius: '10px',
              border: `1px solid ${pulse7Colors.border}`,
              bgcolor: pulse7Colors.surface,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                In-stock products only
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: pulse7Colors.secondaryText }}>
                Hide unavailable gear
              </Typography>
            </Box>
            <Switch
              checked={inStockOnly}
              onChange={(event) => onInStockOnlyChange(event.target.checked)}
              inputProps={{ 'aria-label': 'In-stock products only' }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: pulse7Colors.electricLime,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  bgcolor: pulse7Colors.limeHover,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          px: 3,
          py: 2.5,
          borderTop: `1px solid ${pulse7Colors.border}`,
          bgcolor: pulse7Colors.surface,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onShowResults}
          sx={{
            minHeight: 48,
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            color: pulse7Colors.primaryText,
            bgcolor: pulse7Colors.electricLime,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: pulse7Colors.limeHover,
              boxShadow: 'none',
            },
          }}
        >
          SHOW RESULTS
        </Button>
        <Button
          variant="outlined"
          onClick={onClearAll}
          sx={{
            minHeight: 46,
            borderRadius: '8px',
            borderColor: pulse7Colors.border,
            color: pulse7Colors.primaryText,
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.04em',
          }}
        >
          CLEAR ALL
        </Button>
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
