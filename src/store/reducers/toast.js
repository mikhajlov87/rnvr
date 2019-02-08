// Modules
import { Map, merge } from 'immutable';
// Constants
import * as toastTypes from '../constants/toast';

const initialState = Map({
  type: null, // e.g success || error
  message: '',
});

export default function(state = initialState, action) {
  switch(action.type) {
    case toastTypes.SHOW_TOAST_MESSAGE: {
      return merge(state, action.payload);
    }

    case toastTypes.HIDE_TOAST_MESSAGE: {
      return merge(state, initialState);
    }

    default: {
      return state;
    }
  }
}
