import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profileDataReducer from './profileDataReducer';
import allItemsReducer from './allItemsReducer';
import appDataReducer from './appDataReducer';
import favItemsReducer from './favItemsReducer';

const rootReducer = combineReducers({
  appData: appDataReducer,
  profileData: profileDataReducer,
  allItemsData: allItemsReducer,
  routing: routerReducer,
  favourites: favItemsReducer
});

export default rootReducer;
