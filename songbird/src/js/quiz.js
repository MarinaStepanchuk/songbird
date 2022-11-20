import '@/styles/main.scss';

import birdsDataRu from './birds_ru';
import birdsDataEn from './birds_en';
import {getLocalStorage, setLocalStorage, languageSelected} from './header'

//-----load info birds------------

let birdsData = getLocalStorage('language').label === 'en' ? birdsDataEn : birdsDataRu;
export let numberGroup = 0;

const birdsTypesBlockItems = Array.from(document.querySelectorAll('.type-birds-item'));

function checkTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === num);
    choiceType.classList.add('item-active')
};

function removeTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === num);
    choiceType.classList.remove('item-active')
};

checkTypeBirds(numberGroup);

const nextLevelButton = document.querySelector('.next-level-button');
nextLevelButton.href = '#'
let canNextLevel = false;
// nextLevelButton.setAttribute('disabled', 'true');

//----------fill answer options block-------------

const itemsAswers = Array.from(document.querySelectorAll('.options-item'));

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

fillAnswers(numberGroup);

//--------player----------

const player = document.querySelector('.player-container');
const rigthAnswerImg = document.querySelector('.shadow-container');
const rigthAnswerName = document.querySelector('.answer');
const audioTime = document.querySelector('.timer-play');
const audioDuration = document.querySelector('.duration');
const playButton = document.querySelector('.player-icon');

const audio = new Audio();
player.appendChild(audio);
audio.setAttribute('hidden', true);
let isPlay = false;

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
};

function playAudio() {
    if(isPlay) {
        audio.pause();
    } else {
        audio.play();
    } 
    isPlay = !isPlay;
    playButton.classList.toggle('pause');
};

let durSound; 

audio.addEventListener('canplay', () => {
    durSound = audio.duration;
})

const progressBar = document.querySelector('.timeline');
const progressPoint = document.querySelector('.timeline-circle');

function shiftProgressPoint(progr) {
    progressPoint.style.left = progr;
    progressBar.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${progr}, rgb(197, 180, 156) ${progr}, rgb(197, 180, 156) 100%)`;
}

let canShift = true;

progressPoint.onmousedown = function(event) {
    canShift = false;
    event.preventDefault();

    let shiftX = event.clientX - progressPoint.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - progressBar.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = progressBar.offsetWidth; 
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      progressPoint.style.left = newLeft + 'px';
      let shiftPercent = newLeft / progressBar.offsetWidth * 100 + '%';
      progressBar.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${shiftPercent}, rgb(197, 180, 156) ${shiftPercent}, rgb(197, 180, 156) 100%)`;
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      canShift = true;
      console.log(parseInt(progressPoint.style.left))
      audio.currentTime = (parseInt(progressPoint.style.left) / progressBar.offsetWidth) * durSound;
      audioTime.textContent = getTimeCodeFromNum(audio.currentTime);
    }

};

