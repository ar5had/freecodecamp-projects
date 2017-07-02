import {GET_INITIAL_ALLITEMS_STATE } from '../constants/actionTypes';
import initialState from './initialState';

export default function allItemsReducer(state = initialState.allItems, action) {
  switch (action.type) {
    case GET_INITIAL_ALLITEMS_STATE:
      return [...action.payload];
    default:
      return state;
  }
}
