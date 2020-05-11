const axios = require('axios');

const API_URL = 'https://acme-users-api-rev.herokuapp.com/';

const getRandomUser = () => {
  return axios.get(`${API_URL}api/users/random`)
    .then(res => {
      return res.data;
    });
}

const getRandomCompany = () => {
  return axios.get(`${API_URL}api/companies/random`)
    .then(res => {
      return res.data;
    });
}

const getRandomUserAndCompanySequential = async () => {
  try {
    const user = await getRandomUser();
    const company = await getRandomCompany();

    return [company, user];
  } catch (e) {
    console.error(e);

    return [];
  }
}

const getRandomUserAndCompanyParallel = () => {
  return Promise.all([
    getRandomCompany(),
    getRandomUser(),
  ]);
}

// console.time('Sequential');
// getRandomUserAndCompanySequential()
//   .then(([user, company]) => {
//     1 + 1;
//   });
// console.timeEnd('Sequential');
//
// console.time('Parallel');
// getRandomUserAndCompanyParallel()
//   .then(([user, company]) => {
//     1 + 1;
//   });
// console.timeEnd('Parallel');

const getCompanyProfits = async (companyId) => {
  const { data: { id } } = await axios.get(`${API_URL}api/companies/${companyId}/companyProfits`);

  return id;
}

const getRandomCompanyProfits = async () => {
  const id = await getRandomCompany();
  return await getCompanyProfits(id);
}

// getRandomCompanyProfits()
//   .then(console.log);

const someObj = {
  eliot: {
    instructor: {
      rating: '10/10',
    }
  }
};

const { eliot: { instructor: { rating } } } = someObj;

// console.log(rating);

// Private fields rant.
class Bank {
  #accountValue = 0;

  deposit(amount) {
    this.#accountValue += amount;
  }

  withdraw(amount) {
    if (amount <= this.#accountValue) {
      this.#accountValue -= amount;
      return amount;
    } else {
      throw new Error('You are too broke for this transaction.');
    }
  }

  showBalance() {
    console.log(this.#accountValue);
  }
}

const tdBank = new Bank();

// tdBank.deposit(100);
// tdBank.withdraw(50);
// tdBank.#accountValue += 1000000000000;
// tdBank.withdraw(100);
// tdBank.showBalance();
