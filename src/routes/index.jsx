import React from "react";

// routes
import { Switch } from "react-router-dom";
import MyRoute from "./MyRoute";

// pages
import Login from "../pages/Login";
import Student from "../pages/Student";
import Students from "../pages/Students";
import Photos from "../pages/Photos";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/" component={Students} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute path="*" component={NotFound} isClosed={false} />
    </Switch>
  );
}
