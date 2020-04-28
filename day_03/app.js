const app = document.querySelector('#app');

const MARTINI_IMAGE_URL = 'https://cdn.diffords.com/contrib/stock-images/2018/05/5af301cc25362.jpg';
const state = {
  martinis: [
    {
      name: 'Dirty Martini',
      score: 5,
    },
    {
      name: 'Not-So Dirty Martini',
    },
    {
      name: 'Clean Martini',
    },
  ],
}

const createNode = (type) => document.createElement(type);

const createHeader = () => {
  const headerContainer = createNode('div');
  headerContainer.classList.add('header_container');

  const headerText = createNode('h2');
  headerText.innerText = 'My Martini Diary';

  headerContainer.appendChild(headerText);

  return headerContainer;
};

const createDrinkCard = (martini) => {
  const drinkContainer = createNode('div');
  drinkContainer.classList.add('drink_card');

  drinkContainer.appendChild(createDrinkAvatar(martini));
  drinkContainer.appendChild(createDrinkDescription(martini));

  return drinkContainer;
}

const createButtons = (martini) => {
  const createClickHandler = (martini, direction) => {
    if (direction === 'Down') {
      return (ev) => {
        ev.stopPropagation();

        if (!martini.score) martini.score = 0;

        if (martini.score >= 1) --martini.score;

        render();
      }
    } else {
      return (ev) => {
        console.log(martini);

        ev.stopPropagation();

        if (!martini.score) martini.score = 0;

        if (martini.score <= 4) ++martini.score;

        render();
      }
    }
  }

  const downVoteButton = createNode('button');
  downVoteButton.classList.add('description_button');
  downVoteButton.innerText = 'Dislike';
  downVoteButton.addEventListener(
    'click',
    createClickHandler(martini, 'Down'),
  );

  const upVoteButton = createNode('button');
  upVoteButton.classList.add('description_button');
  upVoteButton.innerText = 'Like';
  upVoteButton.addEventListener(
    'click',
    createClickHandler(martini, 'Up'),
  );

  return [downVoteButton, upVoteButton];
}

const createDrinkDescription = (martini) => {
  const descriptionContainer = createNode('div');
  descriptionContainer.classList.add('description');

  const description = createNode('p');
  description.classList.add('description_text');
  description.innerText = `This is a martini. It is comprised of alcohol. Rating: ${martini.score || 0}/5`;

  const buttonContainer = createNode('div');
  buttonContainer.classList.add('description_buttons');

  const [downVoteButton, upVoteButton] = createButtons(martini);

  buttonContainer.appendChild(downVoteButton);
  buttonContainer.appendChild(upVoteButton);

  descriptionContainer.appendChild(description);
  descriptionContainer.appendChild(buttonContainer);

  return descriptionContainer;
};

const createDrinkAvatar = (martini) => {
  const drinkAvatarContainer = createNode('div');
  drinkAvatarContainer.classList.add('drink_avatar');

  const drinkName = createNode('h3');
  drinkName.innerText = martini.name || 'Martini';

  const drinkImage = createNode('div');
  drinkImage.style['background-image'] = `url('${MARTINI_IMAGE_URL}')`;
  drinkImage.style['background-size'] = 'cover';
  drinkImage.classList.add('drink_image');

  drinkAvatarContainer.appendChild(drinkName);
  drinkAvatarContainer.appendChild(drinkImage);

  return drinkAvatarContainer;
}

// Our entire app is really this function right here.
const render = () => {
  // Delete everything on our webpage.
  app.innerHTML = '';

  app.appendChild(createHeader());

  for (let i = 0; i < state.martinis.length; ++i) {
    const martini = state.martinis[i];

    app.appendChild(createDrinkCard(martini));
  }
};

/*
We call render it:

1. Deletes the entire webpage.
2. Rewrite the page (from scratch). We rewrite the page, using state to guide us.
3. I let a user click something that CHANGES THE STATE.
// Repeats endlessly.

Our pages are just representations of state. Render is the thing that brings it to life by making it visible.
 */

render();