setInterval(() => {
    let progress = audio.currentTime / durSound * 100 + "%";
    if(canShift){ 
    shiftProgressPoint(progress);
    }
    audioTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 10);


playButton.addEventListener('click', () => {
    playAudio();
});

const buttonVolume = document.querySelector('.button-volume');
const volumeSlider = document.querySelector(".sound-volume");

audio.volume = 0.75;
volumeSlider.value = Number(audio.volume);

volumeSlider.addEventListener('click', e => {
    volumeSlider.value === '0' ? buttonVolume.classList.add('button-volume-off') :  buttonVolume.classList.remove('button-volume-off');
    audio.volume = volumeSlider.value;
})

let pointVolume;

buttonVolume.addEventListener('click', () => {
    if(audio.volume > 0) {
        pointVolume = audio.volume;
        volumeSlider.value = '0';
        audio.volume = Number(volumeSlider.value);
        buttonVolume.classList.add('button-volume-off');
    } else {
        buttonVolume.classList.remove('button-volume-off');
        volumeSlider.value = pointVolume;
        audio.volume = volumeSlider.value;
    };
});

//-----------fill right answer block-----------
let numberRightAnswer;

const selectBird = () => {
    const number = getRandomNumber(0, 5);
    numberRightAnswer = number;
    return birdsData[numberGroup][number]
}

let rightAnswer = selectBird();

const fillRightAnswerBlock = () => {
    rigthAnswerImg.classList.remove('open-img');
    playButton.classList.remove('pause');
    audio.src = rightAnswer.audio;
    audio.addEventListener('canplay', () => {
        audioDuration.textContent = getTimeCodeFromNum(audio.duration);
    })
    audioTime.textContent = '0:00'
    rigthAnswerImg.classList.add('close-img');
    rigthAnswerImg.style.backgroundImage = `url('./assets/img/shadow.png')`
    rigthAnswerName.textContent = '********'
}

fillRightAnswerBlock();

//-------- score----------

const score = document.querySelector('.score');

score.textContent = 0;
let sum = 0;
let counter = 0;

//------choice bird----------

const birdsAnswersBlock = document.querySelector('.options-container');
const birdInfoName = document.querySelector('.name-bird');
const birdInfoType = document.querySelector('.type-bird');
const birdInfoDescr = document.querySelector('.card-description');
const birdInfoImg = document.querySelector('.card-img');


let canMark = true;

function getBirdByName(nameBird) {
    let birdInfo;
    birdsData[numberGroup].forEach(bird => {
        if(bird.name === nameBird) {
            birdInfo = bird;
        }
    })
    return birdInfo;
}

const fillInfo = (nameBird) => {
    let bird = getBirdByName(nameBird);
    birdInfoName.textContent = bird.name;
    birdInfoType.textContent = bird.species;
    birdInfoDescr.textContent = bird.description;
    birdInfoImg.src = bird.image;
}

const audioWrong = new Audio;
audioWrong.src = './assets/audio/guess.mp3';
const audioQuess = new Audio;
audioQuess.src = './assets/audio/wrong.mp3';
let arrayBirdsClick = [];

birdsAnswersBlock.addEventListener('click', event => {
    if(event.target.className!=='options-container'){
        let bird = event.target;
        let birdName = event.target.textContent;
        fillInfo(birdName);
        instructionBlock.classList.add('hide');
        infoBirdBlock.classList.remove('hide');
        getAudioMini(birdName);
        if(canMark) {
            if (!arrayBirdsClick.includes(bird.textContent)) {
                counter++;
            }
            if (birdName === rightAnswer.name) {
                canNextLevel = true;
                rigthAnswerImg.classList.remove('close-img');
                rigthAnswerImg.classList.add('open-img');
                rigthAnswerImg.style.backgroundImage = `url(${rightAnswer.image})`;
                rigthAnswerName.textContent = rightAnswer.name;
                nextLevelButton.classList.add('level-active');
                // nextLevelButton.removeAttribute('disabled');
                bird.classList.add('guess');
                audioWrong.pause();
                audioQuess.load();
                audioQuess.play();
                canMark = false;
                if(isPlay) {
                audio.pause();
                    isPlay = !isPlay;
                }
                playButton.classList.remove('pause');
                let calc = 6 - counter;
                sum += 6 - counter;
                counter = 0;
                arrayBirdsClick = [];
                score.textContent =`${score.textContent} + ${calc}`;
                setTimeout(() => score.textContent = sum, 800);
            } else {
                if (!arrayBirdsClick.includes(bird.textContent)) {
                    arrayBirdsClick.push(bird.textContent);
                }
                console.log(arrayBirdsClick)
                bird.classList.add('wrong');
                audioQuess.pause();
                audioWrong.load();
                audioWrong.play();
            };
        };
    };
});

window.addEventListener('beforeunload', () =>  {
    setLocalStorage('score', sum);
});

//--------fill info block--------------

const infoBirdBlock = document.querySelector('.card-bird-wrapper');
const instructionBlock = document.querySelector('.instructions');
infoBirdBlock.classList.add('hide');

//--------player-mini----------

const playerMini = document.querySelector('.player-container-mini');
const audioTimeMini = document.querySelector('.timer-play-mini');
const audioDurationMini = document.querySelector('.duration-mini');
const playButtonMini = document.querySelector('.player-icon-mini');

const audioMini = new Audio();

function getAudioMini(birdName) {
    playButtonMini.classList.remove('pause');
    audioMini.pause();
    isPlayMini = false;
    let bird = getBirdByName(birdName);
    audioMini.src = bird.audio;
    audioTimeMini.textContent = '0:00'
    audioMini.addEventListener('canplay', () => {
        audioDurationMini.textContent = getTimeCodeFromNum(audioMini.duration);
    })
}

playerMini.appendChild(audioMini);
audioMini.setAttribute('hidden', true);
let isPlayMini = false;

function playAudioMini() {
    if(isPlayMini) {
        audioMini.pause();
    } else {
        audioMini.play();
    } 
    isPlayMini = !isPlayMini;
    playButtonMini.classList.toggle('pause');
};

let durSoundMini; 

audioMini.addEventListener('canplay', () => {
    durSoundMini = audioMini.duration;
})

const progressBarMini = document.querySelector('.timeline-mini');
const progressPointMini = document.querySelector('.timeline-circle-mini');

function shiftProgressPointMini(progr) {
    progressPointMini.style.left = progr;
    progressBarMini.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${progr}, rgb(197, 180, 156) ${progr}, rgb(197, 180, 156) 100%)`;
}

let canShiftMini = true;

progressPointMini.onmousedown = function(event) {
    canShiftMini = false;
    event.preventDefault();

    let shiftX = event.clientX - progressPointMini.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - progressBarMini.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = progressBarMini.offsetWidth; 
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      progressPointMini.style.left = newLeft + 'px';
      let shiftPercent = newLeft / progressBarMini.offsetWidth * 100 + '%';
      progressBarMini.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${shiftPercent}, rgb(197, 180, 156) ${shiftPercent}, rgb(197, 180, 156) 100%)`;
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      canShiftMini = true;
      audioMini.currentTime = (parseInt(progressPointMini.style.left) / progressBarMini.offsetWidth) * durSound;
      audioTimeMini.textContent = getTimeCodeFromNum(audioMini.currentTime);
    }

};

