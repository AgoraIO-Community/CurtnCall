import React from "react";
import { Route } from "react-router-dom";

const RouteWithProps = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => React.createElement(component, { ...rest, ...props })}
  />
);

export default RouteWithProps;
