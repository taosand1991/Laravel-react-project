import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { Fragment, useState, useEffect } from "react";
import Urls from "../utils/Urls";

function ResetPassword(props) {
    const [state, setState] = useState({
        password: "",
        password_2: "",
        token: "",
        email: "",
        loading: false,
        error: "",
        message: "",
    });
    useEffect(() => {
        console.log(props);
        const token = new URLSearchParams(props.location.search).get("token");
        const email = new URLSearchParams(props.location.search).get("email");
        setState({ ...state, token, email });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tokenObject = {
            password: state.password,
            password_confirmation: state.password_2,
            token: state.token,
            email: state.email,
        };
        setState({ ...state, loading: true });
        try {
            const response = await axios.post(Urls.resetPassword, tokenObject);
            console.log(response);
            setTimeout(() => {
                setState({
                    ...state,
                    loading: false,
                    message: response.data["status"],
                });
            }, 2000);
            setTimeout(() => {
                props.history.push("/login");
            }, 4000);
        } catch (e) {
            setState({ ...state, loading: false });
            console.log(e.response.data);
        }
    };

    const handlePassword = (e) => {
        setState({ ...state, password: e.target.value });
    };

    const handlePasswordConfirm = (e) => {
        const password = e.target.value;
        if (state.password !== "") {
            let error;
            if (password !== state.password) error = "password does not match";
            else error = "";
            setState({ ...state, password_2: password, error });
        }
    };
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="text-center mt-3 mb-3 w-50 m-auto">
                    <form onSubmit={handleSubmit} className="form-outline">
                        <h4>Reset Password</h4>
                        <small style={{ color: "green", marginTop: "5px" }}>
                            {state.message}
                        </small>
                        <div className="mb-3">
                            <MDBInput
                                label="Password"
                                size="md"
                                type="password"
                                value={state.password}
                                onChange={handlePassword}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBInput
                                label="confirm password"
                                size="md"
                                type="password"
                                value={state.password_2}
                                onChange={handlePasswordConfirm}
                            />
                            <span style={{ color: "red" }}>{state.error}</span>
                        </div>
                        <div className="d-grid gap-2">
                            <MDBBtn
                                disabled={
                                    state.loading ||
                                    state.password === "" ||
                                    state.password_2 === ""
                                }
                                type="submit"
                                color="primary"
                            >
                                {state.loading && (
                                    <span
                                        className="spinner-border spinner-border-sm me-4"
                                        role="status"
                                        aria-label="true"
                                    ></span>
                                )}
                                save changes
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default ResetPassword;
