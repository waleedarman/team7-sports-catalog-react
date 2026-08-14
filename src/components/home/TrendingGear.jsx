import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router';
import products from '../../data/products.json';
import homepage from '../../data/homepage.json';
import ProductCard from './ProductCard';
import { pulse7Colors } from '../../theme/theme';

const trendingProducts = products.filter((product) => product.trending);

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function TrendingGear() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddedToCart = (productName) => {
    setSnackbarMessage(`${productName} added to cart`);
    setSnackbarOpen(true);
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: pulse7Colors.surface,
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
            {homepage.sections.trendingTitle}
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
            {homepage.sections.trendingAction}
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {trendingProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 6, lg: 3 }}>
              <ProductCard product={product} onAddedToCart={handleAddedToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default TrendingGear;
