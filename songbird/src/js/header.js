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
  }
};

const elements = document.querySelectorAll('.lang');
const languageSwitch = document.querySelector('.language-switch');
const languageRu = document.querySelector('.language-ru');
const languageEn = document.querySelector('.language-en');

let languageSelected = 'en';

languageEn.addEventListener('click', () => {
  changeLang('en');
  languageSwitch.value = '0';
});

languageRu.addEventListener('click', () => {
  changeLang('ru');
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

//----------volume------------

const volume = document.querySelector('.sound-switcher-container');
const volumeImg = document.querySelector('.sound-switcher-icon')

let soundOff = true;

volume.addEventListener('click', () => {
  if(soundOff) {
    volumeImg.src = './assets/img/volume-icon-on.svg';
    volumeOn();
  } else {
    volumeImg.src = './assets/img/volume-icon-off.svg';
    volumeOff(); 
  }
});

const soundElements = Array.from(document.getElementsByTagName('audio'));
const videoElements = Array.from(document.getElementsByTagName('video'));

const volumeOff = () => {
  soundElements.forEach(item => item.volume = 0);
  videoElements.forEach(item => item.volume = 0);
  soundOff = true;
};

const volumeOn = () => {
  soundElements.forEach(item => item.volume = 1);
  videoElements.forEach(item => item.volume = 1);
  soundOff = false;
};

//-----------Local storage-------------

function setLocalStorage(key, value) {
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
  if(getLocalStorage('soundOff')) {
    volumeImg.src = './assets/img/volume-icon-off.svg';
    volumeOff();
  } else {
    volumeImg.src = './assets/img/volume-icon-on.svg';
    volumeOn();
  }
});