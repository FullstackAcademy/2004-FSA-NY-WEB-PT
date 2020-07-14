const UPDATE_FORM = 'UPDATE_FORM';
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const INITIAL_LOADING_COMPLETE = 'INITIAL_LOADING_COMPLETE';

const updateForm = (name, value) => ({
  type: UPDATE_FORM,
  name,
  value,
});

const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
});

const initialLoadingComplete = () => ({
  type: INITIAL_LOADING_COMPLETE,
});

export {
  setLoggedIn,
  updateForm,
  initialLoadingComplete,
  UPDATE_FORM,
  SET_LOGGED_IN,
  INITIAL_LOADING_COMPLETE,
}
