import { colors } from './colors';
import { createMosaicTheme } from './createMosaicTheme';

export const theme = createMosaicTheme({
  palette: {
    primary: {
      main: colors.neonYellow,
    },
    secondary: {
      main: colors.vibrantTeal,
    },
    background: {
      default: colors.bluishBlack90,
      paper: colors.bluishBlack100,
    },
    text: {
      primary: colors.snowWhite80,
      secondary: colors.snowWhite,
    },
    error: {
      main: colors.secondaryRed,
    },
  },
  typography: {
    fontFamily: `'Ubuntu', sans-serif`,
    titleXL: {
      fontSize: '3.2rem',
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.125,
    },
    titleL: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.3334,
    },
    titleM: {
      fontSize: '1.8rem',
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.077,
    },
    titleS: {
      fontSize: '1.8rem',
      fontWeight: 300,
      lineHeight: 1.25,
    },
    body: {
      fontSize: '1.6rem',
      letterSpacing: '0.01786em',
      lineHeight: 1.3,
      fontWeight: 400,
    },
    bodyS: {
      fontSize: '1.4rem',
      letterSpacing: '0.0334em',
      lineHeight: 1.3,
    },
    bodyXS: {
      fontSize: '1.2rem',
      fontWeight: 300,
      lineHeight: 1.25,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '1.6rem',
          lineHeight: '2rem',
          textDecoration: 'none',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.neonYellow,
          color: colors.trueBlack,
          borderRadius: '4.7rem',
          fontSize: '1.6rem',
          fontWeight: 500,
          lineHeight: '2rem',
          padding: '1.4rem 2.8rem',
          boxShadow: 'none',
          textTransform: 'uppercase',
          transition: 'opacity 200ms 0ms ease-in',

          '&:disabled': {
            color: colors.trueBlack,
            backgroundColor: colors.neonYellow,
            opacity: 0.65,
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: colors.neonYellow,
          color: colors.neonYellow,

          '&:hover': {
            backgroundColor: colors.neonYellow,
            color: colors.trueBlack,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'transparent',

          '& .MuiSvgIcon-root': {
            fontSize: 24,
            border: `1px solid ${colors.bluish}`,
            borderRadius: '4px',
            backgroundColor: colors.bluishBlack80,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          fontWeight: 500,
          lineHeight: '2rem',
          color: colors.snowWhite,
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          titleXL: 'h1',
          titleL: 'h2',
          titleM: 'h3',
          titleS: 'h4',
          body: 'p',
          bodyS: 'p',
          bodyXS: 'p',
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          lineHeight: '2rem',
          borderRadius: '2.4rem',
          backgroundColor: colors.bluishBlack80,
          outline: 'none',
          color: colors.snowWhite,

          '&&:hover, &&:focus, &&:focus:hover': {
            backgroundColor: colors.bluishBlack80,
          },
          '&&::before, &&::after, &&:hover::before, &&:focus': {
            border: 'none',
          },
        },
        input: {
          padding: '1.4rem 1.6rem',
          fontSize: '1.6rem',
          borderRadius: '2.4rem',
          backgroundColor: colors.bluishBlack80,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          lineHeight: '2rem',
          color: colors.snowWhite,
          border: `0.1rem solid ${colors.secondaryRed}`,
          paddingRight: '3rem',
          borderRadius: '0.9rem',
          backgroundColor: colors.lightRed,
        },
      },
    },
  },
});
