import React from "react";
import { Route, Redirect } from "react-router-dom";
import token from "../utils/token";

function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <div>
            <Route
                {...rest}
                render={(props) => {
                    if (token.userToken()) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect to={"/login"} />;
                    }
                }}
            />
        </div>
    );
}

export default ProtectedRoute;
