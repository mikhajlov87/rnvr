// Modules
import { get } from 'immutable';
import { createSelector } from 'reselect';

function toastStateSelector(state) {
  return state.toast;
}

export const toastMessageSelector = createSelector(
  toastStateSelector,
  function(toast) {
    return get(toast, 'message');
  }
);

export const toastTypeSelector = createSelector(
  toastStateSelector,
  function(toast) {
    return get(toast, 'type');
  }
);

export const toastSelector = createSelector(
  toastTypeSelector,
  toastMessageSelector,
  function(type, message) {
    if (!type || !message) {
      return null;
    }
    return { type, message };
  }
);
