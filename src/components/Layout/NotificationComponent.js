import React, { Component, Fragment } from "react";
import Notifications from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { markNotificationRead } from "../../redux/action/userAction";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
class NotificationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  onMenuOpen = () => {
    let unReadNotificationIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationsId);
    this.props.markNotificationRead(unReadNotificationIds);
  };
  render() {
    const { notifications } = this.props;
    dayjs.extend(relativeTime);
    let notificationIcons;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationIcons = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <Notifications />
            </Badge>
          ))
        : (notificationIcons = <Notifications color="primary" />);
    } else {
      notificationIcons = <Notifications color="primary" />;
    }
    let notificationMarkUp =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "Liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} Your sream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet.
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Icon button">
          <IconButton
            aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcons}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpen}
        >
          {notificationMarkUp}
        </Menu>
      </Fragment>
    );
  }
}
NotificationComponent.propTypes = {
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});
const mapDispatchToProps = (dispatch) => ({
  markNotificationRead: (notificationId) =>
    dispatch(markNotificationRead(notificationId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);
