const app = document.querySelector('#app');

const createAvatar = () => {
  const div = document.createElement('div');

  div.classList.add('avatar');

  return div;
};

const render = () => {
  for (let i = 0; i < 100; ++i) {
    app.appendChild(createAvatar());
  }
}

render();
