import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';
const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    authenticated : state.user.authenticated
  };
}
export default connect(mapStateToProps)(AuthRoute);