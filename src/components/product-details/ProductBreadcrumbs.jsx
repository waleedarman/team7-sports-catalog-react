import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import { Link as RouterLink } from 'react-router';
import { getCategorySlug } from '../../data/products';
import { pulse7Colors } from '../../theme/theme';

function ProductBreadcrumbs({ product }) {
  const categorySlug = getCategorySlug(product.category);

  return (
    <Breadcrumbs
      aria-label="Product breadcrumb navigation"
      separator={<NavigateNextOutlined fontSize="small" />}
      sx={{
        mb: 3,
        '& .MuiBreadcrumbs-li': {
          fontSize: '0.75rem',
          color: pulse7Colors.secondaryText,
        },
      }}
    >
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Home
      </Link>
      <Link component={RouterLink} to="/products" underline="hover" color="inherit">
        Products
      </Link>
      <Link
        component={RouterLink}
        to={`/products?category=${categorySlug}`}
        underline="hover"
        color="inherit"
      >
        {product.category}
      </Link>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: pulse7Colors.primaryText,
        }}
      >
        {product.name}
      </Typography>
    </Breadcrumbs>
  );
}

export default ProductBreadcrumbs;
