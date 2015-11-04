import * as _ from 'ramda';
import * as l from 'lodash-fp';

export const compose = _.compose;
export const curry = _.curry;
export const map = curry((cb, iterable) => iterable.map(cb));

export const get = curry((val, obj) => {
  if (Map.isMap(obj)) {
    return obj.get(val);
  }
  else
    return obj[val];
})

export const trace = curry((tag, x) => {console.log(tag, x); return x});

