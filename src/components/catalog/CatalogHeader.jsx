import { Box, Container, Typography } from '@mui/material';
import { pulse7Colors } from '../../theme/theme';

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function CatalogHeader() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: pulse7Colors.background,
        borderBottom: `1px solid ${pulse7Colors.border}`,
        py: { xs: 5, md: 7 },
        ...pagePadding,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1280, px: 0 }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Anton", sans-serif',
            fontSize: { xs: '2.75rem', md: '3.75rem', lg: '4.5rem' },
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: pulse7Colors.primaryText,
            mb: 2,
            maxWidth: 720,
          }}
        >
          PERFORMANCE GEAR
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.7,
            color: pulse7Colors.secondaryText,
            maxWidth: 680,
          }}
        >
          Explore high-performance equipment engineered for training, running,
          recovery, outdoor activities, home fitness, and team sports.
        </Typography>
      </Container>
    </Box>
  );
}

export default CatalogHeader;
