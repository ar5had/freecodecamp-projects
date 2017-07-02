import * as types from '../constants/actionTypes';

export function updateAppState(appData) {
  return (dispatch) => {
    dispatch(
      {
        type: types.UPDATE_APP_STATE,
        payload: appData
      }
    );
  };
}
