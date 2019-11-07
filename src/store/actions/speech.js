// Modules
import Voice from 'react-native-voice';
import firebase from 'react-native-firebase';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import join from 'lodash/join';
// Constants
import * as speechTypes from '../constants/speech';
// Helpers
import { actionCreator } from '../../helpers/actionCreator';
// Actions
import { showToastMessage } from './toast';

export function removeAllListeners() {
  return function(dispatch) {
    Voice.destroy()
      .then(Voice.removeAllListeners)
      .catch(function(err) {
        dispatch( showToastMessage({ type: 'danger', message: err.message, description: '' }) );
      });
  }
}

export function setSpeechStart(start) {
  return actionCreator(speechTypes.SET_SPEECH_START, start);
}

export function setSpeechRecognized(recognized) {
  return actionCreator(speechTypes.SET_SPEECH_RECOGNIZED, recognized);
}

export function setSpeechResults(results) {
  return actionCreator(speechTypes.SET_SPEECH_RESULTS, results);
}

export function startRecognition() {
  return actionCreator(speechTypes.START_RECOGNITION);
}

export function setRecording(recordingState) {
  return actionCreator(speechTypes.SET_RECORDING, recordingState);
}

export function onStartRecognition(lang) {
  return function(dispatch) {
    dispatch( startRecognition() );
    Voice.start(lang)
      .catch(function(err) {
        dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
        dispatch( stopRecording() );
      });
  }
}

export function stopRecording() {
  return function(dispatch) {
    Voice.stop()
      .then(function() {
        dispatch( setRecording(false) );
      })
      .catch(function(err) {
        dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
        dispatch( setRecording(false) );
      });
  }
}

export function sendRecordResults(results = [], advises = []) {
  return function(dispatch) {
    const currentUser = firebase.auth().currentUser;
    firebase.firestore()
      .collection('responsibility')
      .add({
          user_name: currentUser.displayName || null,
          phone: currentUser.phone || null,
          uid: currentUser.uid || null,
          message_text: results[0],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function() {
        const message = results[0] || '';

        const filteredAdvises = filter(advises, function({ keyword }) {
          return message.includes(keyword);
        });

        const advisesArray = map(filteredAdvises, 'advise');

        const text = join(advisesArray, ' ');

        if (text) {
          dispatch( showToastMessage({ type: 'success', message: 'Suggestion!', description: text }) );
        } else {
          const defaultMessage = find(advises, ['keyword', 'EMPTY (no tag words)']);

          if (defaultMessage) {
            dispatch( showToastMessage({ type: 'success', message: 'Suggestion!', description: defaultMessage.advise }) );
          } else {
            dispatch( showToastMessage({ type: 'success', message: 'Done!', description: '' }) );
          }
        }
      })
      .catch(function(err) {
        dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
      });
  }
}
