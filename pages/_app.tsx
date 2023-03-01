import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import store from "lib/store/store";
import theme from "constants/theme";
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/system";
import "styles/App.css";
import "styles/learnStyles.css";
import "styles/TextEditorStyles.css";
import "styles/TextEditorCreationStyles.css";
import "styles/ExerciseStyles.css";
import "styles/FormStyles.css";
import "styles/globals.css";
import "styles/fonts.css";
import "styles/animations.css";
import "styles/markdown.css";
import "styles/allotment.css";
import "styles/scrollbar.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles!.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <ThemeProvider enableSystem={true} attribute="class">
            <Toaster containerClassName="font-dm" />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </MUIThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};
export default App;
