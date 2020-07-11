import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { updateForm, setLoggedIn } from './actions';

const loggingMiddleware = store => next => action => {
  console.log('Action: ', action);

  next(action);

  console.log('New State: ', store.getState());
};

const store = createStore(reducer, applyMiddleware(loggingMiddleware));

export default store;

export {
  updateForm,
  setLoggedIn,
}
