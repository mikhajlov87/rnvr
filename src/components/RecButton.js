// Modules
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export default class RecButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      intervalId: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.rec) {
      if (this.props.rec !== prevProps.rec) {
        const intervalId = setInterval(() => {
          this.setState(prevState => ({ showText: !prevState.showText }));
        }, 750);
        this.setState({ intervalId });
      }
    } else {
      if (this.state.intervalId !== null) {
        clearInterval(this.state.intervalId);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { rec } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <Button
          danger={rec}
          light={!rec}
          onPress={this._onPressHandler}
          rounded={true}
          iconRight={true}
          style={styles.button}
          bordered={true}
        >
          <LinearGradient colors={['#acacac', '#666', '#acacac']} style={styles.gradient}>
            <Text>
              {rec ? (
                <Text style={styles.buttonText}>{this.state.showText ? 'REC' : ''}</Text>
              ) : (
                <Icon name="mic" style={[styles.icon, styles[rec ? 'red' : 'white']]} />
              )}
            </Text>
          </LinearGradient>
        </Button>
      </View>
    );
  }

  _onPressHandler = () => {
    if (this.props.toggleRecording) {
      this.props.toggleRecording();
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 15,
    width: 'auto',
  },
  button: {
    height: 120,
    overflow: 'hidden',
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 120,
  },
  gradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    fontSize: 90,
  },
  white: {
    color: '#fff',
  },
  red: {
    color: '#cc3333',
  },
  buttonText: {
    fontSize: 26,
    color: '#cc3333'
  },
});
