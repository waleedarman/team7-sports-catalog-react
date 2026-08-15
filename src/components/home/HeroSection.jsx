import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router';
import products from '../../data/products.json';
import homepage from '../../data/homepage.json';
import { formatPrice } from '../../data/products';
import { addToCart } from '../../utils/cart';
import { pulse7Colors } from '../../theme/theme';

const featuredProduct = products.find(
  (product) => product.id === homepage.hero.featuredProductId,
);

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function HeroSection() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(featuredProduct);
    setSnackbarOpen(true);
  };

  const handleExploreCategories = (event) => {
    // getRootNode() is the document when standalone and the shadow root when
    // mounted as <pulse7-catalog>, where document.getElementById cannot see in.
    const root = event.currentTarget.getRootNode();
    const section = root.getElementById(homepage.hero.secondaryButton.target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!featuredProduct) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10, lg: 12 },
        ...pagePadding,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1280, px: 0 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              component="span"
              sx={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: pulse7Colors.secondaryBlue,
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              {homepage.hero.label}
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3rem', md: '4.5rem', lg: '5rem' },
                lineHeight: { xs: 1.05, md: 1 },
                mb: 3,
                maxWidth: 520,
              }}
            >
              {homepage.hero.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                color: pulse7Colors.secondaryText,
                maxWidth: 420,
                mb: 4,
              }}
            >
              {homepage.hero.description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Button
                component={RouterLink}
                to={homepage.hero.primaryButton.route}
                variant="contained"
                color="primary"
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '0.875rem',
                  color: pulse7Colors.primaryText,
                  '&:hover': {
                    bgcolor: pulse7Colors.limeHover,
                  },
                }}
              >
                {homepage.hero.primaryButton.label}
              </Button>
              <Button
                variant="outlined"
                onClick={handleExploreCategories}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '0.875rem',
                  borderWidth: 2,
                  borderColor: pulse7Colors.border,
                  color: pulse7Colors.primaryText,
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: pulse7Colors.secondaryBlue,
                    bgcolor: 'transparent',
                  },
                }}
              >
                {homepage.hero.secondaryButton.label}
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: '#F4F4F2',
                aspectRatio: { xs: '1 / 1', md: '4 / 3' },
              }}
            >
              <Box
                component={RouterLink}
                to={`/products/${featuredProduct.id}`}
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  textDecoration: 'none',
                }}
              >
                <Box
                  component="img"
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'saturate(0.85)',
                    transition: 'transform 0.5s ease, filter 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      filter: 'saturate(1)',
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 16, md: 24 },
                  right: { xs: 12, sm: 16, md: 24 },
                  left: { xs: 12, sm: 'auto' },
                  bgcolor: pulse7Colors.surface,
                  border: `1px solid ${pulse7Colors.border}`,
                  borderRadius: '16px',
                  p: 2,
                  maxWidth: { xs: '100%', sm: 280 },
                  boxShadow: '0 8px 24px rgba(26, 28, 27, 0.08)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Typography
                    component={RouterLink}
                    to={`/products/${featuredProduct.id}`}
                    sx={{
                      fontFamily: '"Anton", sans-serif',
                      fontSize: '1.25rem',
                      textTransform: 'uppercase',
                      color: pulse7Colors.primaryText,
                      textDecoration: 'none',
                      lineHeight: 1.2,
                    }}
                  >
                    {featuredProduct.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: pulse7Colors.secondaryText,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatPrice(featuredProduct.price)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <StarIcon sx={{ fontSize: 16, color: pulse7Colors.electricLime }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                    {featuredProduct.rating}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {featuredProduct.tags.map((tag, index) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: index === 0 ? pulse7Colors.primaryText : '#DDE1FF',
                        color: index === 0 ? '#FFFFFF' : '#001356',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        height: 24,
                      }}
                    />
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleQuickAdd}
                  sx={{
                    bgcolor: pulse7Colors.primaryText,
                    color: '#FFFFFF',
                    py: 1.25,
                    fontSize: '0.875rem',
                    borderRadius: '4px',
                    '&:hover': {
                      bgcolor: pulse7Colors.secondaryBlue,
                    },
                  }}
                >
                  QUICK ADD
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={`${featuredProduct.name} added to cart`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default HeroSection;
