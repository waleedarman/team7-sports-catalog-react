import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { pulse7Colors } from '../../theme/theme';

const exploreLinks = [
  { label: 'Shop All', to: '/products' },
  { label: 'Performance Gear', to: '/products' },
];

const supportLinks = [
  { label: 'Order Tracking', href: '/orders' },
  { label: 'Shipping & Returns', href: '/support' },
];

const connectLinks = [{ label: 'Contact Support', href: '/support' }];

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function FooterLinkColumn({ title, links }) {
  return (
    <Box>
      <Typography
        component="h4"
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          color: pulse7Colors.electricLime,
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {links.map((link) => (
          <Box component="li" key={link.label} sx={{ mb: 1 }}>
            {link.to ? (
              <Link
                component={RouterLink}
                to={link.to}
                underline="hover"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '1rem',
                  '&:hover': { color: pulse7Colors.electricLime },
                }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                href={link.href}
                underline="hover"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '1rem',
                  '&:hover': { color: pulse7Colors.electricLime },
                }}
              >
                {link.label}
              </Link>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: pulse7Colors.footerBg,
        color: '#FFFFFF',
        py: { xs: 6, md: 10 },
        mt: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1280, ...pagePadding }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              component="p"
              sx={{
                fontFamily: '"Anton", sans-serif',
                fontSize: '2rem',
                color: '#FFFFFF',
                mb: 1.5,
                lineHeight: 1,
              }}
            >
              PULSE7
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1rem',
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              High-performance sporting gear built for every move.
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <FooterLinkColumn title="EXPLORE" links={exploreLinks} />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <FooterLinkColumn title="SUPPORT" links={supportLinks} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <FooterLinkColumn title="CONNECT" links={connectLinks} />
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 4 }} />

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.875rem',
          }}
        >
          © 2026 PULSE7. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
