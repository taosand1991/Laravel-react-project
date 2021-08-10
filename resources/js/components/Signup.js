import React, { Fragment, useState } from "react";
import * as mdb from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import * as joi from "joi-browser";
import TextHelper from "../utils/TextHelper";
import axios from "axios";
import Urls from "../utils/Urls";
import TextSecond from "../utils/TextSecond";

function Signup(props) {
    const { MDBInput, MDBBtn, MDBValidation } = mdb;
    const [state, setState] = useState({
        userData: { fullName: "", email: "", password: "", password_2: "" },
        errors: {},
        confirmEmail: "",
        isFocused: {},
        loading: false,
    });
    const schema = {
        fullName: joi.string().min(5).required().label("Full name"),
        email: joi.string().email().required(),
        password: joi.string().required(),
        password_2: joi.string().required().label("confirm password"),
    };

    const validatedProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name] };
        const { error } = joi.validate(obj, newSchema);
        return error ? error.details[0].message : null;
    };

    const handleChange = ({ target: input }) => {
        const userData = { ...state.userData };
        userData[input.name] = input.value;
        let errorMessage = validatedProperty(input);
        let errors = { ...state.errors };
        let isFocused = { ...state.isFocused };

        if (errorMessage) {
            errors[input.name] = errorMessage;
            isFocused[input.name] = false;
            setState({ ...state, userData, errors, isFocused });
        } else {
            delete errors[input.name];
            isFocused[input.name] = true;
            setState({ ...state, userData, errors, isFocused });
        }
        if (userData["password_2"] !== "" && userData["password"] !== "") {
            if (userData["password_2"] !== userData["password"]) {
                errors["confirm"] = "password do not match!!!";
                setState({ ...state, errors, userData, isFocused });
            } else {
                delete errors["confirm"];
                setState({ ...state, errors, userData, isFocused });
            }
        }
    };
    const { userData, errors, isFocused } = state;

    const disabledButton = () => {
        return (
            userData.fullName === "" ||
            userData.email === "" ||
            userData.password === "" ||
            userData.password_2 === "" ||
            errors.fullName ||
            errors.email ||
            errors.password ||
            errors.password_2
        );
    };

    const handleSubmit = async (e) => {
        const { userData } = state;
        e.preventDefault();
        const userObject = {
            name: userData.fullName.toLowerCase(),
            email: userData.email.toLowerCase(),
            password: userData.password.toLowerCase(),
            password_confirmation: userData.password_2,
        };
        setState({ ...state, loading: true, isFocused: {}, errors: {} });
        try {
            const response = await axios.post(Urls.createUser, userObject);
            localStorage.setItem("token", response.data.user["token"]);
            setTimeout(() => {
                setState({ ...state, loading: false });
                window.location.href = "/";
            }, 2000);
        } catch (e) {
            console.log(e.response.data);
            setState({ ...state, loading: false });
            const email = e.response.data["email"][0];
            if (email) {
                setState({
                    ...state,
                    confirmEmail: email,
                    isFocused: {},
                    errors: {},
                });
            } else {
                setState({ ...state, confirmEmail: {} });
            }
        }
    };

    return (
        <Fragment>
            <div className="w-50 justify-content-center m-auto mt-5 p-5 border  border-2">
                <div className="text-center">
                    <h3>Sign up your account</h3>
                </div>
                <MDBValidation
                    onSubmit={handleSubmit}
                    className="needs-validation d-flex flex-column justify-content-center"
                >
                    <div className="mb-3">
                        <MDBInput
                            name="fullName"
                            className={
                                errors.fullName
                                    ? "is-invalid active"
                                    : isFocused.fullName
                                    ? "is-valid"
                                    : null
                            }
                            value={userData.fullName}
                            onChange={handleChange}
                            label="Full name"
                            type="text"
                        />
                        {TextHelper(errors.fullName, isFocused.fullName)}
                    </div>
                    <div className="mb-3">
                        <MDBInput
                            className={
                                errors.email
                                    ? "is-invalid active"
                                    : isFocused.email
                                    ? "is-valid"
                                    : state.confirmEmail
                                    ? "is-invalid active"
                                    : null
                            }
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            label="Email"
                            type="email"
                        />
                        {TextHelper(
                            errors.email,
                            isFocused.email,
                            errors.confirmEmail
                        )}
                        {state.confirmEmail !== "" && (
                            <span style={{ color: "red" }}>
                                {state.confirmEmail}
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <MDBInput
                            className={
                                errors.password
                                    ? "is-invalid active"
                                    : isFocused.password
                                    ? "is-valid"
                                    : null
                            }
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            label="Password"
                            type="password"
                        />
                        {TextHelper(errors.password, isFocused.password)}
                    </div>
                    <div>
                        <MDBInput
                            className={
                                errors.password_2
                                    ? "is-invalid active"
                                    : isFocused.password_2
                                    ? "is-valid"
                                    : null
                            }
                            name="password_2"
                            value={userData.password_2}
                            onChange={handleChange}
                            label="Password confirmation"
                            type="password"
                        />
                        {TextHelper(errors.password_2, isFocused.password_2)}
                        {TextSecond(errors.confirm)}
                    </div>
                    <div className="d-grid gap-2 mt-2">
                        <MDBBtn
                            disabled={disabledButton()}
                            type="submit"
                            color="primary"
                        >
                            {state.loading && (
                                <span
                                    className="spinner-border spinner-border-sm me-4"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                            create user
                        </MDBBtn>
                    </div>
                    <div className="mt-3 text-center">
                        <p>
                            Already a user? <Link to="/login">sign in</Link>
                        </p>
                    </div>
                </MDBValidation>
            </div>
        </Fragment>
    );
}

export default Signup;
