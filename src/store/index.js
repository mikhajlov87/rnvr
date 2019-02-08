// Modules
import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
// Reducers
import rootReducer from './reducers';
// Reactotron
import Reactotron from '../helpers/reactotron';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'remoteConfig'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function() {
  const store = Reactotron.createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  // persistor.purge(); // TODO: remove that
  return { store, persistor };
}
