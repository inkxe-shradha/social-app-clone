import React from 'react'
import { Paper, withStyles } from '@material-ui/core';
import { CalendarToday, LocationOn } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import NoImg from "../assets/images/no-image.jpg";
import PropTypes from "prop-types";
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
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
});
const ProfileSkeleton = (props) => {
    const {classes} = props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="Profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <div className={classes.handle} />
            <hr />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <hr/>
            <LocationOn color="primary"/>
            <span>Location</span>
            <LinkIcon color="primary" />
            <span>https://wwww.website.com</span>
            <hr/>
            <CalendarToday color="primary"/>
            Joined date
          </div>
        </div>
      </Paper>
    );
}
ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(style)(ProfileSkeleton)
