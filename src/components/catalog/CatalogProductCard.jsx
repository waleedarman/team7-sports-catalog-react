import { useState } from 'react';
import { Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router';
import { formatPrice } from '../../data/products';
import { addToCart } from '../../utils/cart';
import { pulse7Colors } from '../../theme/theme';

function CatalogProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const visibleColors = product.colors.slice(0, 3);
  const extraColorCount = product.colors.length - visibleColors.length;

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <>
      <Box
        component="article"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: pulse7Colors.surface,
          border: `1px solid ${pulse7Colors.border}`,
          borderRadius: '18px',
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(26, 28, 27, 0.08)',
          },
          '&:hover .catalog-product-image': {
            transform: 'scale(1.04)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '4 / 3',
            width: '100%',
            overflow: 'hidden',
            bgcolor: '#F1F1EE',
          }}
        >
          <IconButton
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlistToggle}
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              zIndex: 2,
              width: { xs: 34, sm: 42 },
              height: { xs: 34, sm: 42 },
              bgcolor: pulse7Colors.surface,
              color: pulse7Colors.primaryText,
              boxShadow: '0 2px 8px rgba(26, 28, 27, 0.08)',
              '&:hover': {
                bgcolor: pulse7Colors.surface,
              },
            }}
          >
            {wishlisted ? (
              <FavoriteOutlined
                sx={{ fontSize: { xs: 17, sm: 20 }, color: pulse7Colors.error }}
              />
            ) : (
              <FavoriteBorderOutlined sx={{ fontSize: { xs: 17, sm: 20 } }} />
            )}
          </IconButton>

          <Box
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{ display: 'block', width: '100%', height: '100%' }}
          >
            <Box
              className="catalog-product-image"
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            p: { xs: '12px', sm: '18px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 0.75, sm: 1.5 },
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.625rem', sm: '0.75rem' },
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: pulse7Colors.secondaryBlue,
                textTransform: 'uppercase',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.category}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <StarIcon
                sx={{ fontSize: { xs: 12, sm: 14 }, color: pulse7Colors.primaryText }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: '0.6875rem', sm: '0.8125rem' },
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {product.rating}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  fontSize: '0.8125rem',
                  color: pulse7Colors.secondaryText,
                  lineHeight: 1,
                }}
              >
                ({product.reviewCount})
              </Typography>
            </Box>
          </Box>

          <Typography
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '1.0625rem', sm: '1.375rem', md: '1.5rem' },
              textTransform: 'uppercase',
              color: pulse7Colors.primaryText,
              textDecoration: 'none',
              lineHeight: 1.15,
              minHeight: { xs: '2.45rem', sm: '2.65rem' },
              mb: 1.25,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              '&:hover': {
                color: pulse7Colors.secondaryBlue,
              },
              '&:focus-visible': {
                outline: `2px solid ${pulse7Colors.secondaryBlue}`,
                outlineOffset: 2,
                borderRadius: '4px',
              },
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 0.75, sm: 2 },
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Anton", sans-serif',
                fontSize: { xs: '1.25rem', sm: '1.625rem' },
                lineHeight: 1,
                color: pulse7Colors.primaryText,
                whiteSpace: 'nowrap',
              }}
            >
              {formatPrice(product.price)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 0.625 },
                overflow: 'hidden',
              }}
            >
              {visibleColors.map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: { xs: 11, sm: 14 },
                    height: { xs: 11, sm: 14 },
                    borderRadius: '50%',
                    bgcolor: color,
                    border: `1px solid ${pulse7Colors.border}`,
                    flexShrink: 0,
                  }}
                />
              ))}
              {extraColorCount > 0 && (
                <Typography
                  sx={{
                    fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                    fontWeight: 600,
                    color: pulse7Colors.secondaryText,
                  }}
                >
                  +{extraColorCount}
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleQuickAdd}
            sx={{
              mt: 'auto',
              minHeight: { xs: 42, sm: 46 },
              px: 1,
              borderRadius: '9px',
              fontSize: { xs: '0.6875rem', sm: '0.8125rem' },
              fontWeight: 700,
              letterSpacing: { xs: '0.03em', sm: '0.06em' },
              whiteSpace: 'nowrap',
              color: pulse7Colors.primaryText,
              bgcolor: pulse7Colors.electricLime,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: pulse7Colors.limeHover,
                boxShadow: 'none',
              },
              '&:focus-visible': {
                outline: `2px solid ${pulse7Colors.secondaryBlue}`,
                outlineOffset: 2,
              },
            }}
          >
            QUICK ADD
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={`${product.name} added to cart`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default CatalogProductCard;
