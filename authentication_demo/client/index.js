import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm, LoggedIn } from './components/index';

const app = document.querySelector('#app');

class HomePage extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/account" component={LoggedIn} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <HomePage />,
  app,
  () => {
    console.log('Application rendered!');
  },
);
