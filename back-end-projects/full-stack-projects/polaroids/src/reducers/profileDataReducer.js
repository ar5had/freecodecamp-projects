import { UPDATE_PROFILE_STATE, UPDATE_MY_ITEM_LIKES, ADD_MY_ITEM, DELETE_MY_ITEM, UPDATE_MYITEMS_STATE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

let pos, likesCount;

export default function profileDataReducer(state = initialState.profile, action) {
  switch (action.type) {
    case UPDATE_PROFILE_STATE:
      return objectAssign({}, state, action.payload);
    case DELETE_MY_ITEM:
      return objectAssign(
        {},
        state,
        { myItems: state.myItems.filter(elem => elem.key !== action.payload) }
      );
    case ADD_MY_ITEM:
      return objectAssign(
        {},
        state,
        { myItems: [action.payload, ...state.myItems] }
      );
    case UPDATE_MYITEMS_STATE:
      return objectAssign(
        {},
        state,
        { myItems: [...action.payload] }
      );
    case UPDATE_MY_ITEM_LIKES:
      if(state.myItems.length < 1)
        return state;
      pos = action.payload.pos;
      likesCount = state.myItems[pos].likesCount + action.payload.change;
      likesCount = likesCount >= 0 ? likesCount : 0;

      return objectAssign(
        {},
        state,
        { myItems: [
            ...state.myItems.slice(0, pos),
            Object.assign(
              {},
              state.myItems[pos],
              { likesCount }
            ),
            ...state.myItems.slice(pos+1)
          ]
        }
      );

    default:
      return state;
  }
}
