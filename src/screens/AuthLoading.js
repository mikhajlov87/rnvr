// Modules
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar } from 'react-native';
// Components
import MainBackgroundImage from '../components/MainBackgroundImage';
// Selectors
import { isSignInSelector } from '../store/selectors/auth';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrap(props);
  }

  _bootstrap = ({ isSignIn }) => {
    this.props.navigation.navigate(isSignIn ? 'App' : 'Auth');
  };

  render() {
    return (
      <MainBackgroundImage>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </MainBackgroundImage>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignIn: isSignInSelector(state),
  };
}

export default connect(mapStateToProps)(AuthLoading);
