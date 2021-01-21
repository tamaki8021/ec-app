import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getInSigenedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);
export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
