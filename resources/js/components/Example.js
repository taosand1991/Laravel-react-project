import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

function Example() {
    return <Main />;
}

export default Example;
import { BrowserRouter } from "react-router-dom";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
if (document.getElementById("example")) {
    ReactDOM.render(
        <BrowserRouter>
            <Example />
        </BrowserRouter>,
        document.getElementById("example")
    );
}
