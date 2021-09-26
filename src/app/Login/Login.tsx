import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/store";
import { requestLogin } from "./Login.slice";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { IRequestLoginAction } from "./Login.slice";
import { Field, Form, Formik } from "formik";
import { FormTextField } from "../../shared/FormTextField";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { Routes } from "../../shared/Routes.constants";
import { Redirect } from "react-router";

//Refernce: https://github.com/creativesuraj/react-material-ui-login/blob/master/src/components/Login.tsx
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "grow",
			flexWrap: "wrap",
			alignItems: "center",
			justifyContent: "center",
			width: 400,
			margin: `${theme.spacing(0)} auto`,
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1,
		},
		header: {
			textAlign: "center",
			background: "#212121",
			color: "#fff",
		},
		card: {
			marginTop: theme.spacing(10),
		},
	})
);

export function LoginPage(): React.ReactElement {
	const classes = useStyles();
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.login);

	return authState.authorizationToken ? (
		<Redirect
			to={{
				pathname: Routes.ProblemEditor,
				state: { from: Routes.Login },
			}}
		/>
	) : (
		<LayoutContainer pageTitle="Login">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values: IRequestLoginAction) => {
					dispatch(requestLogin(values));
				}}
			>
				{() => (
					<Form className={classes.container}>
						<Card className={classes.card}>
							<CardHeader className={classes.header} title="Admin Login" />
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
								<Button
									type="submit"
									variant="contained"
									size="large"
									color="secondary"
									className={classes.loginBtn}
								>
									Submit
								</Button>
							</CardActions>
						</Card>
					</Form>
				)}
			</Formik>
		</LayoutContainer>
	);
}
