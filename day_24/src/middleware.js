const { createStore, applyMiddleware } = require('redux');

const INCREMENT = 'INCREMENT';
const SET_PEOPLE = 'SET_PEOPLE';

const initialState = {
  counter: 0,
  people: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case SET_PEOPLE:
      return {
        ...state,
        people: action.people,
      };
    default:
      return state;
  }
}

const loggingAndThunkMiddleware = store => next => action => {
  console.log('State Before: ', store.getState());
  console.log('Action: ', action);

  if (typeof action === 'function') {
    action(store.dispatch, store.getState);
  } else {
    const result = next(action);

    console.log('Result: ', result);
    console.log('State After: ', store.getState());
  }
};

const store = createStore(reducer, applyMiddleware(loggingAndThunkMiddleware));

const fakeRequest = () => new Promise((res) => {
  setTimeout(res(['Joe', 'Joseph', 'Caroline']) , 1000);
});

store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch((dispatch) => {
  return fakeRequest()
    .then(people => {
      dispatch({ type: SET_PEOPLE, people });
    })
});

console.log('State after everything: ', store.getState());
