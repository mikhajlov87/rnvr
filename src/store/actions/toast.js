// Constants
import * as toastTypes from '../constants/toast';
// Helpers
import { actionCreator } from '../../helpers/actionCreator';

export function showToastMessage(payload) {
  return actionCreator(toastTypes.SHOW_TOAST_MESSAGE, payload);
}

export function hideToastMessage() {
  return actionCreator(toastTypes.HIDE_TOAST_MESSAGE);
}
