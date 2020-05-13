const app = document.querySelector('#app');

const API_URL = 'https://acme-users-api-rev.herokuapp.com/api/users/random';

const getRandomUser = () => {
  return axios.get(API_URL)
    .then(res => res.data);
}

const getRandomUsers = (numOfUsers) => {
  const userPromises = [];

  for (let i = 0; i < numOfUsers; ++i) {
    userPromises.push(getRandomUser());
  }

  return Promise.all(userPromises);
}

getRandomUsers(50)
  .then(users => {
    app.innerHTML = `
<table class='table table-dark table-striped'>
    <thead>
        <tr>
            <th>Name</th>
            <th>E-Mail</th>
        </tr>
    </thead>
    <tbody>
        ${users.map(user => {
          return `
<tr>
    <td>${user.fullName}</td>
    <td>${user.email}</td>
</tr>`
    }).join('\n')}
    </tbody>
</table>
`
  });
