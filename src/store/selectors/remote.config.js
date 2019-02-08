// Modules
import { get } from 'immutable';
import { createSelector } from 'reselect';

function remoteConfigStateSelector(state) {
  return state.remoteConfig;
}

export const mainBgImageUriSelector = createSelector(
  remoteConfigStateSelector,
  function(remoteConfigState) {
    return get(remoteConfigState, 'mainBgImageUri');
  }
);
