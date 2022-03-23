import {
  CLEAR_ERORS,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATION_READ,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../Types";
import Axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/login", userData)
    .then((pRes) => {
      setAuthorizationHeader(pRes.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERORS });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload:
          error.response && error.response.data
            ? error.response.data
            : "Something went wrong",
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/signup", newUserData)
    .then((pRes) => {
      setAuthorizationHeader(pRes.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERORS });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload:
          error.response && error.response.data
            ? error.response.data
            : "Something went wrong",
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  Axios.get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post('/user/image', formData).then(res => {
    dispatch(getUserData());
  }).catch(error => {
    console.error('Error', error);
  })
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post('/user', userDetails).then(pRes => {
    dispatch(getUserData());
  }).catch(err => console.log('Error', err));
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  Axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const markNotificationRead = (notiicationId) => (dispatch) => {
  Axios.post("/notifications", notiicationId).then(pRes => {
    dispatch({
      type: MARK_NOTIFICATION_READ
    });
  }).catch(err => console.error(err));
}
