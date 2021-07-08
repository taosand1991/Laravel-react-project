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
    const [open, setOpen] = useState(false);

    const setOpenBar = () => {
        setOpen(!open);
    };
    console.log(open);
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
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </Fragment>
    );
}

export default Navbar;
