import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Routes } from "./Routes.constants";
import { RootState } from "../app/common/store";

interface PrivateRouteProps {
	ChildComponent: React.ReactNode;
	routerProps: RouteProps;
}

export function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
	const { ChildComponent, routerProps } = props;
	const authState = useSelector((state: RootState) => state.login);
	return (
		<Route
			{...routerProps}
			render={({ location }) =>
				authState.authorizationToken ? (
					ChildComponent
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
}

export default connect(PrivateRoute);
