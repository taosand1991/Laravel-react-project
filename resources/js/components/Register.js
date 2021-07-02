import React, { Fragment } from "react";

function Register(props) {
    return (
        <Fragment>
            <div className="vh-100 d-flex flex-column  justify-content-center align-items-center">
                <div className="form-group">
                    <input
                        className="form-control mb-2"
                        placeholder="username"
                        type="text"
                    />
                    <input
                        className="form-control mb-2"
                        placeholder="username"
                        type="password"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
