// Modules
import { createSelector } from 'reselect';
import { get } from 'immutable';

function speechSelector(state) {
  return state.speech;
}

export const speechStartedSelector = createSelector(
  speechSelector,
  function(speech) {
    return get(speech, 'started');
  }
);

export const speechRecognizedSelector = createSelector(
  speechSelector,
  function(speech) {
    return get(speech, 'recognized');
  }
);

export const speechResultsSelector = createSelector(
  speechSelector,
  function(speech) {
    return get(speech, 'results');
  }
);

export const speechRecordingSelector = createSelector(
  speechSelector,
  function(speech) {
    return get(speech, 'recording');
  }
);
