import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { pulse7Colors } from '../../theme/theme';

function ProductNotFound() {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1280,
        px: { xs: 2.5, md: 6, lg: 8 },
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontFamily: '"Anton", sans-serif',
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        PRODUCT NOT FOUND
      </Typography>
      <Typography
        sx={{
          color: pulse7Colors.secondaryText,
          fontSize: '1.125rem',
          maxWidth: 480,
          mx: 'auto',
          mb: 4,
          lineHeight: 1.6,
        }}
      >
        The gear you are looking for is unavailable or does not exist.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
        }}
      >
        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          color="primary"
          sx={{
            color: pulse7Colors.primaryText,
            px: 4,
            '&:hover': { bgcolor: pulse7Colors.limeHover },
          }}
        >
          BACK TO PRODUCTS
        </Button>
        <Button
          component={RouterLink}
          to="/"
          variant="outlined"
          sx={{
            borderColor: pulse7Colors.border,
            color: pulse7Colors.primaryText,
            px: 4,
          }}
        >
          GO TO HOME
        </Button>
      </Box>
    </Container>
  );
}

export default ProductNotFound;
