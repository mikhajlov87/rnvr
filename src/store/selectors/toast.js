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

export const toastDescriptionSelector = createSelector(
  toastStateSelector,
  function(toast) {
    return get(toast, 'description');
  }
);

export const toastSelector = createSelector(
  toastTypeSelector,
  toastMessageSelector,
  toastDescriptionSelector,
  function(type, message, description) {
    if (!type || !message) {
      return null;
    }
    return { type, message, description };
  }
);
