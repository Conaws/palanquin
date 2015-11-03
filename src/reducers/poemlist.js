import { createReducer } from 'utils';
import {ADD_POEM} from 'actions/constants';
import {RazorsEdge, CityOfBrahman} from '../actions/constants';


const initialState = [RazorsEdge, CityOfBrahman];

export default createReducer(initialState, {
  [ADD_POEM]  : (state, poem) => state.concat({title: poem.title, text: poem.text})
});