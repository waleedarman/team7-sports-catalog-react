import { Box, Container, Grid } from '@mui/material';
import { useParams } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductBreadcrumbs from '../components/product-details/ProductBreadcrumbs';
import ProductGallery from '../components/product-details/ProductGallery';
import ProductInfo from '../components/product-details/ProductInfo';
import ProductSpecifications from '../components/product-details/ProductSpecifications';
import ProductNotFound from '../components/product-details/ProductNotFound';
import { getProductById } from '../data/products';

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function ProductDetailsPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <ProductNotFound />
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}>
        <Container maxWidth={false} sx={{ maxWidth: 1280, ...pagePadding }}>
          <ProductBreadcrumbs product={product} />

          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
            <Grid size={{ xs: 12, lg: 7 }}>
              <ProductGallery key={product.id} product={product} />
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <ProductInfo key={product.id} product={product} />
            </Grid>
          </Grid>

          <ProductSpecifications product={product} />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default ProductDetailsPage;
