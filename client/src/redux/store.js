// import { createStore } from "redux";
import reducer from "./reducer";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
export const store = createStore(reducer, enhancer);
