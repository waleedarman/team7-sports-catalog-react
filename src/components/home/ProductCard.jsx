import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router';
import { formatPrice } from '../../data/products';
import { addToCart } from '../../utils/cart';
import { pulse7Colors } from '../../theme/theme';

function ProductCard({ product, onAddedToCart }) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    onAddedToCart(product.name);
  };

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: `1px solid rgba(26, 28, 27, 0.06)`,
        bgcolor: pulse7Colors.background,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(26, 28, 27, 0.08)',
        },
        '&:hover .product-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
        }}
      >
        <Box
          component={RouterLink}
          to={`/products/${product.id}`}
          sx={{ display: 'block', width: '100%', height: '100%' }}
        >
          <Box
            className="product-image"
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
          />
        </Box>
        <IconButton
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleWishlistToggle}
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            right: { xs: 8, sm: 12 },
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            bgcolor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.95)',
              color: pulse7Colors.error,
            },
          }}
        >
          {wishlisted ? (
            <FavoriteIcon
              sx={{ fontSize: { xs: 17, sm: 20 }, color: pulse7Colors.error }}
            />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: { xs: 17, sm: 20 } }} />
          )}
        </IconButton>
      </Box>

      <CardContent
        sx={{
          p: { xs: 1.5, sm: 3 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: { xs: 0.75, sm: 1 },
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.625rem', sm: '0.75rem' },
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: pulse7Colors.secondaryText,
              textTransform: 'uppercase',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.category}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            <StarIcon
              sx={{ fontSize: { xs: 12, sm: 14 }, color: pulse7Colors.electricLime }}
            />
            <Typography
              sx={{ fontSize: { xs: '0.6875rem', sm: '0.75rem' }, fontWeight: 500 }}
            >
              {product.rating}
            </Typography>
          </Box>
        </Box>

        <Typography
          component={RouterLink}
          to={`/products/${product.id}`}
          sx={{
            fontFamily: '"Anton", sans-serif',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            textTransform: 'uppercase',
            color: pulse7Colors.primaryText,
            textDecoration: 'none',
            mb: 1.5,
            lineHeight: 1.2,
            minHeight: { xs: '2.4rem', sm: '3rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: { xs: 0.75, sm: 1 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {formatPrice(product.price)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, overflow: 'hidden' }}>
            {product.colors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: { xs: 11, sm: 12 },
                  height: { xs: 11, sm: 12 },
                  borderRadius: '50%',
                  bgcolor: color,
                  border: `1px solid ${pulse7Colors.border}`,
                  flexShrink: 0,
                }}
              />
            ))}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleQuickAdd}
          sx={{
            mt: 'auto',
            py: { xs: 1, sm: 1.25 },
            px: 1,
            fontSize: { xs: '0.6875rem', sm: '0.875rem' },
            letterSpacing: { xs: '0.03em', sm: '0.05em' },
            whiteSpace: 'nowrap',
            color: pulse7Colors.primaryText,
            '&:hover': {
              bgcolor: pulse7Colors.limeHover,
            },
          }}
        >
          QUICK ADD
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
