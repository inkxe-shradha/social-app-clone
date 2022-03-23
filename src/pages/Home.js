import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Scream from "../components/Scream/Scream";
import Profile from "../components/Profile/Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScreams } from "../redux/action/dataActions";
import ScreamSkeleton from "../utils/ScreamSkeleton";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screams: null,
    };
  }

  componentDidMount() {
    // Fetch all screams
    this.props.getScreams();
  }

  render() {
    const {screams, loading} = this.props.data;
    // Recent screams markup
    const recentScreamsMarkUp = !loading ? (
      screams.map((screm, index) => {
        return <Scream key={index} scream = {screm}></Scream>;
      })
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams : PropTypes.func.isRequired,
  data : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  getScreams : () => dispatch(getScreams())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
