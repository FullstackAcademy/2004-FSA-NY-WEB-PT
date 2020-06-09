import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

class App extends Component {
  state = { beavers: [], error: null }

  componentDidMount() {
    fetch('http://localhost:3000/beavers.txt')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          console.log(data.beavers);

          this.setState({
            beavers: data.beavers,
          })
        } else {
          this.setState({
            error: data.error,
          });
        }
      })
      .catch(e => console.error(e));
  }

  render() {
    const { beavers, error } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          alignItems: 'center',
          fontFamily: 'Roboto',
        }}
      >
        <img
          alt="Beaver"
          style={{
            height: '250px',
          }}
          src="https://pbs.twimg.com/profile_images/2779323089/f1d2488fedff90047a32244dbc624e59_400x400.jpeg"
        />
        <h2>Beavers</h2>
        {
          error && <span> {error} </span>
        }
        <ul>
          {
            beavers.map((name) => {
              return (
                <li key={name}>
                  {name}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
