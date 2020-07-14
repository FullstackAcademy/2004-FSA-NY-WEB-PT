import { UPDATE_FORM, SET_LOGGED_IN, INITIAL_LOADING_COMPLETE } from './actions';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
  initialLoadingComplete: false,
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
    case INITIAL_LOADING_COMPLETE:
      return {
        ...state,
        initialLoadingComplete: true,
      };
    default:
      return state;
  }
};

export default reducer;
