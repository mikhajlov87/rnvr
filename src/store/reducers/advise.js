// Modules
import { Map, set } from 'immutable';
// Constants
import * as advisesTypes from '../constants/advise';

const initialState = Map({
  advises: [],
});

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case advisesTypes.SET_ADVISES: {
      return set(state, 'advises', payload);
    }

    default: {
      return state;
    }
  }
}
