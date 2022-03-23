import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { clearErrors, submitComments } from "../../redux/action/dataActions";

const styles = (themes) => ({
  ...themes.spreadThis,
});
const CommentFrom = (props) => {
  const [body, setBody] = useState("");
  const [error, setErrors] = useState({});
  const { classes, authenticated, submitComments, screamId, UI: {errors, loading}, clearErrors } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    submitComments(screamId, {body})
    setBody("");
  };
  useEffect(() => {
   if (errors) {
     setErrors(errors);
   }
   if (!errors && !loading) {
     setErrors("");
     setBody("");
   }
  }, [clearErrors, errors, loading]);
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          id="body"
          label="Comment on scream"
          type="text"
          error={error.error ? true : false}
          helperText={error.error}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator}/>
    </Grid>
  ) : null;
  return commentFormMarkup;
};
CommentFrom.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  submitComments: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  submitComments: (screamId, comments) =>
    dispatch(submitComments(screamId, comments)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentFrom));
