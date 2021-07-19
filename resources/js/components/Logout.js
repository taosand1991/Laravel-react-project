import React, { useEffect } from "react";
import axios from "../utils/Axios";
import urls from "../utils/Urls";

export default function Logout() {
    console.log("logout");
    useEffect(() => {
        logMeOut();
    }, []);
    const logMeOut = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/outer"
            );
            console.log(response);
            setTimeout(() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }, 1500);
        } catch (e) {
            console.log(e.response.data);
        }
        // axios
        //     .get(urls.userLog)
        //     .then((response) => {
        //         console.log(response);
        //         console.log("i find it");
        //         // localStorage.removeItem("token");
        //         // setTimeout(() => {
        //         //     window.location.href = "/login";
        //         // }, 2000);
        //     })
        //     .catch((e) => {
        //         console.log(e.response.data);
        //     });
    };

    return <div className="container"></div>;
}