setInterval(() => {
    let progress = audioMini.currentTime / durSoundMini * 100 + "%";
    if(canShiftMini){ 
    shiftProgressPointMini(progress);
    }
    audioTimeMini.textContent = getTimeCodeFromNum(audioMini.currentTime);
}, 10);


playButtonMini.addEventListener('click', () => {
    playAudioMini();
});

const buttonVolumeMini = document.querySelector('.button-volume-mini');
const volumeSliderMini = document.querySelector(".sound-volume-mini");

audioMini.volume = 0.75;
volumeSliderMini.value = Number(audioMini.volume);

volumeSliderMini.addEventListener('click', e => {
    volumeSliderMini.value === '0' ? buttonVolumeMini.classList.add('button-volume-off') :  buttonVolumeMini.classList.remove('button-volume-off');
    audioMini.volume = volumeSliderMini.value;
})

let pointVolumeMini;

buttonVolumeMini.addEventListener('click', () => {
    if(audioMini.volume > 0) {
        pointVolumeMini = audioMini.volume;
        volumeSliderMini.value = '0';
        audioMini.volume = Number(volumeSliderMini.value);
        buttonVolumeMini.classList.add('button-volume-off');
    } else {
        buttonVolumeMini.classList.remove('button-volume-off');
        volumeSliderMini.value = pointVolumeMini;
        audioMini.volume = volumeSliderMini.value;
    };
});

//---------next level-----------

