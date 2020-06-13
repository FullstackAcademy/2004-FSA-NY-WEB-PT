import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

const app = document.querySelector('#app');

class Application extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
    }
  }

  componentDidMount() {
    window.fetch('/pokemon')
      .then(res => res.json())
      .then(res => {
        this.setState({
          pokemon: res.pokemon,
        });
      });
  }

  render() {
    const { pokemon } = this.state;

    return (
      <Fragment>
        <h1>Pokedex</h1>
        {
          Object.entries(pokemon).map(([name, stats]) => {
            return (
              <div key={name} style={{border: 'solid 1px black'}}>
                <h2>{name}</h2>
                <ul>
                  <li>Level: {stats.level}</li>
                  <li>Type: {stats.type}</li>
                </ul>
              </div>
            )
          })
        }
      </Fragment>
    )
  }
}

ReactDOM.render(
  <Application />,
  app,
  () => {
    console.log('App has rendered!');
  },
);
