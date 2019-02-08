// Modules
import { Map, set, merge } from 'immutable';
// Constants
import * as speechTypes from '../constants/speech';

const initialState = Map({
  started: '',
  recognized: '',
  results: [],
  recording: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case speechTypes.SPEECH_START: {
      return set(state, 'started', actionPayload);
    }

    case speechTypes.SET_SPEECH_RECOGNIZED: {
      return set(state, 'recognized', action.payload);
    }

    case speechTypes.SET_SPEECH_RESULTS: {
      return set(state, 'results', action.payload);
    }

    case speechTypes.START_RECOGNITION: {
      return merge(state, { started: '', recognized: '', results: [], recording: true, });
    }

    case speechTypes.SET_RECORDING: {
      return set(state, 'recording', action.payload);
    }

    default: {
      return state;
    }
  }
}
