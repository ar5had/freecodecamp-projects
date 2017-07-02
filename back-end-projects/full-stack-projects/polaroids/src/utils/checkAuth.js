import fetch from 'unfetch';

export default function CheckAuth(success, failure) {
  fetch('/isUserLoggedIn', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache'
    },
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(res => {
      if (res.error === 'UNAUTHORIZED') {
        failure();
      } else {
        success(res.favourites);
      }
    })
    .catch(() => {
      /* eslint-disable no-console */
      failure();
    });
}
