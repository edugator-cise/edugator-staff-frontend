import React from "react";
import { RouteProps } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { LocalStorage } from "../app/common/LocalStorage";
import { Routes } from "./Routes.constants";

//Reference: https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        LocalStorage.getToken() ? (
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
