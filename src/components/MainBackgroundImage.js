// Modules
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FlashMessage , { showMessage } from 'react-native-flash-message';
import { bindActionCreators } from 'redux';
import Tts from 'react-native-tts';
// Selectors
import { mainBgImageUriSelector } from '../store/selectors/remote.config';
import { toastSelector } from '../store/selectors/toast';
// Actions
import { hideToastMessage } from '../store/actions/toast';

class MainBackgroundImage extends React.Component {
  componentDidUpdate(prevProps) {
    const { toast } = this.props;
    if (toast !== prevProps.toast) {
      this._showToastMessage();
    }
  }

  render() {
    const { mainBgImageUri } = this.props;
    return (
      <ImageBackground
        source={{ uri: mainBgImageUri }}
        style={styles.bgImage}
        defaultSource={require('../assets/images/placeholder.png')}
      >
        {this.props.children}
        <FlashMessage
          position="top"
          icon="auto"
          duration={30000}
          hideStatusBar={true}
          floating={true}
        />
      </ImageBackground>
    );
  }

  _showToastMessage = () => {
    const { toast } = this.props;
    if (toast) {
      const isErrorMessage = toast.type === 'danger';
      showMessage({
        message: toast.message,
        type: toast.type,
        color: isErrorMessage ? '#606060' : '#fafafa',
        description: toast.description || '',
        onPress: () => {
          Tts.stop();
          this.props.toastActions.hideToastMessage();
        }
      });
      if (!isErrorMessage) {
        Tts.addEventListener('tts-start', (event) => console.log("start", event));
        Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
        Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
        Tts.setDefaultRate(0.5, true);
        Tts.setDefaultPitch(1.5);
        Tts.speak(toast.description, { iosVoiceId: 'com.apple.ttsbundle.Samantha-compact' });
      }
    }
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
});

function mapStateToProps(state) {
  return {
    mainBgImageUri: mainBgImageUriSelector(state),
    toast: toastSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toastActions: bindActionCreators({ hideToastMessage }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBackgroundImage);
