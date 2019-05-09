// Moldules
import { combineReducers } from 'redux';
// Reducers
import auth from './auth';
import remoteConfig from './remote.config';
import speech from './speech';
import toast from './toast';
import advise from './advise';

const rootReducer = combineReducers({
  auth,
  remoteConfig,
  speech,
  toast,
  advise,
});

export default rootReducer;
