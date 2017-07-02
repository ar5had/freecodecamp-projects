import * as types from '../constants/actionTypes';
import fetch from 'unfetch';

import { updateItemLikes } from './commonActions';

export function updateFavState(favData) {
  return (dispatch) => {
    dispatch(
      {
        type: types.UPDATE_FAV_STATE,
        payload: favData
      }
    );
  };
}


export function toggleFavItem(photoId, node, change, pos) {
  return (dispatch) => {
    fetch('/api/toggleFavItem', {
      method: 'POST',
      body: JSON.stringify({ photoId }),
      headers: {
        'Accept': 'application/json',
        'Cache': 'no-cache',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data.error === 'UNAUTHORIZED') {
          throw 'UNAUTHORIZED!';
        }
        updateItemLikes(change, pos)(dispatch);
        node.classList.toggle('liked');
        dispatch(
          {
            type: types.UPDATE_FAV_STATE,
            payload: data
          }
        );
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.error(`Got error:${err} while dispatching ADD_FAV_ITEM!`);
      });
  };
}
