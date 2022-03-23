import Axios from "axios";
import {
  DELETE_SCREAM,
  LIKE_SCREAM,
  LOADING_DATA,
  LOADING_UI,
  SET_SCREAMS,
  UNLIKE_SCREAM,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENTS,
} from "../Types";

// Get all the screams from api
export const getScreams = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  Axios.get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete screams
export const deleteScream = (screamId) => (dispatch) => {
  Axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => console.error("Error", err));
};

// Post a Scream
export const postScream = (scream) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  Axios.post("/scream", scream)
    .then((pres) => {
      dispatch({
        type: POST_SCREAM,
        payload: pres.data,
      });
      dispatch({
        type: CLEAR_ERORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Clear errors

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERORS,
  });
};

// Get single scream

export const getScream = (screamId) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.get(`/scream/${screamId}`)
    .then((pRes) => {
      dispatch({
        type: SET_SCREAM,
        payload: pRes.data,
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
// Submitting a comments
export const submitComments = (screamId, commentData) => (dispatch) => {
  Axios.post(`/scream/${screamId}/comment`, commentData)
    .then((pRes) => {
      dispatch({
        type: SUBMIT_COMMENTS,
        payload: pRes.data,
      });
      dispatch(clearErrors());
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Get single user details
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  Axios.get(`/user/${userHandle}`)
    .then((pRes) => {
      dispatch({
        type: SET_SCREAMS,
        payload: pRes.data.sceams,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAM,
        payload: null,
      });
    });
};
