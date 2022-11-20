import '@/styles/main.scss'
import {getLocalStorage} from './header'

const sum = getLocalStorage('score')

const scoreSum = document.querySelector('.score-sum');
const buttonPlayAgain = document.querySelector('.button-play-again')
scoreSum.innerHTML = sum;
buttonPlayAgain.classList.add('hide');

if(sum < 30) {
    buttonPlayAgain.classList.remove('hide');
}