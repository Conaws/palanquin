import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import poem					  from './poem';
import poemlist				  from './poemlist';

export default combineReducers({
  poem,
  poemlist,
  router: routerStateReducer
});



//http://rackt.org/redux/docs/api/combineReducers.html


// function todos(state = [], action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false
//         }
//       ]
//     case COMPLETE_TODO:
//       return [
//         ...state.slice(0, action.index),
//         Object.assign({}, state[action.index], {
//           completed: true
//         }),
//         ...state.slice(action.index + 1)
//       ]
//     default:
//       return state
//   }
// }

// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }

// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }




//
//Using combine Reducers
//

// import { combineReducers } from 'redux'

// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })

// export default todoApp



//Equivelent to

// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }




//or

// const reducer = combineReducers({
//   a: doSomethingWithA,
//   b: processB,
//   c: c
// })



// function reducer(state, action) {
//   return {
//     a: doSomethingWithA(state.a, action),
//     b: processB(state.b, action),
//     c: c(state.c, action)
//   }
// }