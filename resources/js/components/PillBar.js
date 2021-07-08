import React, { useState } from "react";

function PillBar({ setPill, page }) {
    const changePage = (page, e) => {
        e.preventDefault();
        setPill(page);
    };
    return (
        <div className="text-center text-sm-right container-fluid p-3 w-auto ">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        onClick={(e) => changePage("article", e)}
                        className={
                            page === "article" ? "nav-link active" : "nav-link"
                        }
                        aria-current="page"
                        href="#"
                    >
                        Article Lists
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        onClick={(e) => changePage("create", e)}
                        className={
                            page === "create" ? "nav-link active" : "nav-link"
                        }
                        href="#"
                    >
                        Create post
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Link
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default PillBar;
