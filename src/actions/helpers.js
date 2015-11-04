import * as _ from 'ramda';
import * as l from 'lodash-fp';
import {RazorsEdge, CityOfBrahman} from './constants';
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


const withIndex = (text, index) => ({index, text});


//: Poem -> [{index, stanza}, {index, stanza}]
const makeStanzas = compose(map(withIndex), _.split("\n\n"));


// {i, s} -> {i, s, l: []}
const fillStanza = (stanza) => Object.assign({}, stanza, {lines: compose(makeLines, get("text"))(stanza)});

//:: [stanza] -> [[line][line]]

const notempty = _.filter((s) => s !== '')
const makeLines = compose(notempty, _.split("\n"));

const makeWords = _.split(" ");

//:: poem -> [stanzas] -> [[lines]] -> [[[words]]]
const tracePoem = compose(map(compose(trace("with Lines"), fillStanza)), trace("with Stanzas"), makeStanzas, trace("Initial String"))

const poem1 = tracePoem(RazorsEdge.text);





//:: [stanza] -> {stanza-1: "stanza"}

const makePoem = curry((title, string) => ({title,
    text: string,
    stanzas: map(fillStanza, makeStanzas(string)),
    visibleStanzas: [],
    choices: [],
    correctAnswer: 0
}));



const check = (e, val) => {
    console.log(val);
}





const initialState = { poemList: [makePoem("The Razor's Edge", RazorsEdge.text), makePoem(...CityOfBrahman)]};

export {initialState, makePoem, trace}
