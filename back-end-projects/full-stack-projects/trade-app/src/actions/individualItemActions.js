/*eslint import/namespace: ['error', { allowComputed: true }]*/
import * as types from '../constants/actionTypes';
import fetch from 'unfetch';

const captialize = str =>  str[0].toUpperCase() + str.slice(1);

export function loadIndividualItemState(cb, replace, page, id) {
  return (dispatch) => {
    fetch(`/api/get${captialize(page)}Data/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error(response);
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch(
        {
          type: types[`GET_INITIAL_${page.toUpperCase()}_STATE`],
          payload: data
        }
      );
      cb();
    })
    .catch(err => {
      /* eslint-disable no-console */
      console.error(`Got error:${err} while dispatching GET_INITIAL_${page.toUpperCase()}_STATE!`);
      replace({
          pathname: '/pagenotfound',
          state: { nextPathname: `/item/${id}` }
        });
      cb();
    });
  };
}

export function requestItem(id, showErrMsg) {
  return (dispatch) => {
    fetch(`/api/requestitem/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error(response);
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch(
        {
          type: types[`UPDATE_INDIVIDUALITEM_STATE`],
          payload: data
        }
      );
    })
    .catch(err => {
      /* eslint-disable no-console */
      showErrMsg('Sorry, item can\'t be requested. Try Again!');
      console.error(`Got error:${err} while requesting item!`);
    });
  };
}
