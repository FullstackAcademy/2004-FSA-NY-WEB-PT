import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const APP_STARTUP_TIME = 'app_startup_time';

const API_URL = 'https://acme-users-api-rev.herokuapp.com';

console.time(APP_STARTUP_TIME);

class App extends Component {
  state = {
    inputVal: '',
    yes: true,
    startingPokemon: 'Charmander',
  }

  onSelectRadio = (e) => {
    this.setState({
      startingPokemon: e.target.value,
    });
  }

  // GET/POST/PUT/DELETE
  // Rest
  // 4 actions you can take:
  // Retrieve data - GET
  // Create data - POST
  // Update data - PUT
  // Delete data - DELETE
  async componentDidMount() {
    const randomUserRes = await fetch(`${API_URL}/api/users/random`);

    const randomUserData = await randomUserRes.json();

    console.log('Random: ', randomUserData);

    const detailedUserRes = await fetch(`${API_URL}/api/users/detail/${randomUserData.id}`);

    const detailedUserData = await detailedUserRes.json();

    console.log('Detailed: ', detailedUserData);

    const newNote = {
      archived: false,
      text: 'Eliot 5/30 Demo',
    };

    await fetch(`${API_URL}/api/users/${detailedUserData.id}/notes`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newNote),
    });
  }

  render() {
    const { inputVal, yes, startingPokemon } = this.state;
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
        <input
          value={inputVal}
          onChange={(e) => {
            this.setState({
              inputVal: e.target.value,
            });
          }}
        />
        <label>
          Yes?
          <input
            checked={yes}
            onChange={(e) => {
              this.setState({
                yes: e.target.checked,
              });
            }}
            type={'checkbox'}
          />
        </label>
        <div
          onChange={(e) => {
            this.onSelectRadio(e);
          }}
        >
          <label>
            Squirtle
            <input
              type={'radio'}
              name={'starting-pokemon'}
              value={'Squirtle'}
              checked={startingPokemon === 'Squirtle'}
            />
          </label>
          <label>
            Bulbasaur
            <input
              type={'radio'}
              name={'starting-pokemon'}
              value={'Bulbasaur'}
              checked={startingPokemon === 'Bulbasaur'}
            />
          </label>
          <label>
            Charmander
            <input
              type={'radio'}
              name={'starting-pokemon'}
              value={'Charmander'}
              checked={startingPokemon === 'Charmander'}
            />
          </label>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
