// Modules
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MainBackgroundImage from '../components/MainBackgroundImage';
// Actions
import { googleSignIn, googleSignInPending } from '../store/actions/auth';
// Selectors
import { isSigninInProgressSelector, isSignInSelector } from '../store/selectors/auth';

class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  static defaultProps = {
    isSigninInProgress: false,
  };

  componentDidMount() {
    if (this.props.isSignIn) {
      this._redirectToHomeScreen();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSignIn && (prevProps.isSignIn !== this.props.isSignIn)) {
      this._redirectToHomeScreen();
    }
  }

  componentWillUnmount() {
    if (this.props.isSigninInProgress) {
      this.props.authActions.googleSignInPending(false);
    }
  }

  _redirectToHomeScreen = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <MainBackgroundImage>
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._googleSignIn}
            disabled={this.props.isSigninInProgress}
          />
        </View>
      </MainBackgroundImage>
    );
  }

  _googleSignIn = () => {
    this.props.authActions.googleSignIn();
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    isSigninInProgress: isSigninInProgressSelector(state),
    isSignIn: isSignInSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ googleSignIn, googleSignInPending }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
