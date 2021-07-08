import React from "react";

const TextSecond = (confirm) => {
    if (confirm)
        return (
            <ul style={{ color: "red" }}>
                <li>{confirm}</li>
            </ul>
        );
};

export default TextSecond;
