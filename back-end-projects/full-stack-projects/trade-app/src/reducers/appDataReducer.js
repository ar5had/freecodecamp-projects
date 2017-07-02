import { UPDATE_APP_STATE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function appDataReducer(state = initialState.app, action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return objectAssign({}, state, action.payload);
    default:
      return state;
  }
}
