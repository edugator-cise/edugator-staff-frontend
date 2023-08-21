import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import store from "lib/store/store";
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
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const publicPages = [
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/verify",
  "/",
];

const App = ({ Component, pageProps }: Props) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <Provider store={store}>
      <TooltipProvider>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
        <ClerkProvider
          {...pageProps}
          appearance={{
            variables: {
              colorPrimary: "#3b82f6",
            },
            userButton: {
              elements: {
                userPreview: "border-b px-2 pb-4 pt-2",
              },
            },
            elements: {
              card: "p-2 font-dm rounded-lg shadow-lg border border-slate-200",
              userButtonPopoverActionButton:
                "py-0 px-2 hover:bg-slate-100 text-slate-600",
              userButtonPopoverFooter: "hidden",
              userButtonPopoverActionButtonIconBox: "hidden",
              profilePage: "p-0",
              navbar: "!p-0 !pr-6",
              pageScrollBox: "p-0 !pl-6",
              headerTitle: "text-xl",
              headerSubtitle: "text-sm",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
            <ThemeProvider
              enableSystem={true}
              disableTransitionOnChange={true}
              attribute="class"
            >
              <Toaster containerClassName="font-dm" />
              {pathname === "/" ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <AnimatePresence
                  exitBeforeEnter
                  initial={false}
                  onExitComplete={() => window.scrollTo(0, 0)}
                >
                  {isPublicPage ? (
                    <>
                      <SignedOut>
                        {getLayout(<Component {...pageProps} />)}
                      </SignedOut>
                      <SignedIn>
                        <RedirectToCoursesPage />
                      </SignedIn>
                    </>
                  ) : (
                    <>
                      <SignedIn>
                        {getLayout(<Component {...pageProps} />)}
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  )}
                </AnimatePresence>
              )}
            </ThemeProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </TooltipProvider>
    </Provider>
  );
};

const RedirectToSignInPage = () => {
  useEffect(() => {
    window.location.href = "/sign-in";
  }, []);

  return null;
};

const RedirectToCoursesPage = () => {
  useEffect(() => {
    window.location.href = "/courses";
  }, []);

  return null;
};

export default App;
