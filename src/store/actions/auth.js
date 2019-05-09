// Modules
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
// Constants
import { SET_UID, GOOGLE_SIGN_IN_PENDING } from '../constants/auth';
// Helpers
import { actionCreator } from '../../helpers/actionCreator';
// Actions
import { showToastMessage } from '../actions/toast';

export function setUid(uid) {
  return actionCreator(SET_UID, uid);
}

export function googleSignInPending(status) {
  return actionCreator(GOOGLE_SIGN_IN_PENDING, status);
}

export function googleSignIn() {
  return async function(dispatch) {
    dispatch( googleSignInPending(true) );
    try {
      // add any configuration settings here:
      await GoogleSignin.configure({
        scope: ['https://www.googleapis.com/auth/drive.readonly'],
      });
      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      dispatch( googleSignInPending(false) );
      dispatch( setUid(firebaseUserCredential.user.uid) );
    } catch (err) {
      dispatch( googleSignInPending(false) );
      dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
    }
  }
}
