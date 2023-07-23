import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import store from "lib/store/store";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

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
    <Provider store={store}>
      <ClerkProvider {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          <ThemeProvider
            enableSystem={true}
            disableTransitionOnChange={true}
            attribute="class"
          >
            <Toaster containerClassName="font-dm" />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
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
            </AnimatePresence>
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </Provider>
  );
};




export default App;
