import React from 'react'
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CustomButton from "../../utils/CustomButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from "../../redux/action/dataActions";

const LikeButton = (props) => {
  const {screamId , user: {authenticated}} = props; 
  const likeScream = () => {
    props.likeScream(screamId);
  };
  const unlikeScream = () => {
    props.unlikeScream(screamId);
  }; 
  const likedScream = () => {
     if (
       props.user.likes &&
       props.user.likes.find(
         (like) => like.screamId === screamId
       )
     ) {
       return true;
     } else {
       return false;
     }
   };
  const likeButton = !authenticated ? (
    <Link to="/login">
        <CustomButton tip="Like">
            <FavoriteBorder color="primary" />
        </CustomButton>
    </Link>
  ) : likedScream() ? (
    <CustomButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </CustomButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => ({
  likeScream: (screamId) => dispatch(likeScream(screamId)),
  unlikeScream: (screamId) => dispatch(unlikeScream(screamId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
