import { Field, Form, Formik } from "formik";
import { RootState } from "lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { FormTextField } from "components/shared/FormTextField";
import { receiveLoginSuccess } from "state/LoginSlice";
import AdminLayout from "components/layouts/AdminLayout";
import { LocalStorage } from "../../../lib/auth/LocalStorage";
import { Routes } from "constants/navigationRoutes";
import { ILoginSuccess, IRequestLoginAction } from "components/Login/types";
import { baseAPIURL } from "constants/config";
import apiClient from "lib/api/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminHeader from "components/layouts/AdminHeader";
//Refernce: https://github.com/creativesuraj/react-material-ui-login/blob/master/src/components/Login.tsx

export default function LoginPage(): React.ReactElement {
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
    <div className="w-full h-screen min-h-screen flex flex-col">
      <AdminHeader />
      <div className="h-full bg-nav-darkest flex items-center justify-center">
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
            <Form className="w-full max-w-md -mt-20">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-white text-3xl font-ambit">
                    Admin Login
                  </h1>
                  <p className="text-white/80 text-sm font-dm">
                    Please enter your credentials to login.
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
          )}
        </Formik>
      </div>
    </div>
  );
}
