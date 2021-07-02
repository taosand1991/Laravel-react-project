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
} from "mdb-react-ui-kit";
import authContext from "../authentication/auth";

function Navbar(props) {
    const { user } = React.useContext(authContext);
    if (!user.name) return <div className="text-center">Loading....</div>;
    return (
        <Fragment>
            <MDBNavbar expand="lg" className="text-light navbar-dark bg-green">
                <MDBContainer>
                    <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        // onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar>
                        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active
                                    aria-current="page"
                                    href="#"
                                >
                                    <i className="bi bi-house-door-fill me-2" />
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href="/logout">
                                    <i className="bi bi-key me-2" />
                                    Logout
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right className="ms-auto">
                            <MDBNavbarItem>
                                Welcome ({user.name})!
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </Fragment>
    );
}

export default Navbar;
