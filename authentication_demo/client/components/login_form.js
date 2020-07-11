import React, { Component } from 'react';
import axios from 'axios';
import store, { updateForm, setLoggedIn } from '../store/index';

class LoginForm extends Component {
  constructor() {
    super();

    const { username, password } = store.getState();

    this.state = {
      username,
      password,
    };

    store.subscribe(() => {
      const { username, password } = store.getState();

      this.setState({
        username,
        password,
      });
    });
  }

  onChange = ({ target: { name, value } }) => {
    store.dispatch(updateForm(name, value));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    axios.post('/api/login', {
      username,
      password,
    })
      .then(({ data }) => {
        store.dispatch(setLoggedIn());
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        history.push('/account');
      });
  }

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Username
          <input
            name="username"
            onChange={this.onChange}
            value={username}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={this.onChange}
            value={password}
          />
        </label>
        <button> Login </button>
      </form>
    )
  }
}

export default LoginForm;
