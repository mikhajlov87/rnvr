// Modules
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { H1 } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Voice from 'react-native-voice';
// Components
import MainBackgroundImage from '../components/MainBackgroundImage';
import RecButton from '../components/RecButton';
// Actions
import * as speechActions from '../store/actions/speech';
import * as adviseActions from '../store/actions/advise';
// Selectors
import {
  speechStartedSelector, speechRecognizedSelector, speechResultsSelector, speechRecordingSelector,
} from '../store/selectors/speech';
import { advisesSelector } from '../store/selectors/advise';
// Helpers
import { moderateScale, scale } from '../helpers/scaling';

class Home extends React.Component {
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._getAdvises();
  }

  componentWillUnmount() {
    this.props.speechActions.removeAllListeners();
  }

  render() {
    const { speechRecording } = this.props;
    return (
      <MainBackgroundImage>
        <View style={styles.container}>
          <LinearGradient
            colors={[
              'rgba(172, 172, 172, .7)',
              'rgba(102, 102, 102, .7)',
              'rgba(172, 172, 172, .7)',
            ]}
            style={styles.gradient}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5 , 1]}
          >
            <H1 style={styles.header}>
              Please share questions,{'\n'}
              concerns and advice.{'\n'}
              Humbly yours,{'\n'}
              David
            </H1>
          </LinearGradient>
          <RecButton
            rec={speechRecording}
            toggleRecording={this._toggleRecording}
          />
        </View>
      </MainBackgroundImage>
    );
  }

  onSpeechStart() {
    this.props.speechActions.setSpeechStart('√');
  };

  onSpeechRecognized() {
    this.props.speechActions.setSpeechRecognized('√');
  };

  onSpeechResults(ev) {
    this.props.speechActions.setSpeechResults(ev.value);
  };

  _toggleRecording = () => {
    if (this.props.speechRecording) {
      this._stopRecording();
      this._saveData();
    } else {
      this._startRecognition();
    }
  }

  _startRecognition = () => {
    this.props.speechActions.onStartRecognition('en-US');
  }

  _stopRecording = () => {
    this.props.speechActions.stopRecording();
  }

  _clearTranscript = () => {
    this.props.speechActions.setSpeechResults([]);
  }

  _saveData = () => {
    const { speechResults, speechActions, advises } = this.props;
    if (speechResults.length > 0) {
      speechActions.sendRecordResults(speechResults, advises);
    }
  }

  _getAdvises = () => {
    this.props.adviseActions.getAdvises();
  }
}

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontSize: moderateScale(28, .4),
    textAlign: 'center',
    marginBottom: scale(15),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradient: {
    paddingLeft: scale(10),
    paddingRight: scale(10),
    marginBottom: scale(5),
    paddingTop: scale(5),
    borderBottomRightRadius: scale(25),
    borderTopLeftRadius: scale(25),
  }
});

function mapStateToProps(state) {
  return {
    speechStarted: speechStartedSelector(state),
    speechRecognized: speechRecognizedSelector(state),
    speechResults: speechResultsSelector(state),
    speechRecording: speechRecordingSelector(state),
    advises: advisesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    speechActions: bindActionCreators(speechActions, dispatch),
    adviseActions: bindActionCreators(adviseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
