import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const app = document.querySelector('#app');

class Application extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
    };
  }

  componentDidMount() {
    axios.get('/api/pokemon')
      .then((res) => {
        this.setState({
          pokemon: res.data.pokemon,
        });
      })
      .catch((e) => {
        console.log('Failed to fetch pokemon.');
        throw e;
      });
  }

  render() {
    const { pokemon } = this.state;

    return (
      <div>
        <h2>Pokemon Database</h2>
        <ul>
          {
            pokemon.map((p) => {
              return <li key={p.name}> Name: {p.name} | Type: {p.type}  </li>
            })
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Application />,
  app,
  () => {
    console.log('Application rendered.');
  },
);
