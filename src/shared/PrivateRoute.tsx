import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { Routes } from "./Routes.constants";
import { RootState } from "../app/common/store";

interface PrivateRouteProps {
	routeProps: RouteProps;
}

//Reference: https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	...routeProps
}) => {
	const authState = useSelector((state: RootState) => state.login);
	return (
		<Route
			{...routeProps}
			render={({ location }) =>
				authState.authorizationToken ? (
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
