import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const app = document.querySelector('#app');

ReactDOM.render(
  <App />,
  app,
  () => {
    console.log('Application has rendered!');
  },
);
