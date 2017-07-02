// import * as types from '../constants/actionTypes';
// import fetch from 'unfetch';
// import objectAssign from 'object-assign';

// export function addMyItem(itemData) {
//   return (dispatch) => {
//     fetch('/api/addMyItem', {
//       method: 'POST',
//       body: JSON.stringify(itemData),
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Cache': 'no-cache'
//       },
//       credentials: 'same-origin'
//     })
//       .then(response => {
//         if (response.status >= 400) {
//           throw new Error(response);
//         } else {
//           return response.json();
//         }
//       })
//       .then(data => {
//         dispatch(
//           {
//             type: types.ADD_MY_ITEM,
//             payload: data
//           }
//         );
//       })
//       .catch(err => {
//         /* eslint-disable no-console */
//         console.error(`Got error:${err} while dispatching ADD_MY_ITEM!`);
//       });
//   };
// }

