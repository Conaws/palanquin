import { createReducer } from 'utils';
import {get} from 'core';
import { POEM_NEXTVAL_INCREASE, POEM_START, ADD_POEM, POEM_LOAD, ACTIVATE_STANZA, DEACTIVATE_STANZA} from 'actions/constants';

import * as R from 'ramda';
import * as l from 'lodash-fp';
import {RazorsEdge} from 'actions/constants';


const compose = R.compose;
const curry = R.curry;
const map = curry((cb, iterable) => iterable.map(cb));



const trace = curry((tag, x) => {console.log(tag, x); return x});



const withIndex = (text, index) => ({index, text});


//: Poem -> [{index, stanza}, {index, stanza}]
const makeStanzas = compose(map(withIndex), R.split("\n\n"));


// {i, s} -> {i, s, l: []}
const fillStanza = (stanza) => Object.assign({}, stanza, {lines: compose(makeLines, get("text"))(stanza)});

//:: [stanza] -> [[line][line]]

const notempty = R.filter((s) => s !== '')
const makeLines = compose(notempty, R.split("\n"));

const makeWords = R.split(" ");

//:: poem -> [stanzas] -> [[lines]] -> [[[words]]]
const tracePoem = compose(map(compose(trace("with Lines"), fillStanza)), trace("with Stanzas"), makeStanzas, trace("Initial String"))

//const poem1 = tracePoem(RazorsEdge.text);




const makePoem = curry((title, string) => ({title,
    text: string,
    stanzas: map(fillStanza, makeStanzas(string)),
    visibleStanzas: [],
    choices: [],
    correctAnswer: 0
}));


//const initialState = { poemList: [makePoem("The Razor's Edge", RazorsEdge.text), makePoem(...CityOfBrahman)]};





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



export default createReducer(makePoem(...RazorsEdge), {
  [POEM_LOAD] : (state, payload) => makePoem(payload.poem.title, payload.poem.text),
  [POEM_START] : (state) => nextAnswer(state),
  [POEM_NEXTVAL_INCREASE] : (state) => (state.correctAnswer != state.stanzas.length) ? nextAnswer(state) : resetStanzas(state),
  [ACTIVATE_STANZA] : (state, payload) => R.assoc('activeStanza', payload)(state),
  [DEACTIVATE_STANZA] : (state) => R.dissoc('activeStanza')(state)
});