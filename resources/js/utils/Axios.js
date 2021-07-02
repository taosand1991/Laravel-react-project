import React from "react";
import * as axiosInstance from "axios";
import token from "../utils/token";

console.log(token.userToken());

// const token = localStorage.getItem("token");
const axios = axiosInstance.create({
    headers: { Authorization: `Bearer ${token.userToken()}` },
});

export default axios;
