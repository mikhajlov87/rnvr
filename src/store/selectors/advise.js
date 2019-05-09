// Modules
import { get } from 'immutable';
import { createSelector } from 'reselect';

function adviseStateSelector(state) {
  return state.advise;
}

export const advisesSelector = createSelector(
  adviseStateSelector,
  function(advise) {
    return get(advise, 'advises');
  }
);
