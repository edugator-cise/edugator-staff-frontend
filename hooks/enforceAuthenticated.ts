import { GetServerSideProps } from "next";
import { LocalStorage } from "lib/auth/LocalStorage";

/**
 * Use this custom hook to enforce authentication on a page. Used for admin routes.
 * Use in: Routes.ProblemEditor, Routes.ProblemCreator, Routes.ContentCreator, Routes.ContentEditor, Routes.Modules, Routes.Accounts, Routes.AdminCodeWithProblem
 * Usage: export const getServerSideProps = enforceAuthenticated();
 */

// defaults as a getServerSideProps wrapper that gets called on protected routes.
const enforceAuthenticated: (inner?: GetServerSideProps) => GetServerSideProps =
  (inner) => {
    return (context) => {
      //check if user is logged in via local storage
      // TODO: repalce with some async call to NextAuth to check if user is logged in
      const token = LocalStorage.getToken();

      console.log(token);

      if (!token) {
        // if not logged in, redirect to login page
        return { props: {}, redirect: { destination: "/admin/login" } };
      }

      if (inner) {
        return inner(context);
      }
      //optional return, we would use this if we wanted to pass the token or user to a page
      return { props: token };
    };
  };

export default enforceAuthenticated;
