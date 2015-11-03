import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import poem					  from './poem';
import poemlist				  from './poemlist';

export default combineReducers({
  counter,
  poem,
  poemlist,
  router: routerStateReducer
});
