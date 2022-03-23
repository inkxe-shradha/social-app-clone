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
import { loginUser } from "../redux/action/userAction";
const style = (theme) => ({ ...theme.spreadThis });

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
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
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="App logo" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              Don't have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    loginUser: (users, history) => dispatch(loginUser(users, history)),
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(Login));
