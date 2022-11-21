import '@/styles/main.scss';
import birdsDataRu from './birds_ru';
import birdsDataEn from './birds_en';
import {getLocalStorage, setLocalStorage, languageSelected} from './header'

const menuButton = document.querySelector('.menu-container');
const menuContainer = document.querySelector('.navigation-container');
const blur = document.querySelector('.background');

menuButton.addEventListener('click', () => {
  if(menuButton.classList.contains('menu-open')) {
      menuButton.classList.remove('menu-open');
      menuContainer.classList.remove('menu-open');
      blur.classList.remove('menu-open');
  } else {
      menuButton.classList.add('menu-open');
      menuContainer.classList.add('menu-open');
      blur.classList.add('menu-open');
  }
});

blur.addEventListener('click', () => {
  menuButton.classList.remove('menu-open');
  menuContainer.classList.remove('menu-open');
  blur.classList.remove('menu-open');
}); 

//---------gallery----------

let birdsData = getLocalStorage('language').label === 'en' ? birdsDataEn : birdsDataRu;

export let numberGroup = 1;

const birdsTypesBlockItems = Array.from(document.querySelectorAll('.type-birds-item-gallery'));

function checkTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === (num - 1));
    choiceType.classList.add('item-gallery-active')
};

function removeTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === (num - 1));
    choiceType.classList.remove('item-gallery-active')
};

checkTypeBirds(numberGroup);

const slide = document.querySelector('.birds-wrapper')

function createSlide(num) {
  birdsData[num].forEach(bird => {
    let item = document.createElement('div');
    item.classList.add('bird-photo');
    let img = new Image;
    item.appendChild(img);
    img.src = bird.image;
    img.classList.add('photo');
    img.id = bird.id;
    img.alt = bird.name;
    slide.appendChild(item)
  })
}

createSlide(numberGroup);

const prevSlide = document.querySelector('.arrow-left');
const nextSlide = document.querySelector('.arrow-right');

nextSlide.classList.add('disabled');

let canChange = true;

prevSlide.addEventListener('click', () => {
  nextSlide.classList.remove('disabled');
  if(numberGroup < 4) {
    changeSlidePrev()
  } else if(numberGroup === 4) {
    changeSlidePrev()
    prevSlide.classList.add('disabled');
  }
  console.log(numberGroup)
})

nextSlide.addEventListener('click', () => {
  prevSlide.classList.remove('disabled');
  if(numberGroup > 2) {
    changeSlideNext()
  } else if(numberGroup === 2) {
    changeSlideNext()
    nextSlide.classList.add('disabled');
  }
  console.log(numberGroup)
})

function changeSlidePrev() {
  if(canChange) {
    canChange = false;
    slide.classList.add('change');
    removeTypeBirds(numberGroup);
    numberGroup++
    checkTypeBirds(numberGroup);
    setTimeout(() => {
      slide.innerHTML = ''
      createSlide(numberGroup);
    }, 600)
    setTimeout(() => {
      slide.classList.remove('change');
      canChange = true ;
    }, 700)
  }
}

function changeSlideNext() {
  if(canChange) {
    canChange = false;
    slide.classList.add('change');
    removeTypeBirds(numberGroup);
    numberGroup--
    checkTypeBirds(numberGroup);
    setTimeout(() => {
      slide.innerHTML = ''
      createSlide(numberGroup);
    }, 600)
    setTimeout(() => {
      slide.classList.remove('change');
      canChange = true ;
    }, 700)
  }
}

const slider = document.querySelector('.gallery-wrapper');
const back = document.querySelector('.background-gallery')

slide.addEventListener('click', (event) => {
  if(event.target.offsetParent.classList.contains('bird-photo')) {
    const numberBird = event.target.id;
    const bird = birdsData[numberGroup][numberBird];
    let card = document.createElement('div')
    card.classList.add('card-bird-gallery-wrapper');
    card.innerHTML = `
    <div class="card-body-gallery">
      <img class="card-gallery-img" alt="bird photo" src=${bird.image}>
      <div class="card-gallery-text">
        <span class="name-bird-gallery">${bird.name}</span>
        <span class="type-bird-gallery">${bird.species}</span>
        <div class="player-container-gallery">
          <button class="play-gallery player-icon-gallery"></button>
          <div class="progress-gallery">
            <div class="timeline-gallery">
              <div class="timeline-circle-gallery"></div>
            </div>
            <div class="player-time-gallery">
              <div class="timer-play-gallery"></div>
              <div class="duration-gallery"></div>
            </div>
          </div> 
        </div>
        <div class="player-volume-gallery">
            <button class="button-volume-gallery"></button>
            <input type="range" class="sound-volume-gallery" min="0" max="1" step="0.01">
        </div>
      </div>
      </div>
    <span class="card-description-gallery">${bird.description}</span>`
    slider.appendChild(card);
    back.classList.add('card-open');
    card.classList.add('show');
    // card.classList.add()
  }
})

