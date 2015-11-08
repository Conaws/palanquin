import * as R 				  from 'ramda';
import {compose, curry, map, 
        get, trace}           from 'core';



export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}








// const addC = R.mapObj((val) => val + "C")
// const addCtoTitleText = compose(map(addC), get('poemlist'))

const getStanzas = R.compose(R.prop('stanzas'), R.prop('poem'));
const addActive = R.assoc('active', true)
const ActivateStanzas = compose(R.map(addActive), getStanzas);


//problem with this right now -- removing activation when switch
const activateStanza = (val) => R.assocPath(['poem', 'stanzas', val, 'active'], true)
const deActivateStanza = (val) => R.dissocPath(['poem', 'stanza', val])


const targetStanza = (val) => R.path(['poem', 'stanzas', val]);


const ramda = (x, y) => trace("Where my ramda work goes", compose(R.prop('lines'), targetStanza(x))(y));


export default createReducer('[]', {
	
});

