import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import configureStore from './store/configureStore';

import './styles/global.sass';
import './favicon.ico';

import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      {/*Passing dispatch method so that actions can be called in onEnter hook*/}
      {routes(store.dispatch)}
    </Router>
  </Provider>, document.getElementById('app')
);
