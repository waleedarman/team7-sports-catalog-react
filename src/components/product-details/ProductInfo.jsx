import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Rating,
  Snackbar,
  Typography,
} from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import { formatPrice } from '../../data/products';
import { addToCart } from '../../utils/cart';
import ProductOptions from './ProductOptions';
import QuantitySelector from './QuantitySelector';
import { pulse7Colors } from '../../theme/theme';

function getInitialColor(product) {
  return product.colorOptions?.find((option) => option.available) ?? null;
}

function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(() => getInitialColor(product));
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const requiresSize = product.sizes?.length > 0;

  const stockMessage = useMemo(() => {
    if (!product.inStock) {
      return 'Out of Stock';
    }

    return product.stockMessage || 'In Stock';
  }, [product.inStock, product.stockMessage]);

  const handleAddToCart = () => {
    if (!product.inStock) {
      setSnackbar({
        open: true,
        message: 'This product is currently out of stock.',
        severity: 'error',
      });
      return;
    }

    if (requiresSize && !selectedSize) {
      setSnackbar({
        open: true,
        message: 'Please select a size.',
        severity: 'warning',
      });
      return;
    }

    addToCart(product, {
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    });

    setSnackbar({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success',
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: { xs: 2, lg: 0 } }}>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: pulse7Colors.secondaryBlue,
          mb: 1,
        }}
      >
        {product.category}
      </Typography>

      <Typography
        component="h1"
        sx={{
          fontFamily: '"Anton", sans-serif',
          fontSize: { xs: '2.25rem', md: '3rem' },
          lineHeight: 1.05,
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Rating
          value={product.rating}
          precision={0.1}
          readOnly
          size="small"
          sx={{
            '& .MuiRating-iconFilled': {
              color: pulse7Colors.primaryText,
            },
          }}
        />
        <Typography sx={{ fontSize: '0.75rem', color: pulse7Colors.secondaryText }}>
          {product.rating} ({product.reviewCount} Reviews)
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: '"Anton", sans-serif',
          fontSize: '2rem',
          mb: 3,
        }}
      >
        {formatPrice(product.price)}
      </Typography>

      <Typography
        sx={{
          fontSize: '1rem',
          lineHeight: 1.6,
          color: pulse7Colors.secondaryText,
          mb: 3,
        }}
      >
        {product.description}
      </Typography>

      <ProductOptions
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: product.inStock ? pulse7Colors.limeHover : pulse7Colors.error,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: product.inStock
              ? pulse7Colors.secondaryText
              : pulse7Colors.error,
          }}
        >
          {stockMessage}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          alignItems: 'stretch',
          mt: 'auto',
        }}
      >
        <QuantitySelector quantity={quantity} onChange={setQuantity} />

        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartOutlined />}
          disabled={!product.inStock}
          onClick={handleAddToCart}
          sx={{
            flex: 1,
            minWidth: 180,
            py: 1.5,
            fontSize: '0.875rem',
            color: pulse7Colors.primaryText,
            '&:hover': { bgcolor: pulse7Colors.limeHover },
          }}
        >
          ADD TO CART
        </Button>

        <IconButton
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setWishlisted((prev) => !prev)}
          sx={{
            width: 56,
            height: 56,
            border: `1px solid ${pulse7Colors.primaryText}`,
            borderRadius: '6px',
            bgcolor: pulse7Colors.surface,
            flexShrink: 0,
          }}
        >
          {wishlisted ? <FavoriteOutlined color="error" /> : <FavoriteBorderOutlined />}
        </IconButton>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductInfo;
