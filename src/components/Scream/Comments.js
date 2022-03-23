import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import { withStyles, Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20,

    }
})
class Comments extends Component {
    render() {
        const {comments, classes} = this.props;
        return (
            <Grid container>
                {comments.map((comment, inndex) => {
                    const {body, createdAt, userImage, userHandle} = comment;
                    return (
                      <Fragment key={createdAt}>
                        <Grid item sm={12}>
                          <Grid container>
                            <Grid item sm={2}>
                              <img
                                src={userImage}
                                className={classes.commentImage}
                                alt="comments"
                              />
                            </Grid>
                            <Grid item sm={9}>
                              <div className={classes.commentData}>
                                <Typography
                                  variant="h5"
                                  component={Link}
                                  to={`/users/${userHandle}`}
                                  color="primary"
                                >
                                  {userHandle}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {dayjs(createdAt).format(
                                    "h:mm a, MMMM DD YYYY"
                                  )}
                                </Typography>
                                <hr className={classes.separator} />
                                <Typography variant="body1">{body}</Typography>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        {inndex !== comments.length - 1 && (
                          <hr className={classes.visibleSeprator} />
                        )}
                      </Fragment>
                    );
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default connect()(withStyles(styles)(Comments))
