import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import Main from './containers/Main/index';
import Profile from './containers/Profile/index';
import Login from './components/Login/index';
import Trades from './containers/Trades/index';
import ItemPage from './containers/ItemPage/index';
import MyItems from './containers/MyItems/index';
import ErrorPage from './components/ErrorPage/index';
import CheckAuth from './utils/checkAuth';

import { getInitialState } from './actions/commonActions';
import { loadIndividualItemState } from './actions/individualItemActions';
import { updateAppState } from './actions/appActions';


export default function AllRoutes(dispatch) {

  const loadAppState = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    CheckAuth(
      (notificationsCount) => {
        updateAppState({ loggedIn: true, notificationsCount })(dispatch);
        cb();
      },
      () => {
        updateAppState({ loggedIn: false})(dispatch);
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

  const loadAllItems = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    getInitialState(cb, 'allItems')(dispatch);
  };

  const loadIndividualItem = (nextState, replace, cb) => {
    document.body.style.cursor = 'wait';
    // fetch the id from /item/123 like url
    const id = nextState.location.pathname.split('/')[2];
    loadIndividualItemState(cb, replace, 'individualItem', id)(dispatch);
  };

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
      <Route path="item/:id" component={ItemPage} onEnter={loadIndividualItem}/>
      <Route path="profile" component={Profile} onEnter={requireAuthAndLoad} />
      <Route path="login" component={Login} onEnter={requireNoAuth} />
      <Route path="trades" component={Trades} onEnter={requireAuthAndLoad} />
      <Route path="myItems" component={MyItems} onEnter={requireAuthAndLoad} />
      <Route path="*" component={ErrorPage} />
    </Route>
  );
}
