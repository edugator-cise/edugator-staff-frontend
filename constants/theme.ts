import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

//for custom theme overrides
declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
  interface PaletteOptions {}
}

let theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          "@media (min-width: 900px)": {
            maxWidth: "100%",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        sizeLarge: {
          height: 50,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 9,
        },
        text: {
          color: "black",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: 8,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: "auto",
          borderLeft: `6px solid ${blue[500]}`,
          backgroundColor: blue[50],
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          height: "auto",
          borderLeft: `6px solid ${blue[200]}`,
          borderBottom: `1px solid ${grey[300]}`,
          backgroundColor: grey[50],
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: 200,
      color: "red",
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  palette: {
    primary: {
      main: blue[500],
      light: blue[100],
      dark: "#142F73",
    },
    secondary: {
      main: "#3A4F58",
      light: "#fff",
      dark: "#3966ad",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1700,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
