import { CSSProperties } from 'react';
import { Colors } from './colors';

declare module '@mui/material/styles' {
  interface Theme {
    colors: Colors;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: Colors;
  }

  interface TypographyVariants {
    titleXL: CSSProperties;
    titleL: CSSProperties;
    titleM: CSSProperties;
    titleS: CSSProperties;
    body: CSSProperties;
    bodyS: CSSProperties;
    bodyXS: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    titleXL?: CSSProperties;
    titleL?: CSSProperties;
    titleM?: CSSProperties;
    titleS?: CSSProperties;
    body?: CSSProperties;
    bodyS?: CSSProperties;
    bodyXS?: CSSProperties;
  }
}

// Update the Typography's variant prop options from figma
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    titleXL: true;
    titleL: true;
    titleM: true;
    titleS: true;
    body: true;
    bodyS: true;
    bodyXS: true;
    //
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
  }
}
