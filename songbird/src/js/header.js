// import {library} from './list.js';

//--------change language-----------

const library = {
  'en': {
    'pageHome': 'Home',
    'pageQuiz': 'Quiz',
    'pageGallery': 'Gallery',
    'titleStart': 'onlive quiz',
    'startButton': 'start quiz',
    'textStart1': 'Humans are surrounded by a huge variety of sounds. Some of the most pleasant are the sounds of nature, of which birdsongs are a part.',
    'textStart2': ' - How many birds do you know?',
    'textStart3': ' - How well developed is your hearing?',
    'textStart4': ' - Do you hear more than other?',
    'textStart5': ' - Can you identify a bird by its song?',
    'textStart6': 'Press start and take the quiz!',
    'titleQuiz1': 'Warm-up',
    'titleQuiz2': 'Sparrows',
    'titleQuiz3': 'Forest birds',
    'titleQuiz4': 'Songbirds',
    'titleQuiz5': 'Predator birds',
    'titleQuiz6': 'Sea birds',
    'score': 'Score:',
    'nextLevel': 'Next level',
    'instrText1': 'Listen to the player.',
    'instrText2': 'And select a bird from the list.',
    'instrText3': 'Each attempt will cost you 1 point.',
    'congratulationsTitle': 'Congratulations!',
    'congratulationsText1': 'You took the quiz and scored ',
    'congratulationsText2': ' out of a possible 30 points.',
    'buttonPlayAgain': 'try again',
    'buttonGoHome': 'home page',
  },
    'ru': {
      'pageHome': 'Главная',
      'pageQuiz': 'Викторина',
      'pageGallery': 'Галерея',
      'titleStart': 'онлайн викторина',
      'startButton': 'старт',
      'textStart1': 'Человека окружает огромное разнообразие звуков. Одни из самых приятных - звуки природы, частью которых являются птицы.',
      'textStart2': ' - Как много птиц ты знаешь?',
      'textStart3': ' - Как хорошо развит твой слух?',
      'textStart4': ' - Слышишь ли ты больше, чем другие?',
      'textStart5': ' - Узнаешь ли ты птицу по ее пению?',
      'textStart6': 'Жми старт и начни викторину!',
      'titleQuiz1': 'Разминка',
      'titleQuiz2': 'Воробьиные',
      'titleQuiz3': 'Лесные птицы',
      'titleQuiz4': 'Певчие птицы',
      'titleQuiz5': 'Хищные птицы',
      'titleQuiz6': 'Морские птицы',
      'score': 'Баллы:',
      'nextLevel': 'Следующий уровень',
      'instrText1': 'Прослушайте плеер.',
      'instrText2': 'Выберите птицу из списка.',
      'instrText3': 'Каждая попытка будет стоить вам 1 балл.',
      'congratulationsTitle': 'Поздравляем!',
      'congratulationsText1': 'Вы прошли викторину и набрали ',
      'congratulationsText2': ' из 30 возможных баллов',
      'buttonPlayAgain': 'Попробовать еще раз',
      'buttonGoHome': 'Вернуться на главную',
  }
};

const elements = document.querySelectorAll('.lang');
const languageSwitch = document.querySelector('.language-switch');
const languageRu = document.querySelector('.language-ru');
const languageEn = document.querySelector('.language-en');

export let languageSelected = 'en';

languageEn.addEventListener('click', () => {
  changeLang('en');
  languageSelected = 'en';
  languageSwitch.value = '0';
});

languageRu.addEventListener('click', () => {
  changeLang('ru');
  languageSelected = 'ru';
  languageSwitch.value = '1';
});

languageSwitch.addEventListener('click', () => {
  languageSelected = languageSwitch.value === '1' ? 'ru' : 'en';
    changeLang(languageSelected);
});

function changeLang (lang) {
  let arrayElements = Array.from(elements);
  
  arrayElements.forEach(function(item, index) {
    item.textContent = library[lang][item.getAttribute('key')];
  });
};



//-----burger-menu---------

// const menuButton = document.querySelector('.menu-container');
// const menuContainer = document.querySelector('.navigation-container');
// const blur = document.querySelector('.background');

// menuButton.addEventListener('click', () => {
//   if(menuButton.classList.contains('menu-open')) {
//       menuButton.classList.remove('menu-open');
//       menuContainer.classList.remove('menu-open');
//       blur.classList.remove('menu-open');
//   } else {
//       menuButton.classList.add('menu-open');
//       menuContainer.classList.add('menu-open');
//       blur.classList.add('menu-open');
//   }
// });

// blur.addEventListener('click', () => {
//   menuButton.classList.remove('menu-open');
//   menuContainer.classList.remove('menu-open');
//   blur.classList.remove('menu-open');
// });

//-----------Local storage-------------

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export function getLocalStorage(key) {
  if(localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
  }
  return '';
};

window.addEventListener('beforeunload', () =>  {
  setLocalStorage('language', {label: languageSelected, code: languageSwitch.value});
  setLocalStorage('soundOff', soundOff);
});

window.addEventListener('load', () => {
  if(getLocalStorage('language').label) {
      languageSelected = getLocalStorage('language').label;
  } else {
      languageSelected = 'en';
  }
  if(getLocalStorage('language').code) {
      languageSwitch.value = getLocalStorage('language').code;
  } else {
      languageSwitch.value = '0' ;
  }
  changeLang(languageSelected);
  // if(getLocalStorage('soundOff')) {
  //   if(volumeImg) {
  //     volumeImg.src = './assets/img/volume-icon-off.svg';
  //     volumeOff();
  //   }
  // } else {
  //   if(volumeImg) {
  //     volumeImg.src = './assets/img/volume-icon-on.svg';
  //     volumeOn();
  //   }
  // }
});