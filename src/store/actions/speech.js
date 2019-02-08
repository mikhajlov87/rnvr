// Modules
import Voice from 'react-native-voice';
import firebase from 'react-native-firebase';
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
        dispatch( showToastMessage({ type: 'error', message: err.message }) );
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
        dispatch( showToastMessage({ type: 'error', message: err.message }) );
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
        dispatch( showToastMessage({ type: 'error', message: err.message }) );
        dispatch( setRecording(false) );
      });
  }
}

export function sendRecordResults(results = []) {
  return function(dispatch) {
      const currentUser = firebase.auth().currentUser;
      firebase.firestore()
        .collection('users')
        .doc('messages')
        .update({
          items: firebase.firestore.FieldValue.arrayUnion({
            name: currentUser.displayName || null,
            phone: currentUser.phone || null,
            uid: currentUser.uid || null,
            text: results[0],
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }),
        })
        .then(function() {
          dispatch( showToastMessage({ type: 'success', message: 'Done!' }) );
        })
        .catch(function(err) {
          dispatch( showToastMessage({ type: 'error', message: err.message }) );
        });
  }
}
