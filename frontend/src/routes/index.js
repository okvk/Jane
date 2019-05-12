import React from "react";
import { Route } from "react-router-dom";
import { routes } from "./routes";

const RouteWrapper = route => (
  <Route
    exact
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const AppRoutes = routes.map((route, i) => <RouteWrapper key={i} {...route} />);

export default AppRoutes;
