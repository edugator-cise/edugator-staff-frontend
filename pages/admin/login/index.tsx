import { Field, Form, Formik } from "formik";
import { RootState } from "lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { FormTextField } from "components/shared/FormTextField";
import { receiveLoginSuccess } from "state/LoginSlice";
import AdminLayout from "components/AdminLayout";
import { LocalStorage } from "../../../lib/auth/LocalStorage";
import { Routes } from "constants/navigationRoutes";
import { ILoginSuccess, IRequestLoginAction } from "components/Login/types";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseAPIURL } from "constants/config";
import apiClient from "lib/api/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//Refernce: https://github.com/creativesuraj/react-material-ui-login/blob/master/src/components/Login.tsx

const LoginForm = styled(Form)(
  ({ theme }) => `
  display: inline-block;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: ${theme.spacing(2)} auto;
  left: 50%;
  top: 50%;
`
);

const LoginButton = styled(Button)`
  flex-grow: 1;
`;

const LoginFormCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function LoginPage(): React.ReactElement {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.login);
  const router = useRouter();
  const [token, setToken] = useState(LocalStorage.getToken());

  useEffect(() => {
    if (token) {
      router.push(Routes.Modules);
    }
  }, [token]);

  return (
    <AdminLayout pageTitle="Admin Login">
      <Stack justifyContent="center" alignItems="center">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values: IRequestLoginAction) => {
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
            } catch (e) {
              LocalStorage.checkUnauthorized(e);
              toast.error(
                "The username or password is incorrect, Please try again"
              );
            }
          }}
        >
          {() => (
            <LoginForm>
              <LoginFormCard>
                <CardContent>
                  <div>
                    <Field
                      name="username"
                      label="Username"
                      placeholder="Username"
                      margin="normal"
                      fullWidth
                      required
                      component={FormTextField}
                    />
                  </div>
                  <div>
                    <Field
                      name="password"
                      placeholder="Password"
                      label="Password"
                      type="password"
                      margin="normal"
                      fullWidth
                      required
                      component={FormTextField}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <LoginButton
                    type="submit"
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    Submit
                  </LoginButton>
                </CardActions>
              </LoginFormCard>
            </LoginForm>
          )}
        </Formik>
      </Stack>
    </AdminLayout>
  );
}
