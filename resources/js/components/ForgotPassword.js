import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import React, { Fragment, useState } from "react";
import axios from "axios";
import Urls from "../utils/Urls";

function ForgotPassword({ history }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailObject = {
            email: email,
        };
        setLoading(true);
        try {
            const response = await axios.post(Urls.forgotPassword, emailObject);
            console.log(response);
            setTimeout(() => {
                setLoading(false);
                setMessage(response.data["status"]);
            }, 2000);
            setTimeout(() => {
                history.push("/login");
            }, 3500);
        } catch (e) {
            setLoading(false);
            console.log(e.response.data);
        }
    };
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="m-auto w-100 d-flex flex-column p-4 justify-content-center align-items-center">
                    <h3>Forgot your password</h3>
                    <small style={{ color: "green", fontWeight: "bold" }}>
                        {message}
                    </small>
                    <div className="w-75 mt-5">
                        <form onSubmit={handleSubmit} className="row">
                            <div className="col-8">
                                <MDBInput
                                    label="Email"
                                    size="md"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <MDBBtn
                                    type="submit"
                                    disabled={loading || email === ""}
                                    size="md"
                                    color="primary"
                                >
                                    {loading && (
                                        <span
                                            className="spinner-border spinner-border-sm me-4"
                                            aria-label="true"
                                            role="status"
                                        ></span>
                                    )}
                                    send email
                                </MDBBtn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ForgotPassword;
