import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";
import { Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import Modules from "./pages/modules/ModulesView";
import { ProblemEditorPage } from "./pages/ProblemEditorPage";

function App() {
	return (
		<div className="App">
			<Typography variant="h3" color="textSecondary">
				<Switch>
					<Route path={Routes.Login}>
						<LoginPage />
					</Route>
					<PrivateRoute routeProps={{ path: Routes.Modules }}>
						<Modules />
					</PrivateRoute>
					<PrivateRoute routeProps={{ path: Routes.ProblemEditor }}>
						<ProblemEditorPage />
					</PrivateRoute>
				</Switch>
			</Typography>
		</div>
	);
}

export default App;
