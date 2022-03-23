import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, withStyles } from "@material-ui/core";
import { getUserData } from "../redux/action/dataActions";
import Axios from "axios";
import Scream from "../components/Scream/Scream";
import StaticProfile from "../components/Profile/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

const styles = (themes) => ({
  ...themes.spreadThis,
});
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      screamIdParam: "",
    };
  }

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) {
      this.setState({
        screamIdParam: screamId,
      });
    }
    this.props.getUserData(handle);
    Axios.get(`/user/${handle}`)
      .then((pRes) => {
        this.setState({
          profile: pRes.data.user,
        });
      })
      .catch((error) => console.error("Error", error));
  }
  render() {
    const { screams, loading } = this.props.data;
    const {screamIdParam} = this.state;
    const screamsmarkUp = loading ? (
      <ScreamSkeleton/>
    ) : screams === null ? (
      <p>No screams from this user.</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
        screams.map(scream => {
            if (scream.screamId !== screamIdParam) {
                return <Scream key={scream.screamId} scream={scream} />;
            } else {
                return <Scream key={scream.screamId} scream={scream} openDialog={true}/>;
            }
        })
    );
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {screamsmarkUp}
          </Grid>
          <Grid item sm={4} xs={12}>
            {this.state.profile === null ? (
              <ProfileSkeleton/>
            ) : (
              <StaticProfile profile={this.state.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

User.propsTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: (userHandle) => dispatch(getUserData(userHandle)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User));
