import { createReducer } from 'utils';
import {ADD_POEM} from 'actions/constants';
import {RazorsEdge} from '../actions/constants';


const initialState = [RazorsEdge];

export default createReducer(initialState, {
  [ADD_POEM]  : (state, poem) => state.concat({title: poem.title, body: poem.body})
});