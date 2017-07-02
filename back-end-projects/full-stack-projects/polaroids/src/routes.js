import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import Credits from './components/Credits';

import Favourites from './containers/Favourites';
import Main from './containers/Main';
import Profile from './containers/Profile';

import CheckAuth from './utils/checkAuth';
import { getInitialState, getPublicProfile } from './actions/commonActions';
import { updateAppState } from './actions/appActions';

export default function AllRoutes(dispatch) {

  const loadAppState = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    CheckAuth(
      (favList) => {
        updateAppState({ loggedIn: true }, favList)(dispatch);
        cb();
      },
      () => {
        updateAppState({ loggedIn: false })(dispatch);
        cb();
      }
    );
  };

  const requireAuthAndLoad = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    // CheckAuth take two function as parameter
    // one for authorized req
    // other for unauthorized req
    // If user is authorized then load initial state
    CheckAuth(
      () => {
        const path = nextState.location.pathname;
        getInitialState(cb, path.slice(1))(dispatch);
      },
      () => {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
        cb();
      }
    );
  };

  const loadPublicProfile = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    const id = nextState.params.id;
    getPublicProfile(cb, id, replace)(dispatch);
  };

  const loadAllItems = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    getInitialState(cb, 'allItems')(dispatch);
  };

  // const loadIndividualItem = (nextState, replace, cb) => {
  //   document.body.style.cursor = 'wait';
  //   // fetch the id from /item/123 like url
  //   const id = nextState.location.pathname.split('/')[2];
  //   loadIndividualItemState(cb, replace, 'individualItem', id)(dispatch);
  // };

  const requireNoAuth = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    // CheckAuth take two function as parameter
    // one for authorized req
    // other for unauthorized req

    // If user is already authorized then
    // send him back to home(/)
    // else let him goto login page
    CheckAuth(
      () => {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        });
        cb();
      },
      () => {
        cb();
      },
    );
  };

  return (
    <Route path="/" component={App} onEnter={loadAppState}>
      <IndexRoute component={Main} onEnter={loadAllItems} />
      <Route path="profile" component={Profile} onEnter={requireAuthAndLoad} />
      <Route path="user/:id" component={Profile} onEnter={loadPublicProfile} />
      <Route path="login" component={Login} onEnter={requireNoAuth} />
      <Route path="favourites" component={Favourites} />
      <Route path="credits" component={Credits} />
      <Route path="*" component={ErrorPage} />
    </Route>
  );
}
