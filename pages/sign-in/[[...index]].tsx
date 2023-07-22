import { Field, Form, Formik } from "formik";
import { IRequestLoginAction } from "components/Login/types";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AdminHeader from "components/layouts/AdminHeader";
import Link from "next/link";
import { NextRoutes, Routes } from "constants/navigationRoutes";
import { useSignIn } from "@clerk/clerk-react";
//Refernce: https://github.com/creativesuraj/react-material-ui-login/blob/master/src/components/Login.tsx

export default function LoginPage(): React.ReactElement {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: IRequestLoginAction) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const result = await signIn?.create({
        identifier: values.username,
        password: values.password
      });
      if (result && result.status === "complete") {
        console.log(result);
        if (setActive) {
          await setActive({session: result.createdSessionId});
        }
        toast.success("Logged in successfully");
        setLoading(false);
        router.push(Routes.Landing)
      }
      else {
          console.log(result);
          toast.error(JSON.stringify(result));
          setLoading(false);
      }
    } catch (err: any) {
      if (err && err.errors && err.errors[0].message) {
        toast.error(err.errors[0].message)
      }
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  }
  return (
    <div className="w-full h-screen min-h-screen flex flex-col">
      <AdminHeader />
      <div className="h-full bg-nav-darkest flex flex-col items-center justify-center">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="w-full max-w-md -mt-20">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <h1 className="text-white text-3xl font-ambit">
                  Sign In
                </h1>
                <p className="text-white/80 text-sm font-dm">
                  to continue to Edugator
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-white text-sm font-dm">Username</label>
                <Field
                  name="username"
                  label="Username"
                  placeholder="you@ufl.edu"
                  margin="normal"
                  fullWidth
                  required
                  className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-white text-sm font-dm">Password</label>
                <Field
                  name="password"
                  placeholder="•••••••"
                  label="Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  required
                  className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 font-dm !mt-8 h-12 hover:bg-emerald-500 transition text-white flex justify-center items-center text-sm rounded-md"
            >
              {loading ? (
                <div className="bouncing-loader py-2">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <span className="text-white">Login</span>
              )}
            </button>
          </Form>
        </Formik>
        <div className="flex flex-row space-x-2 m-2">
          <p className="text-white/80 text-md font-dm">
              No account?
          </p>
          <Link href={NextRoutes.SignUp} className="text-purple-400">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
