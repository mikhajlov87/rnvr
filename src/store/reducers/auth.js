// Modules
import { Map, set } from 'immutable';
// Constants
import { SET_UID, GOOGLE_SIGN_IN_PENDING } from '../constants/auth';

const initialState = Map({
  uid: null,
  isSigninInProgress: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_UID: {
      return set(state, 'uid', action.payload);
    }

    case GOOGLE_SIGN_IN_PENDING: {
      return set(state, 'isSigninInProgress', action.payload);
    }

    default: {
      return state;
    }
  }
}
