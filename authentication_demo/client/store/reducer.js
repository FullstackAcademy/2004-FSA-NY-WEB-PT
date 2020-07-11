import { UPDATE_FORM, SET_LOGGED_IN } from './actions';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        username: '',
        password: '',
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default reducer;
