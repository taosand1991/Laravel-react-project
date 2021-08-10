import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";
import ProtectedRoute from "../authentication/ProtectedRoute";
import NotFound from "./NotFound";

export default class Navigation extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <ProtectedRoute exact path="/" component={Home} />
                    <Route path="/reset" component={ResetPassword} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Signup} />
                    <Route path="/forgot" component={ForgotPassword} />
                    <Route path="/logout" component={Logout} />
                    <Route path="*" component={NotFound} />
                    <Redirect to={"/login"} />
                </Switch>
            </Fragment>
        );
    }
}
