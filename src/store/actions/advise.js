// Modules
import axios from 'axios';
import filter from 'lodash/filter';
// Actions
import { showToastMessage } from './toast';
// Constants
import * as adviseTypes from '../constants/advise';
// Helpers
import { actionCreator } from '../../helpers/actionCreator';

function setAdvises(advises) {
  return actionCreator(adviseTypes.SET_ADVISES, advises);
}

export function getAdvises() {
  return function(dispatch) {
    const url = 'https://spreadsheets.google.com/feeds/list/1VELhL8IIRqlqKG9-mQpa7KSlMSecYOo6jsZrNZWMe5g/2/public/values?alt=json';
      axios.get(url)
        .then(function(data) {
          return data.data;
        })
        .then(function(data) {
          return data.feed;
        })
        .then(function(feed) {
          return feed.entry;
        })
        .then(function(entry) {
          return entry.map(function({ gsx$tag, gsx$text }) {
            if (gsx$tag && gsx$text) {
              return {
                keyword: gsx$tag.$t || '',
                advise: gsx$text.$t || '',
              };
            }
          });
        })
        .then(function(arr) {
          return filter(arr, 'advise');
        })
        .then(function(advises) {
          dispatch( setAdvises(advises) );
        })
        .catch(function(err) {
          dispatch( showToastMessage({ type: 'danger', message: 'Error!', description: err.message }) );
        });
  }
}
