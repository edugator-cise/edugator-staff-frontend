import { createTheme } from "@mui/material";
import {
	ThemeProvider as MuiThemeProvider,
	StyledEngineProvider,
} from "@mui/system";
import React from "react";
import "./App.css";
import { LoginPage } from "./pages/Login/LoginPage";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import Modules from "./pages/modules/ModulesView";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";
import { ThemeProvider } from "@emotion/react";

function App() {
	const theme = createTheme();

	return (
		<StyledEngineProvider injectFirst>
			<MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					<div className="App">
						<Switch>
							<Route exact path={Routes.Login}>
								<LoginPage />
							</Route>
							<PrivateRoute exact path={Routes.ProblemEditor}>
								<ProblemEditorPage />
							</PrivateRoute>
							<PrivateRoute exact path={Routes.Modules}>
								<Modules />
							</PrivateRoute>
						</Switch>
					</div>
				</ThemeProvider>
			</MuiThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
