import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { LoginForm, LoggedIn, LoadingComponent } from './components/index';
import store from './store/index';
import { initialLoadingComplete, setLoggedIn }  from './store/actions';

const app = document.querySelector('#app');

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      loaded: store.getState().initialLoadingComplete,
    };

    store.subscribe(() => {
      this.setState({
        loaded: store.getState().initialLoadingComplete,
      });
    });
  }

  componentDidMount() {
    axios.get('/api/whoami')
      .then(({ data }) => {
        if (data.loggedIn) {
          store.dispatch(setLoggedIn());
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        store.dispatch(initialLoadingComplete());
      });
  }

  render() {
    const { loaded } = this.state;

    return (
      <BrowserRouter>
        {
          !loaded && <LoadingComponent />
        }
        { loaded &&
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/account" component={LoggedIn} />
            <Redirect to="/" />
          </Switch>
        }
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
