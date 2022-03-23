import React, { Component, Fragment } from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CustomButton from '../../utils/CustomButton';
import HomeIcon from '@material-ui/icons/Home';
import PostScream from '../Scream/PostScream';
import NotificationComponent from './NotificationComponent';
export class Navbar extends Component {
    render() {
      const {authenticated} = this.props;
        return (
          <AppBar>
            <Toolbar className="nav-container">
              {authenticated ? (
                <Fragment>
                  <PostScream/>
                  <Link to='/'>
                    <CustomButton tip="Home">
                      <HomeIcon color="primary"></HomeIcon>
                    </CustomButton>
                  </Link>
                  <NotificationComponent/>
                </Fragment>
              )  : (
                <Fragment>
                  <Button color="inherit" component={Link} to="/">
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        );
    }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated : state.user.authenticated
})
export default connect(mapStateToProps)(Navbar)
