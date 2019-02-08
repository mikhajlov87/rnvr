// Modules
import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// Screens
import HomeScreen from './src/screens/Home';
import AuthLoadingScreen from './src/screens/AuthLoading';
import SignInScreen from './src/screens/SignIn';
// Store
import configureStore from './src/store';
// Actions
import { getMainBgImageUri } from './src/store/actions/remote.config';

const { store, persistor } = configureStore();
store.dispatch( getMainBgImageUri() );

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
});

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigator = React.createRef();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer ref={this.navigator} />
        </PersistGate>
      </Provider>
    );
  }
}
