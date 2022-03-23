import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
    Button,
  Dialog,
    DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/action/userAction";
import EditIcon from "@material-ui/icons/Edit";
import CustomButton from "../../utils/CustomButton";
const style = (theme) => ({
  ...theme.spreadThis,
  button : {
      float: 'right'
  }
});
class EditDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: "",
      website: "",
      location: "",
      open: false,
    };
  }

  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleChange =(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }
  mapUserDetailsToState(credentials) {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleSubmit = () => {
      const userDetails = {
          bio: this.state.bio,
          website: this.state.website,
          location: this.state.location,
      };
      this.props.editUserDetails(userDetails);
      this.handleClose();
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CustomButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
            <EditIcon color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about your self"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/porofessional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />

             <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                  Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                  Save
              </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});
const mapDispatchToProps = (dispatch) => ({
  editUserDetails: (userDetails) => dispatch(editUserDetails(userDetails)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(EditDetails));
