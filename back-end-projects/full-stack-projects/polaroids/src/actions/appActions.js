import * as types from '../constants/actionTypes';
import { updateFavState } from './favActions';

export function updateAppState(appData, favourites) {
  return (dispatch) => {
    dispatch(
      {
        type: types.UPDATE_APP_STATE,
        payload: appData
      }
    );
    if (favourites) {
      updateFavState(favourites)(dispatch);
    }
  };
}
