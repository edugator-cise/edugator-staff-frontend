import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import AuthLayout from "components/layouts/AuthLayout";
import { EdugatorLogo } from "components/navigation/navIcons";
import ActionButton from "components/shared/Buttons/ActionButton";
import { NextPage } from "next";
import { GraduationCap, HandWaving, SignIn } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { RootState } from "lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { receiveLoginSuccess } from "state/LoginSlice";
import AdminLayout from "components/layouts/AdminLayout";
import { LocalStorage } from "lib/auth/LocalStorage";
import { Routes } from "constants/navigationRoutes";
import { ILoginSuccess, IRequestLoginAction } from "components/Login/types";
import { baseAPIURL } from "constants/config";
import apiClient from "lib/api/apiClient";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AdminHeader from "components/layouts/AdminHeader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.login);
  const router = useRouter();
  const [token, setToken] = useState(LocalStorage.getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push(Routes.Modules);
    }
  }, [token]);

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
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values: IRequestLoginAction) => {
            setLoading(true);
            try {
              const url = `${baseAPIURL}v1/auth/login`;
              const { data }: { data: ILoginSuccess } = await apiClient.post(
                url,
                values
              );
              LocalStorage.setToken(data.token);
              dispatch(receiveLoginSuccess(data));
              toast.success("Logged in successfully");
              setToken(LocalStorage.getToken());
              setLoading(false);
            } catch (e) {
              LocalStorage.checkUnauthorized(e);
              toast.error(
                "The username or password is incorrect, Please try again"
              );
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form className="w-full">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2"></div>
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
        <span
          onClick={() => router.push("/signup")}
          className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition"
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: NextPage) => (
  <AuthLayout key="login">{page}</AuthLayout>
);

export default LoginPage;
