import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import urls from "../utils/Urls";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse,
    MDBBadge,
} from "mdb-react-ui-kit";
import authContext from "../authentication/auth";
import { Link } from "react-router-dom";

function Navbar(props) {
    const { user, userMessage } = React.useContext(authContext);
    const [open, setOpen] = useState(false);

    const setOpenBar = () => {
        setOpen(!open);
    };

    const handleNotification = (e) => {
        e.preventDefault();
        const notificationTray = document.querySelector(".notify-container");
        if (notificationTray.classList.contains("show")) {
            notificationTray.classList.remove("show");
        } else {
            notificationTray.classList.add("show");
        }
    };

    if (!user.name) return <div className="text-center">Loading....</div>;
    return (
        <Fragment>
            <MDBNavbar expand="lg" className="text-light navbar-dark bg-green">
                <MDBContainer>
                    <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>
                    <MDBNavbarToggler
                        onClick={setOpenBar}
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={open}>
                        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active
                                    aria-current="page"
                                    to="/"
                                >
                                    <i className="bi bi-house-door-fill me-2" />
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <Link className="nav-link" to="/logout">
                                    <i className="bi bi-key me-2" />
                                    Logout
                                </Link>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right className="ms-auto">
                            <MDBNavbarItem>
                                Welcome ({user.name})!
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right className="ms-auto">
                            <MDBNavbarItem className="second-list">
                                <MDBNavbarLink>
                                    <MDBIcon
                                        onClick={setOpenBar}
                                        className="position-relative"
                                        icon="bell"
                                        fas
                                        size="2x"
                                    >
                                        <span className="position-absolute top-2 start-100 translate-middle p-1 badge rounded-circle bg-danger">
                                            {user.notifications.length}
                                        </span>
                                    </MDBIcon>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className="ms-4 ms-sm-0">
                                <MDBNavbarLink onClick={handleNotification}>
                                    <MDBIcon icon="envelope" fas size="2x">
                                        <MDBBadge
                                            color="danger"
                                            notification
                                            pill
                                            className="ms-1 ms-sm-0 increase"
                                        >
                                            {userMessage && userMessage.length}
                                        </MDBBadge>
                                    </MDBIcon>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </Fragment>
    );
}

export default Navbar;
