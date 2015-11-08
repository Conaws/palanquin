
const log = (value) => {
	console.log(value);
	return {type: 'LOG'}
}

const actionCreators = {
  increment : () => ({ type : 'COUNTER_INCREMENT' }),
  nextValIncrease: () => ({type: 'POEM_NEXTVAL_INCREASE'}),
  poemStart: () => ({type: 'POEM_START'}),
  poemLoad: (poem) => ({type: 'POEM_LOAD', payload: {poem}}),
  addPoem: (title, text) => ({type: 'ADD_POEM', payload: {title, text}}),
  activateStanza: (stanza) => ({type: 'ACTIVATE_STANZA', payload: stanza}),
  deactivateStanza: () => ({type: 'DEACTIVATE_STANZA'})
};


Object.assign(actionCreators, {log})


export default actionCreators;
