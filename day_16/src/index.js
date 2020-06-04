import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

// class App extends Component {
//   render() {
//     return <h1> Hello World! </h1>
//   }
// }

const delay = (time, successChance = 100) => new Promise((res, rej) => {
  setTimeout(() => {
    const failChance = Math.ceil(Math.random() * 100);

    if (successChance >= failChance) {
      res();
    } else {
      rej();
    }
  }, time);
});

const fakeLoadData = async () => {
  await delay(1000, 50);

  return [
    {
      name: 'Eliot',
      admin: true,
    },
    {
      name: 'Joe',
      admin: false,
    },
  ];
}

class Users extends Component {
  render() {
    const { users } = this.props;

    return (
      <ul>
        {
          users.map(user => {
            return <li key={user.name}>
              {user.name} is {user.admin ? 'an admin' : 'not an admin'}
            </li>
          })
        }
      </ul>
    )
  }
}

// PropTypes is a debugging and safety tool to help you build react components that get what they expect in terms of properties.
Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  })),
}

// Functional Components vs Presentational Component

// Functional Component is just a component written using a function signature.
// A Presentational Component is a component that does not own any business logic on its own - and simply renders a view. This really means: no state, and no helper functions that IT DEFINES. It can use functions passed to it as props.
function App() {
  // Tuple - its a fancy word for a two element readonly array
  /*
  {
    count: 0,
    title: 'Counter',
  }
  */
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Ran!');

    fakeLoadData()
      .then(loadedUsers => {
        setUsers(loadedUsers);
      })
      .catch(() => {
        setUsers([]);
      });
  }, []);

  return <div>
    <h3>Count is {count}</h3>
    <button onClick={() => setCount(count + 1)}>Increment Count</button>
    <Users users={users} />
  </div>
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
