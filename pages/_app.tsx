import "../styles/index.css";
import "../styles/App.css";
import theme from "../src/shared/theme";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
