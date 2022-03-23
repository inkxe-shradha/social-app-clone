import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Link as MULink,
  Paper,
  withStyles,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CalendarToday, KeyboardReturn, LocationOn } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import dayjs from "dayjs";
import { logOut, uploadImage } from "../../redux/action/userAction";
import EditDetails from "./EditDetails";
import CustomButton from "../../utils/CustomButton";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
const style = (theme) => ({
  paper: {
    padding: 20,
  },

  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadious: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleImageChange = (e) => {
      const image = e.target.files[0];
      // Send to the server

      const formData = new FormData();
      formData.append('image', image, image.name);
      this.props.uploadImage(formData);
  }

  handleEditPicture = () => {
      const fileInput = document.getElementById("imageInput");
      fileInput.click();
  }

  handleLogout = () => {
    this.props.logOutUser();
  }
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image"/>
              <input
                type="file"
                hidden="hidden"
                name="imageInput"
                accept=".png, .jpg, jpeg" 
                id="imageInput"
                onChange={this.handleImageChange}
              />
              <CustomButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                <EditIcon color="primary" />
              </CustomButton>
            </div>
            <hr />
            <div className="profile-details">
              <MULink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MULink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <CustomButton tip="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </CustomButton>
            <EditDetails/>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile found , Please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              color="primary"
              component={Link}
              to="/login"
              variant="contained"
            >
              Login
            </Button>
            <Button
              color="secondary"
              component={Link}
              to="/signup"
              variant="contained"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton/>
    );
    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage : PropTypes.func.isRequired,
  logOutUser : PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (formData) => dispatch(uploadImage(formData)),
  logOutUser : () => dispatch(logOut())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Profile));
