import { Box, Container, Grid, Link, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router';
import categories from '../../data/categories.json';
import homepage from '../../data/homepage.json';
import PerformanceCategoryCard from './PerformanceCategoryCard';
import { pulse7Colors } from '../../theme/theme';

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function ShopByPerformance() {
  return (
    <Box
      component="section"
      id="shop-by-performance"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: pulse7Colors.background,
        ...pagePadding,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1280, px: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 6,
            gap: 2,
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
              lineHeight: 1,
            }}
          >
            {homepage.sections.categoriesTitle}
          </Typography>
          <Link
            component={RouterLink}
            to="/products"
            underline="none"
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              gap: 1,
              color: pulse7Colors.primaryText,
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              '&:hover': { color: pulse7Colors.secondaryBlue },
            }}
          >
            {homepage.sections.categoriesAction}
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {categories.map((category) => (
            <Grid key={category.id} size={{ xs: 6, md: 4 }}>
              <PerformanceCategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ShopByPerformance;
