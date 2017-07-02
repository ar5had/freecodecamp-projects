import { GET_INITIAL_PROFILE_STATE, UPDATE_PROFILE_STATE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function profileDataReducer(state = initialState.profile, action) {
  switch (action.type) {
    case GET_INITIAL_PROFILE_STATE:
      return objectAssign({}, state, action.payload);
    case UPDATE_PROFILE_STATE:
      return objectAssign({}, state, action.payload);
    default:
      return state;
  }
}
