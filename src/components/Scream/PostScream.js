import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles,
} from "@material-ui/core";
import { clearErrors, postScream } from "../../redux/action/dataActions";
import CustomButton from "../../utils/CustomButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    textAlign: "right",
    float: "right",
    marginTop: "10px"
  },
  progressSpinerClass: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "9%   ",
  },
});
class PostScream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      body: "",
      errors: {
        body: ''
      },
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.body) {
      this.setState({
        errors: {
          body: ''
        }
      })
      this.props.postScream({body: this.state.body});
    } else {
      this.setState({
        errors: {
          body: 'Body must not be empty'
        }
      })
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }

    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        errors: {
          body: ''
        },
        open: false 
      });
    }
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <CustomButton tip="Post a scream" onClick={this.handleOpen}>
          <AddIcon color="primary"></AddIcon>
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                rows="3"
                placeholder="Scream at your fellow apps"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinerClass}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostScream.propTypes = {
  UI: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapDispatchToProps = (dispatch) => ({
  postScream: (newScream) => dispatch(postScream(newScream)),
  clearErrors: () => dispatch(clearErrors())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostScream));
