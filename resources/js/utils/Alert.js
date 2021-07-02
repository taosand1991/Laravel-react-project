import React from "react";

function Alert({ children, type }) {
    return (
        <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
        >
            <strong>{children}</strong>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
}
export default Alert;
