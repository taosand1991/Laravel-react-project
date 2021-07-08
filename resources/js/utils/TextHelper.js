import React from "react";

const TextHelper = (error, focus, confirmEmail) => {
    if (error) return <span style={{ color: "red" }}>{error}</span>;
    else if (focus) return <span style={{ color: "green" }}>looks good</span>;
    else if (confirmEmail) return <span style={{ color: "red" }}>{confirmEmail}</span>;
};

export default TextHelper;
