import React, { Component } from 'react';
import {
  HashRouter,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Home, Macys } from './components/index';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            path={'/'}
            exact
            component={Home}
          />
          <Route
            path={'/macys/:product?'}
            component={Macys}
          />
          <Redirect to={'/'} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
