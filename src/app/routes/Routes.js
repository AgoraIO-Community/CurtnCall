import React from "react";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import AdminRoute from "./AdminRoute";
import LoadableWrapper from "../routes/LoadableWrapper";

const Routes = () => (
  <ScrollToTop>
    <Switch>
      <Route
        exact
        path="/"
        component={LoadableWrapper({
          loader: () => import("../home/HomeContainer")
        })}
      />
      <Route
        path="/cc/:channelName"
        component={LoadableWrapper({
          loader: () => import("../home/HomeContainer")
        })}
      />
      {/* <Route
        path="/login"
        component={LoadableWrapper({
          loader: () => import("../login/Login")
        })}
      /> */}
      <Route
        path="/user/:userId"
        component={LoadableWrapper({
          loader: () => import("../user/UserContainer")
        })}
      />
      <Route
        path="/performance/:performanceId"
        component={LoadableWrapper({
          loader: () => import("../performance/PerformanceContainer")
        })}
      />
      <Route
        path="/show/:showId"
        component={LoadableWrapper({
          loader: () => import("../show/ShowContainer")
        })}
      />
      <Route
        path="/stats"
        component={LoadableWrapper({
          loader: () => import("../stats/StatsContainer")
        })}
      />
      <Route
        path="/about"
        component={LoadableWrapper({
          loader: () => import("../about/About")
        })}
      />
      {/* <Route
        path="/test"
        component={LoadableWrapper({
          loader: () => import("../test/Test")
        })}
      /> */}
      {/* <Route
        path="/signup"
        component={LoadableWrapper({
          loader: () => import("../signup/Signup")
        })}
      /> */}
      <AdminRoute
        exact
        path="/admin"
        component={LoadableWrapper({
          loader: () => import("../admin/AdminContainer")
        })}
      />
      <Route
        path="/admin/:channelName"
        component={LoadableWrapper({
          loader: () => import("../admin/AdminContainer")
        })}
      />
      {/* <Route
        path="/verify-email"
        component={LoadableWrapper({
          loader: () => import("../verifyemail/VerifyEmail")
        })}
      /> */}
      <Route
        component={LoadableWrapper({
          loader: () => import("../notfound/NotFound")
        })}
      />
    </Switch>
  </ScrollToTop>
);

export default Routes;
