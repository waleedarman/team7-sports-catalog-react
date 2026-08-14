import { createTheme } from '@mui/material/styles';

const pulse7Colors = {
  background: '#F9F9F7',
  surface: '#FFFFFF',
  primaryText: '#1A1C1B',
  secondaryText: '#5F625F',
  electricLime: '#CCFF00',
  limeHover: '#B8E600',
  secondaryBlue: '#0040E0',
  border: '#E3E5DF',
  footerBg: '#1A1C1B',
  error: '#BA1A1A',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: pulse7Colors.electricLime,
      dark: pulse7Colors.limeHover,
      contrastText: pulse7Colors.primaryText,
    },
    secondary: {
      main: pulse7Colors.secondaryBlue,
      contrastText: '#FFFFFF',
    },
    background: {
      default: pulse7Colors.background,
      paper: pulse7Colors.surface,
    },
    text: {
      primary: pulse7Colors.primaryText,
      secondary: pulse7Colors.secondaryText,
    },
    divider: pulse7Colors.border,
    error: {
      main: pulse7Colors.error,
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: {
      fontFamily: '"Anton", sans-serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Anton", sans-serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Anton", sans-serif',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: '"Anton", sans-serif',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: pulse7Colors.background,
          color: pulse7Colors.primaryText,
        },
      },
    },
  },
});

export { pulse7Colors };
export default theme;
