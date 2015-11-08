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





export {trace}
