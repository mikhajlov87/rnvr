// Modules
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FlashMessage , { showMessage } from 'react-native-flash-message';
import { bindActionCreators } from 'redux';
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
        prefetch={mainBgImageUri}
        defaultSource={require('../assets/images/placeholder.png')}
      >
        {this.props.children}
        <FlashMessage position="top" />
      </ImageBackground>
    );
  }

  _showToastMessage = () => {
    const { toast } = this.props;
    if (toast) {
      const isErrorMessage = toast.type === 'error';
      showMessage({
        message: toast.message,
        type: toast.type,
        color: isErrorMessage ? '#606060' : '#fafafa',
        onPress: () => {
          this.props.toastActions.hideToastMessage();
        }
      });
    }
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: null,
    width: null,
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