nextLevelButton.addEventListener('click', () => {
    if(!canNextLevel) {
        return;
    }
    canNextLevel = false;
    if(numberGroup === 5) {
        nextLevelButton.href = './score.html'
        return
    }
    birdsData = languageSelected === 'en' ? birdsDataEn : birdsDataRu;
    nextLevelButton.classList.remove('level-active');
    removeTypeBirds(numberGroup)
    numberGroup++;
    checkTypeBirds(numberGroup);
    itemsAswers.forEach(item => {
        item.className = '';
        item.classList.add('options-item')
    });
    canMark = true;
    fillAnswers(numberGroup);
    infoBirdBlock.classList.add('hide');
    instructionBlock.classList.remove('hide');
    rightAnswer = selectBird()
    fillRightAnswerBlock();
    audioMini.pause();
    isPlayMini = false;
})

// function startQuiz() {
//     birdsData = languageSelected === 'en' ? birdsDataEn : birdsDataRu;
//     nextLevelButton.setAttribute('disabled', 'true');
//     nextLevelButton.classList.remove('level-active');
//     removeTypeBirds(numberGroup)
//     numberGroup = 0;
//     sum = 0;
//     counter = 1;
//     checkTypeBirds(numberGroup);
//     itemsAswers.forEach(item => {
//         item.className = '';
//         item.classList.add('options-item')
//     })
//     canMark = true;
//     fillAnswers(numberGroup);
//     infoBirdBlock.classList.add('hide');
//     instructionBlock.classList.remove('hide');
//     rightAnswer = selectBird()
//     fillRightAnswerBlock();
//     audioMini.pause();
//     isPlayMini = false;
// }


//----change language--------------

const languageSwitch = document.querySelector('.language-switch');
const languageRu = document.querySelector('.language-ru');
const languageEn = document.querySelector('.language-en');

languageEn.addEventListener('click', () => {
    changeLangQuiz('en');
    languageSwitch.value = '0';
});
  
languageRu.addEventListener('click', () => {
    changeLangQuiz('ru');
    languageSwitch.value = '1';
});
  
languageSwitch.addEventListener('click', () => {
    let language = languageSwitch.value === '1' ? 'ru' : 'en';
    changeLangQuiz(language);
});

function changeLangQuiz(lang) {
    itemsAswers.forEach(item => {
        if(lang === 'en') {
            birdsDataRu[numberGroup].forEach((elem, index) => {
                if(elem.name === item.textContent) {
                    item.textContent = birdsDataEn[numberGroup][index].name;
                    birdInfoName.textContent = birdsDataEn[numberGroup][index].name;
                    birdInfoType.textContent = birdsDataEn[numberGroup][index].species;
                    birdInfoDescr.textContent = birdsDataEn[numberGroup][index].description;
                };
            });
            birdsData = birdsDataEn;
        } else {
            birdsDataEn[numberGroup].forEach((elem, index) => {
                if(elem.name === item.textContent) {
                    item.textContent = birdsDataRu[numberGroup][index].name;
                    birdInfoName.textContent = birdsDataRu[numberGroup][index].name;
                    birdInfoType.textContent = birdsDataRu[numberGroup][index].species;
                    birdInfoDescr.textContent = birdsDataRu[numberGroup][index].description;
                };
            });
            birdsData = birdsDataRu;
        };
    });

    if(lang === 'en') {
        birdsDataRu[numberGroup].forEach((elem, index) => {
            if(elem.name === rightAnswer.name) {
                rightAnswer = birdsDataEn[numberGroup][index].name
            }
        });
        birdsData = birdsDataEn;
    } else {
        birdsDataEn[numberGroup].forEach((elem, index) => {
            if(elem.name === rightAnswer.name) {
                rightAnswer = birdsDataRu[numberGroup][numberRightAnswer]
            }
        });
    };
    rightAnswer = birdsData[numberGroup][numberRightAnswer];
    if(!canMark) {
        rigthAnswerName.textContent = rightAnswer.name;   
    }   
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