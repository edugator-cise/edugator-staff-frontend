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
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from "@clerk/clerk-react"
import { ThemeProvider } from "next-themes";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};


if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key"
}


const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


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
    <AuthComponent>
      <Provider store={store}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />

        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={theme}>
            <ThemeProvider enableSystem={true} attribute="class">
              <Toaster containerClassName="font-dm" />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </MUIThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </AuthComponent>
  );
};

const AuthComponent = ({ children }: { children: ReactNode}) => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
export default App;
