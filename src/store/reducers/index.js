// Moldules
import { combineReducers } from 'redux';
// Reducers
import auth from './auth';
import remoteConfig from './remote.config';
import speech from './speech';
import toast from './toast';

const rootReducer = combineReducers({
  auth,
  remoteConfig,
  speech,
  toast,
});

export default rootReducer;
