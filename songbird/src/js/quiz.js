import birdsDataRu from './birds_ru';
import birdsDataEn from './birds_en';
import {languageSelected} from './header'

// window.addEventListener('load', () =>  {
//     birdsPanel.firstElementChild.classList.add('item-active');
// });

// let numberGroup;
// elementsPanel.forEach((element, index) => {
//     if(element.classList.contains('item-active')) {
//         numberGroup = index;
//     }
// })

const birdsPanel = document.querySelector('.type-birds-container');
const itemsAswers = Array.from(document.querySelectorAll('.response-option'));
birdsPanel.firstElementChild.classList.add('item-active');
let birdsData = languageSelected === 'en' ? birdsDataEn : birdsDataRu;
let numberGroup = 0;

const fillAnswers = (numberGr) => {
    let birdsShuffle = shuffle(birdsData[numberGr]);
    for (let i = 0; i < itemsAswers.length; i++) {
        itemsAswers[i].textContent = birdsShuffle[i].name
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffle(array) {
    let arrayShuffle = array.map(item => item);
    for (let i = arrayShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrayShuffle[i], arrayShuffle[j]] = [arrayShuffle[j], arrayShuffle[i]];
    };
    return arrayShuffle;
}

const selectBird = () => {
    const number = getRandomNumber(0, 5);
    return birdsData[numberGroup][number]
}

fillAnswers(numberGroup);
let rightAnswer = selectBird();







const player = document.querySelector('.player-container');
const rigthAnswerImg = document.querySelector('.shadow-container');
const audio = new Audio();
player.appendChild(audio);
audio.setAttribute('hidden', true);
let isPlay = false;


const fillRightAnswerBlock = () => {
    
    audio.src = rightAnswer.audio;
    // rigthAnswerImg.style.backgroundImage = `url(${rightAnswer.image})`
    rigthAnswerImg.classList.add('close-img');
    rigthAnswerImg.style.backgroundImage = `url('../assets/img/shadow.png')`
}

fillRightAnswerBlock();