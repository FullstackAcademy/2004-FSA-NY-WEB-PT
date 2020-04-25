const app = document.querySelector('#app');
app.classList.add('flex_column');

const header = document.createElement('h1');

header.innerText = 'My favorite things about earth!';

app.append(header);

const imageContainer = document.createElement('div');
imageContainer.classList.add('flex_row');
imageContainer.style.height = '250px';

app.append(imageContainer);

const BEACH_URL = 'https://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg';
const OXYGEN_URL = 'https://www.birchbox.com/images/uploads/June_Oxygen_Skincare_Trend_700x400.jpg';
const COFFEE_URL = 'https://cdn.cnn.com/cnnnext/dam/assets/181127101933-health-of-coffee-exlarge-169.jpg';
const BEER_URL = 'https://static.vinepair.com/wp-content/uploads/2019/08/weasked10_header-2.jpg';

const createCard = (imgUrl) => {
  // const container = document.createElement('div');

  const image = document.createElement('div');

  image.setAttribute(
    'style',
    `
    height: 250px;
    width: 250px;
    background-image: url('${imgUrl}'); 
    background-size: cover;
    `,
  );

  // container.append(image);

  return image;
};

const allImages = [BEACH_URL, OXYGEN_URL, COFFEE_URL, BEER_URL];

allImages.forEach((imageUrl) => {
  imageContainer.appendChild(createCard(imageUrl));
});

// CSS
// Flex is a parent-child system. Parents define direction and spacing.
// Children define specifics about themselves.

// The core three parts to any flex system.
// You decide on a parent, you tell it to be a flex container (display: flex;)
// You then decide the direction the children should flow inside the flex-container, you do this by saying flex-direction (flex-direction: column | row;)
// The final bit is to specify how you want that direction to resolve itself, e.g. start, center space-between. We do this for the main axis (the direction you chose) using justify-content. We do this for the off-axis (the direction you did not choose) by using align-items. There are a lot of options for those but the common ones are: flex-start, center, space-evenly.
