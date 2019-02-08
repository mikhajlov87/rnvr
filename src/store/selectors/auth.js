// Modules
import { createSelector } from 'reselect';
import { get } from 'immutable';

function authStoreSelector(state) {
  return state.auth;
}

export const uidSelector = createSelector(
  authStoreSelector,
  function(authState) {
    return get(authState, 'uid');
  }
);

export const isSigninInProgressSelector = createSelector(
  authStoreSelector,
  function(authState) {
    return get(authState, 'isSigninInProgress');
  }
);

export const isSignInSelector = createSelector(
  uidSelector,
  function(uid) {
    return Boolean(uid);
  }
);
