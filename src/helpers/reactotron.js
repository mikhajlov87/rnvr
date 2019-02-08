// Modules
import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';
import json from '../../app.json';

const reactotron = Reactotron
  .configure({ name: json.displayName })
  .use( reactotronRedux() )
  .connect();

  export default reactotron;
