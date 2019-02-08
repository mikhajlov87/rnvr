// Modules
import { Map, set } from 'immutable';
// Constants
import { SET_MAIN_BG_IMAGE_URI } from '../constants/remote.config';

const initialState = Map({
  mainBgImageUri: '',
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_MAIN_BG_IMAGE_URI: {
      return set(state, 'mainBgImageUri', action.payload);
    }

    default: {
      return state;
    }
  }
}