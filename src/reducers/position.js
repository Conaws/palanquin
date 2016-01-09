import * as R 				  from 'ramda';
import * as l from 'lodash-fp';
import {GET_POSITION} from 'actions/constants';



export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}





const defState = () => ({
      center: {lat: null, lng: null},
      content: null,
      radius: 1200,
      pitch: l.sample(["Beckon The Plebians", "Summon the Serfs", "Phone Your People"])
    })



export default createReducer(defState(), {
	GET_POSITION: (state) => R.merge(state, getPosition())
});

