import { Box, Button } from '@mui/material';
import { CATEGORY_TABS } from '../../hooks/useProductFilters';
import { pulse7Colors } from '../../theme/theme';

const pillLabels = {
  all: 'All Gear',
  running: 'Running',
  training: 'Training',
  strength: 'Strength',
  'home-fitness': 'Home Fitness',
  recovery: 'Recovery',
  outdoor: 'Outdoor',
  'team-sports': 'Team Sports',
};

function CategoryTabs({ selectedCategory, onCategoryChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        pb: 0.5,
        mx: -0.5,
        px: 0.5,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {CATEGORY_TABS.map((tab) => {
        const isActive = selectedCategory === tab.slug;
        const label = pillLabels[tab.slug] || tab.label;

        return (
          <Button
            key={tab.slug}
            type="button"
            onClick={() => onCategoryChange(tab.slug)}
            aria-pressed={isActive}
            sx={{
              flexShrink: 0,
              px: 2.5,
              py: 1,
              minHeight: 42,
              borderRadius: '999px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: isActive ? 600 : 500,
              fontSize: '0.875rem',
              textTransform: 'none',
              letterSpacing: '0.01em',
              color: isActive ? '#FFFFFF' : pulse7Colors.primaryText,
              bgcolor: isActive ? pulse7Colors.primaryText : pulse7Colors.surface,
              border: isActive
                ? `2px solid ${pulse7Colors.electricLime}`
                : `1px solid ${pulse7Colors.border}`,
              boxShadow: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: isActive ? pulse7Colors.primaryText : pulse7Colors.background,
                borderColor: isActive
                  ? pulse7Colors.electricLime
                  : pulse7Colors.secondaryText,
                boxShadow: 'none',
              },
            }}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
}

export default CategoryTabs;
