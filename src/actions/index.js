
const log = (value) => {
	console.log(value);
	return {type: 'LOG'}
}

const actionCreators = {
  getPosition: (pos) => ({ type : 'GET_POSITION' }),
  activateStanza: (stanza) => ({type: 'ACTIVATE_STANZA', payload: stanza}),

};


Object.assign(actionCreators, {log})


export default actionCreators;
