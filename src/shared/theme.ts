import { blue, blueGrey } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles" {
  interface Theme {
    
    background?: { default: string };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    
    
  }
}

const theme = createTheme({
  
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      sizeLarge: {
        height: 50,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 9,
      },
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
