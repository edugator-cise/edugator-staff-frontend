import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import store from "lib/store/store";
import theme from "constants/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import "styles/App.module.css";
import "styles/App.css";
import "styles/index.css";
import "styles/learnStyles.css";
import "styles/TextEditorStyles.css";
import "styles/TextEditorCreationStyles.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
        <ThemeProvider theme={theme}>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};
export default App;
