import { createTheme } from '@mui/material/styles';
import { brand, neutral } from './colors';

interface CustomRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  pill: string;
}

interface CustomGradients {
  primary: string;
}

interface CustomTokens {
  radius: CustomRadius;
  gradients: CustomGradients;
}

declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomTokens;
  }
  interface ThemeOptions {
    custom?: CustomTokens;
  }
}

const theme = createTheme({
  palette: {
    // Navy brand — μοναδική πηγή: src/styles/colors.js (brand). Δεν ξαναγράφουμε
    // αυτά τα hex αλλού· κάθε component διαβάζει theme.palette.primary.*.
    primary: {
      main: brand.main,
      dark: brand.dark,
      light: brand.light,
    },
    secondary: {
      main: '#dc004e', // Red
    },
    background: {
      default: '#F8F9FB', // Απαλό γκρι (background σελίδων)
    },
    text: {
      primary: '#1F2937', // Σκούρο γκρι (κείμενο)
      secondary: neutral.textSecondary, // Ανοιχτό γκρι (subtext)
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
  // Custom design tokens (πέρα από τα defaults του MUI), ώστε νέα components να
  // αντλούν radius/gradient από ένα σημείο αντί να τα ξαναγράφουν inline.
  custom: {
    radius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      pill: '999px',
    },
    gradients: {
      primary: `linear-gradient(135deg, ${brand.dark} 0%, ${brand.main} 100%)`,
    },
  },
});

export default theme;
