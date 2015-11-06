import { createReducer } from 'utils';
import {ADD_POEM} from 'actions/constants';
import {RazorsEdge, CityOfBrahman} from '../actions/constants';
import {getLocalJSON, setLocalJSON} from 'core/simpleStorage';






const checkState = () => {
	let initialState = getLocalJSON("poemlist");
	if (initialState.length < 2){
		setLocalJSON("poemlist")([RazorsEdge, CityOfBrahman]);
		initialState = getLocalJSON("poemlist");
	}
	return initialState;
}


export default createReducer(checkState(), {
  [ADD_POEM]  : (state, poem) => {
  	let poemlist = state.concat({title: poem.title, text: poem.text});
  	setLocalJSON("poemlist")(poemlist);
  	return poemlist;
  }
});