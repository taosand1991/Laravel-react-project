import React, { useState } from "react";
import authContext from "../authentication/auth";
import * as mdb from "mdb-react-ui-kit";
import axios from "axios";
import urls from "../utils/Urls";
import * as joi from "joi-browser";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";

export default function Login({ history }) {
    const { MDBInput, MDBBtn, MDBValidation, MDBSpinner } = mdb;
    const { getUser } = React.useContext(authContext);
    const [state, setState] = useState({
        loginUser: { username: "", password: "" },
        errors: {},
        isFocused: {},
        loading: false,
    });

    // const userSchema = Joi.object({
    //     username: Joi.string().min(5).max(50).required(),
    //     password: Joi.string().required(),
    // });
    // const passwordSchema = Joi.object({
    //     password: Joi.string().required().min(6),
    // });

    const schema = {
        // username: Joi.String().min(10).required(),
        username: joi.string().email().required(),
        password: joi.string().required(),
    };

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name] };
        const { error } = joi.validate(obj, newSchema);
        return error ? error.details[0].message : null;
    };

    const handleChange = ({ target: input }) => {
        const loginDetail = { ...state.loginUser };
        const errors = { ...state.errors };
        const isFocused = { ...state.isFocused };
        const errorMessage = validateProperty(input);
        if (errorMessage) {
            const res = errorMessage.replace('"', "");
            const rey = res.replace('"', "");
            if (rey) errors[input.name] = rey;
            console.log(errors);
            loginDetail[input.name] = input.value;
            isFocused[input.name] = false;

            setState((prevState) => ({
                ...prevState,
                loginUser: loginDetail,
                errors: errors,
                isFocused,
            }));
        } else {
            loginDetail[input.name] = input.value;
            delete errors[input.name];
            isFocused[input.name] = true;
            setState((prevState) => ({
                ...prevState,
                loginUser: loginDetail,
                errors: errors,
                isFocused,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });
        const userObject = {
            email: state.loginUser.username,
            password: state.loginUser.password,
        };
        try {
            const response = await axios.post(urls.loginUrl, userObject);
            console.log(response);
            localStorage.setItem("token", response.data.user["token"]);
            setTimeout(() => {
                setState({
                    ...state,
                    loading: false,
                    loginUser: { username: "", password: "" },
                });
                // history.push("/home");
                window.location.href = "/home";
            }, 2000);
            getUser();
        } catch (error) {
            console.log(error.response.data);
            const errors = { ...state.errors };
            errors["login"] = error.response.data["message"];
            setState({ ...state, loading: false, errors });
            console.log(state.errors);
        }
    };
    const {
        loginUser: { username, password },
        errors,
        isFocused,
        loading,
    } = state;
    return (
        <div className="main-page">
            <div className="sub-page">
                <h3 className="p-3 text-center">LOGIN PAGE</h3>
                {errors.login && (
                    <Alert children={errors.login} type="danger" />
                )}
                <div className="p-4 adapt-page">
                    <MDBValidation
                        className=""
                        noValidate
                        className="w-100 needs-validation"
                        onSubmit={handleSubmit}
                    >
                        <MDBInput
                            label="Username"
                            type="text"
                            name="username"
                            className={
                                errors.username
                                    ? "is-invalid active"
                                    : isFocused.username
                                    ? "is-valid"
                                    : null
                            }
                            id="validationCustom01"
                            value={username}
                            onChange={handleChange}
                            required
                            // validation={errors.username}
                        />
                        {errors.username && (
                            <div style={{ color: "red" }}>
                                {errors.username}
                            </div>
                        )}
                        {isFocused.username && (
                            <div style={{ color: "green" }}>looks good</div>
                        )}
                        <br />
                        <MDBInput
                            label="Password"
                            type="password"
                            name="password"
                            className={
                                errors.password
                                    ? "is-invalid active"
                                    : isFocused.password
                                    ? "is-valid"
                                    : null
                            }
                            value={password}
                            onChange={handleChange}
                            id="validationCustom01"
                            required
                            // validation={errors.password}
                        />
                        {errors.password && (
                            <div style={{ color: "red" }}>
                                {errors.password}
                            </div>
                        )}
                        {isFocused.password && (
                            <div style={{ color: "green" }}>looks good</div>
                        )}
                        <br />
                        <div className="d-grid gap-2">
                            <MDBBtn
                                disabled={
                                    errors.username ||
                                    errors.password ||
                                    loading
                                }
                                type="submit"
                                color="primary"
                            >
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-4"
                                    />
                                )}
                                Log in
                            </MDBBtn>
                        </div>
                        <div className="mt-2 text-center">
                            <p>
                                Are you new ?{" "}
                                <Link to={"/register"}>create an account</Link>
                            </p>
                            <Link className="mt-2" to="/forgot">
                                forgot password?
                            </Link>
                        </div>
                    </MDBValidation>
                </div>
            </div>
        </div>
    );
}
