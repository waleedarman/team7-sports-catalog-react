import { useState, useSyncExternalStore } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink, useLocation } from 'react-router';
import { pulse7Colors } from '../../theme/theme';
import { getSharedCartCount, subscribeSharedCart } from '../../mfe/cartBridge';

const desktopNavLinks = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/products' },
];

const mobileDrawerLinks = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/products' },
  { label: 'WISHLIST', to: '/wishlist' },
  { label: 'SIGN IN', to: '/login' },
];

const pagePadding = {
  px: { xs: 2.5, md: 6, lg: 8 },
};

function getNavLinkStyles(isActive) {
  return {
    color: isActive ? pulse7Colors.primaryText : pulse7Colors.secondaryText,
    fontWeight: isActive ? 700 : 600,
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    px: 1.5,
    py: 1,
    borderRadius: 0,
    borderBottom: isActive
      ? `2px solid ${pulse7Colors.electricLime}`
      : '2px solid transparent',
    transition: 'color 0.2s ease, border-color 0.2s ease',
    '&:hover': {
      color: pulse7Colors.primaryText,
      bgcolor: 'transparent',
    },
  };
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Fed by `cart:changed` (and the cross-tab `storage` event) through
  // connectSharedCart() in App.jsx — never read from localStorage here.
  const cartCount = useSyncExternalStore(
    subscribeSharedCart,
    getSharedCartCount,
    () => 0,
  );

  const isHomeActive = pathname === '/';
  const isShopActive =
    pathname === '/products' || pathname.startsWith('/products/');

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Typography
        component={RouterLink}
        to="/"
        sx={{
          fontFamily: '"Anton", sans-serif',
          fontSize: '2rem',
          fontStyle: 'italic',
          color: pulse7Colors.primaryText,
          textDecoration: 'none',
          display: 'block',
          mb: 2,
        }}
      >
        PULSE7
      </Typography>
      <List>
        {mobileDrawerLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={RouterLink} to={item.to}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontSize: '0.875rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: pulse7Colors.surface,
          color: pulse7Colors.primaryText,
          borderBottom: `1px solid ${pulse7Colors.border}`,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1280, ...pagePadding }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
              <IconButton
                color="inherit"
                aria-label="Open navigation menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuOutlined />
              </IconButton>
              <Typography
                component={RouterLink}
                to="/"
                sx={{
                  fontFamily: '"Anton", sans-serif',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontStyle: 'italic',
                  color: pulse7Colors.primaryText,
                  textDecoration: 'none',
                  lineHeight: 1,
                }}
              >
                PULSE7
              </Typography>
            </Box>

            <Box
              component="nav"
              aria-label="Main navigation"
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 2,
                alignItems: 'center',
              }}
            >
              {desktopNavLinks.map((item) => {
                const isActive =
                  item.label === 'HOME' ? isHomeActive : isShopActive;

                return (
                  <Link
                    key={item.label}
                    component={RouterLink}
                    to={item.to}
                    underline="none"
                    sx={getNavLinkStyles(isActive)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
              <IconButton
                component={RouterLink}
                to="/products"
                aria-label="Search products"
                color="inherit"
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                <SearchOutlined />
              </IconButton>
              <IconButton
                component={RouterLink}
                to="/wishlist"
                aria-label="Wishlist"
                color="inherit"
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                <FavoriteBorderOutlined />
              </IconButton>
              <IconButton
                component={RouterLink}
                to="/cart"
                aria-label="Shopping cart"
                color="inherit"
              >
                <Badge
                  badgeContent={cartCount}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: pulse7Colors.electricLime,
                      color: pulse7Colors.primaryText,
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '0.625rem',
                    },
                  }}
                >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>

              {/* Replace Sign In with the account menu after authentication integration. */}
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{
                  ml: { md: 0.5 },
                  minHeight: 36,
                  px: { xs: 1.5, sm: 2, md: 2.5 },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '0.625rem', sm: '0.75rem' },
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: pulse7Colors.primaryText,
                  bgcolor: pulse7Colors.surface,
                  borderColor: pulse7Colors.primaryText,
                  borderWidth: 1.5,
                  borderRadius: '6px',
                  boxShadow: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: pulse7Colors.electricLime,
                    borderColor: pulse7Colors.primaryText,
                    boxShadow: 'none',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
