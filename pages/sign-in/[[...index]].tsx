import AuthLayout from "components/layouts/AuthLayout";
import ActionButton from "components/shared/Buttons/ActionButton";
import { NextPage } from "next";
import { HandWaving } from "phosphor-react";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Routes } from "constants/navigationRoutes";
import { IRequestLoginAction } from "components/Login/types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSignIn } from "@clerk/clerk-react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSubmit = async (values: IRequestLoginAction) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const result = await signIn?.create({
        identifier: values.email,
        password: values.password,
      });
      if (result && result.status === "complete") {
        console.log(result);
        if (setActive) {
          await setActive({ session: result.createdSessionId });
        }
        toast.success("Logged in successfully");
        setLoading(false);
        router.push(Routes.Landing);
      } else {
        console.log(result);
        toast.error(JSON.stringify(result));
        setLoading(false);
      }
    } catch (err: any) {
      if (err && err.errors && err.errors[0].message) {
        toast.error(err.errors[0].message);
      }
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="w-[95vw] max-w-[550px] p-8 rounded-lg">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col items-center space-y-2">
          <HandWaving size={36} className="text-white !mb-2" weight="duotone" />
          <h1 className="text-white text-3xl font-semibold font-ambit">
            Welcome Back!
          </h1>
          <p className="text-white/80 text-sm font-dm">
            Please enter your credentials to login.
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="w-full">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2"></div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Email</label>
                  <Field
                    name="email"
                    label="Email"
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
              <ActionButton
                color="green"
                type="submit"
                containerClassName="w-full !mt-8 mx-auto"
                className="flex justify-center py-[10px] px-4"
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
              </ActionButton>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span className="text-white/80 text-sm font-dm">
          Don't have an account?&nbsp;
        </span>
        <Link href="/sign-up">
          <span className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: NextPage) => (
  <AuthLayout key="login">{page}</AuthLayout>
);

export default LoginPage;
