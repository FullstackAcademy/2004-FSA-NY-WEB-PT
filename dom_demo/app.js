// const app = document.querySelector('#app');
const app = document.getElementById('cool_text_container');

// Node
console.log('app: ', app);

const createCoolText = (id) => {
  const coolText = document.createElement('h1');

  coolText.setAttribute('id', id);
  coolText.innerText = 'Cool Text.';
// setAttribute
// classList
// style[property]
  coolText.classList.add('cool_text');

  return coolText;
}

for (let i = 0; i < 100; ++i) {
  const coolText = createCoolText(i);

  app.appendChild(coolText);
}
