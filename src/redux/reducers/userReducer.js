import {
  CLEAR_ERORS,
  LIKE_SCREAM,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATION_READ,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
  UNLIKE_SCREAM,
} from "../Types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

      case SET_USER:
        return {
          authenticated: true,
            loading: false,
            ...action.payload,
        };

      case LOADING_USER:
        return {
          ...state,
          loading: true,
        };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials,
            screamId: action.payload.screamId
          }
        ]
      }
      case UNLIKE_SCREAM:
        return {
          ...state,
          likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
        }
      case MARK_NOTIFICATION_READ: 
        state.notifications.forEach(not => not.read = true);
        return {
          ...state
        }
        default:
          return state;
  }
};

export default userReducers;