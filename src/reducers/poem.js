import { createReducer } from 'utils';
import { POEM_NEXTVAL_INCREASE, POEM_START, ADD_POEM, POEM_LOAD} from 'actions/constants';
import {initialState, makePoem} from 'actions/helpers';

import * as _ from 'ramda';
import * as l from 'lodash-fp';
import {RazorsEdge} from '../actions/constants';
import {Map, List} from 'immutable'



const compose = _.compose;
const curry = _.curry;
const map = curry((cb, iterable) => iterable.map(cb));

const get = curry((val, obj) => {
  if (Map.isMap(obj)) {
    return obj.get(val);
  }
  else
    return obj[val];
})
const trace = curry((tag, x) => {console.log(tag, x); return x});


const withIndex = map((text, index) => ({index, text}));





//make pointfree
const nextVal = (state) => {
  console.log(state);
  let newAns = state.correctAnswer + 1;
  let v = compose(trace("after"), _.slice(0, newAns))(state.stanzas) ;
  let rest = _.difference(state.stanzas, v);
  if (state.correctAnswer != state.stanzas.length){
    return {visibleStanzas: v, choices: l.shuffle(rest), correctAnswer: newAns}
  }
  else
    return {visibleStanzas: [], choices: [], correctAnswer: 0}
}





export default createReducer(initialState.poemList[0], {
  [POEM_LOAD] : (state, payload) => makePoem(payload.poem.title, payload.poem.text),
  [POEM_START] : (state) => Object.assign({}, state, nextVal(state)),
  [POEM_NEXTVAL_INCREASE] : (state) => Object.assign({}, state, nextVal(state))
});
