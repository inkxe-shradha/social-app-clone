import React, { Component } from "react";
import {
  Grid,
  TextField,
  Typography,
  withStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Icon from "../assets/images/favicon.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, signupUser } from "../redux/action/userAction";

const style = (theme) => ({ ...theme.spreadThis });

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {},
    };
  }

  /**
   * Handle Form Submits
   * @param {object} event
   */
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  /**
   * Handle keyboard event on changes
   * @param {object} e
   */
  handleFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {

    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  render() {
    const { classes, UI : {loading} } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="App logo" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleFormSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleFieldChange}
              fullWidth
              autoFocus={true}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleFieldChange}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleFieldChange}
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleFieldChange}
              fullWidth
              helperText={errors.userhanle}
              error={errors.userhanle ? true : false}
            />
            {(errors.general || errors.error) && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general ? errors.general : "Invalid Users"}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              Already have an account ? Login  <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
    user: state.user
  }
};

const mapActionToProps = (dispatch) => ({
  signupUser : (newUser , history) => dispatch(signupUser(newUser, history)),
  logOut : () => dispatch(logOut())
});
export default connect(mapStateToProps, mapActionToProps)(withStyles(style)(Signup));