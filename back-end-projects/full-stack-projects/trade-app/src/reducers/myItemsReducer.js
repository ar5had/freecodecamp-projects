import { ADD_MY_ITEM, DELETE_MY_ITEM, GET_INITIAL_MYITEMS_STATE } from '../constants/actionTypes';
// import objectAssign from 'object-assign';
import initialState from './initialState';

export default function myItemsReducer(state = initialState.myItems, action) {
  switch (action.type) {
    case DELETE_MY_ITEM:
      return state.filter(elem => elem.key !== action.payload);
    case ADD_MY_ITEM:
      return [action.payload, ...state];
    case GET_INITIAL_MYITEMS_STATE:
      return [...action.payload];
    default:
      return state;
  }
}
