import { UPDATE_ALLITEMS_STATE, ADD_ONE_ITEM, UPDATE_ITEM_LIKES } from '../constants/actionTypes';
import initialState from './initialState';

let pos, likesCount;

export default function allItemsReducer(state = initialState.allItems, action) {
  switch (action.type) {
    case UPDATE_ALLITEMS_STATE:
      return [...action.payload];
    case ADD_ONE_ITEM:
      return [action.payload, ...state];
    case UPDATE_ITEM_LIKES:
      pos = action.payload.pos;
      likesCount = state[pos].likesCount + action.payload.change;
      likesCount = likesCount >= 0 ? likesCount : 0;
      return [
        ...state.slice(0, pos),
        Object.assign(
          {},
          state[pos],
          { likesCount }
        ),
        ...state.slice(pos+1)
      ];
    default:
      return state;
  }
}
