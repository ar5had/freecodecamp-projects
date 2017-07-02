import * as types from '../constants/actionTypes';
import fetch from 'unfetch';
import objectAssign from 'object-assign';

export function addMyItem(itemData, closeModal, showErrorMsg, hideWaitingMsg) {
  return (dispatch) => {
    fetch('/api/addMyItem', {
      method: 'POST',
      body: itemData,
      headers: {
        'Accept': 'application/json',
        'Cache': 'no-cache'
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
        dispatch(
          {
            type: types.ADD_MY_ITEM,
            payload: data
          }
        );
        dispatch(
          {
            type: types.ADD_ONE_ITEM,
            payload: data
          }
        );
        hideWaitingMsg();
        closeModal();
      })
      .catch(err => {
        /* eslint-disable no-console */
        hideWaitingMsg();
        console.log(err);
        showErrorMsg(`Sorry! Your item can\'t be created. Try again!`);
        console.error(`Got error:${err} while dispatching ADD_MY_ITEM!`);
      });
  };
}

export function deleteMyItem(key, node) {
  return (dispatch) => {
    fetch(`/api/deleteMyItem/${key}`, {
      method: 'DELETE',
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
          // hides item in fancy way
          objectAssign(node.style, { opacity: "0" });
          setTimeout(() => {
            dispatch({
              type: types.DELETE_MY_ITEM,
              payload: key
            });
          }, 400);
        }
      })
      .catch(err => {
        /* eslint-disable no-console */
        node.classList.remove('deleted');
        console.error(`Got error:${err} while dispatching DELETE_MY_ITEM!`);
      });
  };
}
