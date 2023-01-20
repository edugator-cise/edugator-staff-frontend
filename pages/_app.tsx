import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import store from "src/app/common/store";
import theme from "src/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import "styles/App.module.css";
import "styles/App.css";
import "styles/index.css";
import "styles/learnStyles.css";
import { useEffect } from "react";

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
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
};
export default App;
