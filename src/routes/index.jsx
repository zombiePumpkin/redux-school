import React from "react";

// routes
import { Switch } from "react-router-dom";
import MyRoute from "./MyRoute";

// pages
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/login" component={Login} />
      <MyRoute path="*" component={NotFound} />
    </Switch>
  );
}
