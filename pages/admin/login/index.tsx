import { Field, Form, Formik } from "formik";
import { ReactNode } from "react";
import { RootState } from "src/app/common/store";
import { FormTextField } from "src/shared/FormTextField";
import { LayoutContainer } from "src/shared/LayoutContainer";
import { LocalStorage } from "src/app/common/LocalStorage";
import { Routes } from "src/shared/Routes.constants";
import { ILoginSuccess, IRequestLoginAction } from "src/pages/Login/types";
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
import { AdminLayout } from "components/AdminLayout";
import { baseAPIURL } from "src/shared/constants";
import { AxiosResponse } from "axios";
import apiClient from "src/app/common/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { receiveLoginFailure, resetErrorMessage, receiveLoginSuccess } from "src/pages/Login/LoginPage.slice";
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

export function LoginPage(): React.ReactElement | Response {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.login);
  
  return LocalStorage.getToken() ? (
    new Response("", {
      status: 302,
      headers: {
        Location: Routes.Modules
      }
    })
  ) : (
  <Stack justifyContent="center" alignItems="center">
    {authState.isLoading && <CircularProgress />}
    {authState.errorMessage && (
      <Alert
        severity="error"
        onClose={() => {
          dispatch(resetErrorMessage());
        }}
      >
        {authState.errorMessage}
      </Alert>
    )}
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values: IRequestLoginAction) => {
        try {
          const url = `${baseAPIURL}v1/auth/login`;
          const { data }: AxiosResponse<ILoginSuccess> = await apiClient.post(url, values);
          dispatch(receiveLoginSuccess(data));
        } catch (e) {
          LocalStorage.checkUnauthorized(e);
          dispatch(receiveLoginFailure("The username or password is incorrect. Please try again."
          ));
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
);
}

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout pageTitle="Admin Login">{page}</AdminLayout>
}
