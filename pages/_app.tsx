import type { AppProps } from "next/app";
import { useRouter } from "next/router";
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
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
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


const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const App = ({ Component, pageProps }: Props) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles!.parentElement!.removeChild(jssStyles);
    }
  }, []);


  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ClerkProvider {...pageProps}>
      <Provider store={store}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
          <StylingProviders>
            <Toaster containerClassName="font-dm" />
            {isPublicPage ? (
              getLayout(<Component { ...pageProps } />)
            ) : (
              <>
                <SignedIn>
                  {getLayout(<Component { ...pageProps } />)}
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            )}
          </StylingProviders>
      </Provider>
    </ClerkProvider>
  );
};

const StylingProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}




export default App;
