// Store

// dispatch
// subscribe
// unsubscribe
// getState

// createStore() => Store

const { createStore: reduxCreateStore } = require('redux');

const TEST = 'TEST';
const INCREMENT = 'INCREMENT';

const setTest = () => ({ type: TEST });
const increment = () => ({ type: INCREMENT });

// Reducers sole purpose is to interpret a request for a change to state. It is a request, by that I mean that a reducer can ignore the request, or it can choose to do something with it. We specify the type of request using an object we call an "action" and it has a property "type" that is a shared string or symbol, that we use to determine what _kind of change_ is being requested. Reducers must return a new object that represents the state after the requested change.
const initialState = {
  test: false,
  counter: 0,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: true,
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}

const createStore = (reducer) => {
  let internalReducer = reducer;

  let state = internalReducer(undefined, { type: '@@REDUX_INIT' });

  let subscribersCount = 0;

  const subscribers = {};

  return {
    dispatch: (action) => {
      const prevState = state;
      state = internalReducer(state, action);

      if (prevState === state) throw new Error('Must return a new state on every reduction');

      Object.values(subscribers).forEach(subscriber => subscriber());
    },
    subscribe: (handler) => {
      subscribers[subscribersCount] = handler;

      const createUnsub = (id) => () => {
        console.log(id);
        delete subscribers[id];
        console.log(subscribers);
      };

      const unsub = createUnsub(subscribersCount);

      ++subscribersCount;

      return unsub;
    },
    getState: () => state,
    replaceReducer: (reducer) => {
      internalReducer = reducer;
    },
  }
}

const store = createStore(testReducer);

// This is the quintessential react pattern
// store.subscribe(() => {
  // const state = store.getState();
  //
  // const { test } = state;
  //
  // this.setState({
  //   test,
  // });
// });

console.log('On initialization: ', store.getState());
store.dispatch(setTest());

const unsubscribe = store.subscribe(() => {
  console.log('Timer ran!', store.getState());
});

const intervalId = setInterval(() => {
  store.dispatch(increment());
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  unsubscribe();
}, 3500);
setTimeout(() => store.dispatch(increment()), 5000);

// ComponentA changes text with a dispatch
// ComponentB wants to know about the change
// So ComponentB subscribes
// It calls getState() in the handler

// Then, it setsState into itself <------ Is where people get tripped up
// React only updates components if there is a change to state or props

// const SET_TEXT = 'SET_TEXT';
//
// const reduxInitialState = {
//   text: '',
// };

// const reduxStore = reduxCreateStore((state = reduxInitialState, action) => {
//   switch (action.type) {
//     case SET_TEXT:
//       state.text = action.text;
//       return state;
//     default:
//       return state;
//   }
// });
//
// console.log(reduxStore);
// reduxStore.dispatch({ type: SET_TEXT, text: 'testing' });
// console.log(reduxStore.getState());

// "Functional Programming" has two main rules:
/*
1. Given any input x produce the same output y
2. You should never mutate a reference.
 */

// let unsub;
//
// class App extends Component {
//   constructor() {
//     super();
//
//     this.state = {
//       text: store.getState().text,
//     };
//
//     unsub = store.subscribe(() => {
//       const { text } = store.getState();
//
//       this.setState({
//         text,
//       });
//     });
//   }
//
//   componentWillUnmount() {
//     unsub();
//   }
//
//   render () {
//     const { text } = this.state;
//
//     return (<h2> { text } </h2>)
//   }
// }
