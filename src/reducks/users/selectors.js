import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

//更新された値のデータをとる処理
export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getInSigenedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getProductInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
