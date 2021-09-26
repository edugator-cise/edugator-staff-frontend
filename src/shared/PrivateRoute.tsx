import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Routes } from "./Routes.constants";
import { jwtToken } from "./constants";

//Reference: https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	return (
		<Route
			{...props}
			render={({ location }) =>
				localStorage.getItem(jwtToken) ? (
					children
				) : (
					<Redirect
						to={{
							pathname: Routes.Login,
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
