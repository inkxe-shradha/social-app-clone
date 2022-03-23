import { CLEAR_ERORS, LOADING_UI, SET_ERRORS, STOP_LOADING_UI } from "../Types";

const initialState = {
  loading: false,
  errors: null,
};
const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERORS:
      console.log('Here');
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI: 
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default uiReducers;
