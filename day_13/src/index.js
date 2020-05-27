import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './component.js';

const index = document.querySelector('#index');

ReactDOM.render(
  <HelloWorld />,
  index,
  () => {
    console.log('I have rendered!');
  }
);
