import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.scoped.scss";

const Navbar = ({ user, location, ...rest }) => {
    const pathname = location.pathname;
    console.log(pathname);
    return (
        <AppBar>
            <Toolbar className='nav-container'>
                <Button color="inherit" component={Link} to="/" disabled={pathname === "/"}>
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/login" disabled={user.isAuthenticated || pathname === "/login"}>
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/signup" disabled={user.isAuthenticated || pathname === "/signup"}>
                    Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/logout" disabled={!user.isAuthenticated}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = state => ({ user: state.user });
export default withRouter(connect(mapStateToProps)(Navbar));

