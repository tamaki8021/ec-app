import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { UsersReducer } from "../users/reducers";
import { ProductReducer } from "../products/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      products: ProductReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
