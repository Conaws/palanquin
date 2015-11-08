import { createReducer } from 'utils';
import {get} from 'core';
import { POEM_NEXTVAL_INCREASE, POEM_START, ADD_POEM, POEM_LOAD, ACTIVATE_STANZA, DEACTIVATE_STANZA, UPDATE_STANZA} from 'actions/constants';

import * as R from 'ramda';
import * as l from 'lodash-fp';
import {CityOfBrahman} from 'actions/constants';


const compose = R.compose;
const curry = R.curry;
const map = curry((cb, iterable) => iterable.map(cb));
const trace = curry((tag, x) => {console.log(tag, x); return x});



const withIndex = (text, index) => ({index, text});

const withOrder = (text, order) => ({order, text});

//: Poem -> [{index, stanza}, {index, stanza}]
const makeStanzas = compose(map(withIndex), R.split("\n\n"));


// {i, s} -> {i, s, l: []}
const fillStanza = (stanza) => R.merge({lines: compose(makeLines, get("text"))(stanza)}, stanza);






//Current problem -- not all poems are going to have newline splits
//Somehow need to check for newlines in create mode -- if not enough insert>
const notempty = R.filter((s) => s !== '')
const makeLines = compose(map(withOrder), notempty, R.split("\n"));


//activate -- right now returns number
// should return  
const targetStanza = (val) => R.compose(makeStanza, makeLines, R.path(['stanzas', val, 'text']));


const makeStanza = (lineArray) => {
  return {
    lines: lineArray,
    visible: [],
    choices: l.shuffle(R.take(5, lineArray)),
    correctAnswer: 0
  }
}


//1, filter(compose(lte(state.correctAnswer), prop('order')))state.choices

const updateStanza = (state) => {
  return R.merge(state, {
    correctAnswer: R.add(1, state.correctAnswer),
    visible: R.filter(
      R.compose(
        R.gte(state.correctAnswer), 
        R.prop('order')
        )
      )(state.lines),
    choices: l.shuffle(R.take(5, R.filter(R.compose(R.lt(state.correctAnswer), R.prop('order')), state.lines)))
      
    })

}




const makePoem = curry((title, text) => (
  { title,
    text,
    stanzas: makeStanzas(text),
    visibleStanzas: [],
    choices: [],
    correctAnswer: 0
  })
);



const nextAnswer = (state) => {
  let v = R.slice(0, state.correctAnswer + 1)(state.stanzas)
  return R.merge(state, {
      visibleStanzas: v,
      choices: l.shuffle(R.difference(state.stanzas, v)),
      correctAnswer: R.add(1)(state.correctAnswer)
  })
}










const resetStanzas = (state) => {
    return R.merge(state, {visibleStanzas: [], choices: [], correctAnswer: 0})
}



const init = (makePoem(CityOfBrahman.title, CityOfBrahman.text));

export default createReducer(init, {
  [POEM_LOAD] : (state, payload) => makePoem(payload.poem.title, payload.poem.text),
  [POEM_START] : (state) => nextAnswer(state),
  [POEM_NEXTVAL_INCREASE] : (state) => (state.correctAnswer != state.stanzas.length) ? nextAnswer(state) : resetStanzas(state),
  [ACTIVATE_STANZA] : (state, payload) => R.assoc('activeStanza', targetStanza(parseInt(payload))(state))(state),
  [DEACTIVATE_STANZA] : (state) => R.dissoc('activeStanza')(state),
  [UPDATE_STANZA]: (state) => R.merge(state, 
    trace("afterupdate", {activeStanza:  updateStanza(state.activeStanza)}))
});









