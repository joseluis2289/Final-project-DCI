// import { createStore } from "redux";
import reducer from "./reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
