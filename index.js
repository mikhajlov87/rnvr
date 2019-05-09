import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'react-native-firebase';

console.disableYellowBox = true;
firebase.config().enableDeveloperMode();

if (__DEV__) {
  console = require('./src/helpers/reactotron').default;
  console.clear();
}

AppRegistry.registerComponent(appName, () => App);
