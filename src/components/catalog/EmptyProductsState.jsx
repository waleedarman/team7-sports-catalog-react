import { Box, Button, Typography } from '@mui/material';
import { pulse7Colors } from '../../theme/theme';

function EmptyProductsState({ onClearFilters }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        px: 2,
        bgcolor: pulse7Colors.surface,
        border: `1px solid ${pulse7Colors.border}`,
        borderRadius: '16px',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Anton", sans-serif',
          fontSize: { xs: '2rem', md: '2.5rem' },
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        NO GEAR FOUND
      </Typography>
      <Typography
        sx={{
          color: pulse7Colors.secondaryText,
          fontSize: '1rem',
          mb: 4,
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        Try changing your search or clearing some filters.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onClearFilters}
        sx={{
          color: pulse7Colors.primaryText,
          px: 4,
          '&:hover': { bgcolor: pulse7Colors.limeHover },
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
}

export default EmptyProductsState;
