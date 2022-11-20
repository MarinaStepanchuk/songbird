import '@/styles/main.scss';
import {getLocalStorage} from './header.js';

const sum = getLocalStorage('score')

const scoreSum = document.querySelector('.score-sum');
const buttonPlayAgain = document.querySelector('.button-play-again')
scoreSum.innerHTML = sum;
buttonPlayAgain.classList.add('hide');

if(sum < 30) {
    buttonPlayAgain.classList.remove('hide');
}

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