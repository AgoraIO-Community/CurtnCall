import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers.js";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import history from "./history.js";
import iotId from "./iotId.js";

const middlewares = [
  routerMiddleware(history),
  thunk
  //logger
];

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // shouldHotReload: false
      })
    : compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  {
    general: {
      iotId,
      agora: {},
      loginService: "facebook"
    }
  },
  composeEnhancers(...enhancers)
);

export default store;
