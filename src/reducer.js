import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './reducers/home';
import topurl from './reducers/topurl';

export default combineReducers({
  home,
  topurl,
  router: routerReducer
});
