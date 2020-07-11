const UPDATE_FORM = 'UPDATE_FORM';
const SET_LOGGED_IN = 'SET_LOGGED_IN';

const updateForm = (name, value) => ({
  type: UPDATE_FORM,
  name,
  value,
});

const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
});

export {
  setLoggedIn,
  updateForm,
  UPDATE_FORM,
  SET_LOGGED_IN,
}
