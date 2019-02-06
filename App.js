// Modules
import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
// Screens
import HomeScreen from './src/screens/Home';
import AuthLoadingScreen from './src/screens/AuthLoading';
import SignInScreen from './src/screens/SignIn';

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
      <AppContainer ref={this.navigator} />
    );
  }
}
