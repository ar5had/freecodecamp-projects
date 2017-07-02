import { GET_INITIAL_INDIVIDUALITEM_STATE, UPDATE_INDIVIDUALITEM_STATE} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function individualItemReducer(state = initialState.individualItemData, action) {
  switch (action.type) {
    case GET_INITIAL_INDIVIDUALITEM_STATE:
      return objectAssign({}, state, action.payload);
    case UPDATE_INDIVIDUALITEM_STATE:
      return objectAssign({}, state, action.payload);
    default:
      return state;
  }
}
