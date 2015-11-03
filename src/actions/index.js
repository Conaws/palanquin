
const actionCreators = {
  increment : () => ({ type : 'COUNTER_INCREMENT' }),
  nextValIncrease: () => ({type: 'POEM_NEXTVAL_INCREASE'}),
  poemStart: () => ({type: 'POEM_START'}),
  poemLoad: (poem) => ({type: 'POEM_LOAD', payload: {poem}}),
  addPoem: (title, body) => ({type: 'ADD_POEM', payload: {title, body}})
};


export default actionCreators;
