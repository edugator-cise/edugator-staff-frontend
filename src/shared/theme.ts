import { blue, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    
    background?: { default: string };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    
    
  }
}



const theme = createTheme({
  components: {
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
        }
      }
    },
  },
  typography: {
    fontFamily: "Inter",
    button: {
      textTransform: "none",
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  palette: {
    primary: {
      main: blue[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1670,
    },
  },
});

export default theme;
