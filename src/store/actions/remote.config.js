// Modules
import firebase from "react-native-firebase";
// Constants
import { SET_MAIN_BG_IMAGE_URI } from '../constants/remote.config';
// Helpers
import { actionCreator } from '../../helpers/actionCreator';
// Actions
import { showToastMessage } from '../actions/toast';

function setMainBgImageUri(uri) {
  return actionCreator(SET_MAIN_BG_IMAGE_URI, uri);
}

export function getMainBgImageUri() {
  return function(dispatch) {
    firebase.config().fetch()
      .then(() => firebase.config().activateFetched())
      .then(() => firebase.config().getValue('rnvr_bg_image'))
      .then((data) => {
        dispatch(
          setMainBgImageUri( data.val() ),
        );
      })
      .catch((err) => {
        dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
      });
  }
}
