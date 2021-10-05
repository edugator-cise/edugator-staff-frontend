import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestLogin, resetErrorMessage } from "./LoginPage.slice";
import { IRequestLoginAction } from "./LoginPage.slice";
import { Field, Form, Formik } from "formik";
import { FormTextField } from "../../shared/FormTextField";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { Routes } from "../../shared/Routes.constants";
import { Redirect } from "react-router";
import { LocalStorage } from "../../app/common/LocalStorage";
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

export function LoginPage(): React.ReactElement {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.login);
  return LocalStorage.getToken() ? (
    <Redirect
      to={{
        pathname: Routes.Modules,
        state: { from: Routes.Login },
      }}
    />
  ) : (
    <LayoutContainer pageTitle="Admin Login">
      <Stack>
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
          onSubmit={(values: IRequestLoginAction) => {
            dispatch(requestLogin(values));
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
    </LayoutContainer>
  );
}
