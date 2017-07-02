import { UPDATE_FAV_STATE } from '../constants/actionTypes';
import initialState from './initialState';

export default function favItemsReducer(state = initialState.favourites, action) {
  switch (action.type) {
    case UPDATE_FAV_STATE:
      return [...action.payload];
    default:
      return state;
  }
}
