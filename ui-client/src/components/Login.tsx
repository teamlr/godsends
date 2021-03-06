import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import "./Login.scoped.scss";

interface Props {
    user: any,
    history: any;
    loginUser: (userData: any, history: any) => void;
}

export class Login extends Component<Props> {
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    state = {
        email: "",
        password: ""
    };

    render() {
        const { user: { authenticating, authErrors } } = this.props;
        const errorMessages =
            authErrors && authErrors['general'] ? authErrors['general'] : null;

        return (
            <Grid container className="form">
                <Grid item sm></Grid>
                <Grid item sm>
                    <img
                        src="/images/monkey.png"
                        alt="Monkey"
                        className="image"
                    />
                    <Typography variant="h2">Login</Typography>
                    {errorMessages && (
                        <Typography
                            variant="body2"
                            color="error"
                            component={"div"}
                        >
                            <div>{errorMessages}</div>
                        </Typography>
                    )}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="text-field"
                            required={true}
                            fullWidth
                        ></TextField>
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="text-field"
                            required={true}
                            fullWidth
                        ></TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20, position: "relative" }}
                            disabled={authenticating}
                        >
                            LOGIN
                            {authenticating && (
                                <CircularProgress
                                    size={30}
                                    className="progress"
                                ></CircularProgress>
                            )}
                        </Button>
                        <br />
                        <small>
                            Don't have an account? Sign up
                            <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
