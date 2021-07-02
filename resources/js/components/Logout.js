import React from "react";

export default function Logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return <div className="container"></div>;
}
