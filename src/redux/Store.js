import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import userReducers from "./reducers/userReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducers,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
);

export default store;