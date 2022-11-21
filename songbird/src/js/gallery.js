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

export let numberGroup = 0;

const birdsTypesBlockItems = Array.from(document.querySelectorAll('.type-birds-item-gallery'));

function checkTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === (num));
    choiceType.classList.add('item-gallery-active')
};

function removeTypeBirds(num) {
    let choiceType = birdsTypesBlockItems.find((item, index) => index === (num));
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
  });
};

createSlide(numberGroup);

const nextSlide = document.querySelector('.arrow-left');
const prevSlide = document.querySelector('.arrow-right');

nextSlide.classList.add('disabled');

let canChange = true;

prevSlide.addEventListener('click', () => {
  nextSlide.classList.remove('disabled');
  if(numberGroup < 4) {
    changeSlidePrev();
  } else if(numberGroup === 4) {
    changeSlidePrev();
    prevSlide.classList.add('disabled');
  };
});

nextSlide.addEventListener('click', () => {
  prevSlide.classList.remove('disabled');
  if(numberGroup > 1) {
    changeSlideNext()
  } else if(numberGroup === 1) {
    changeSlideNext()
    nextSlide.classList.add('disabled');
  };
});

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

//-------------show card-------------

// const slider = document.querySelector('.gallery-wrapper');
const back = document.querySelector('.background-gallery');
const cardImg = document.querySelector('.card-gallery-img');
const cardName = document.querySelector('.name-bird-gallery');
const cardType = document.querySelector('.type-bird-gallery');
const cardDescr = document.querySelector('.card-description-gallery');
const card =  document.querySelector('.card-bird-gallery-wrapper')

// let card;

slide.addEventListener('click', (event) => {
  if(event.target.offsetParent.classList.contains('bird-photo')) {
    const numberBird = event.target.id;
    const bird = birdsData[numberGroup][numberBird - 1];
    // card = document.createElement('div')
    // card.classList.add('card-bird-gallery-wrapper');
    cardImg.src = bird.image;
    cardName.textContent = bird.name;
    cardType.textContent = bird.species;
    cardDescr.textContent = bird.description;
    // card.innerHTML = `
    // <div class="card-body-gallery">
    //   <img class="card-gallery-img" alt="bird photo" src=${bird.image}>
    //   <div class="card-gallery-text">
    //     <span class="name-bird-gallery">${bird.name}</span>
    //     <span class="type-bird-gallery">${bird.species}</span>
    //     <div class="player-container-gallery">
    //       <button class="play-gallery player-icon-gallery"></button>
    //       <div class="progress-gallery">
    //         <div class="timeline-gallery">
    //           <div class="timeline-circle-gallery"></div>
    //         </div>
    //         <div class="player-time-gallery">
    //           <div class="timer-play-gallery"></div>
    //           <div class="duration-gallery"></div>
    //         </div>
    //       </div> 
    //     </div>
    //     <div class="player-volume-gallery">
    //         <button class="button-volume-gallery"></button>
    //         <input type="range" class="sound-volume-gallery" min="0" max="1" step="0.01">
    //     </div>
    //   </div>
    //   </div>
    // <span class="card-description-gallery">${bird.description}</span>`
    // slider.appendChild(card);
    back.classList.add('card-open');
    card.classList.add('show');
    getAudioGallery(bird)
  }
})

//--------close card---------------

back.addEventListener('click', () => {
  back.classList.remove('card-open');
  card.classList.remove('show');
  // card.parentNode.removeChild(card);
});

//-----------languadge----------

const languageSwitch = document.querySelector('.language-switch');
const languageRu = document.querySelector('.language-ru');
const languageEn = document.querySelector('.language-en');

languageEn.addEventListener('click', () => {
  birdsData = birdsDataEn;
});

languageRu.addEventListener('click', () => {
  birdsData = birdsDataRu;
});

languageSwitch.addEventListener('click', () => {
  if(languageSwitch.value === '1') {
    birdsData = birdsDataRu;
  } else {
    birdsData = birdsDataEn;
  }
});

//--------player----------

const playerGallery = document.querySelector('.player-container-gallery');
const audioTimeGallery = document.querySelector('.timer-play-gallery');
const audioDurationGallery = document.querySelector('.duration-gallery');
const playButtonGallery = document.querySelector('.player-icon-gallery');

const audioGallery = new Audio();

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

function getAudioGallery(bird) {
    playButtonGallery.classList.remove('pause-gallery');
    audioGallery.pause();
    isPlayGallery = false;
    audioGallery.src = bird.audio;
    audioTimeGallery.textContent = '0:00'
    audioGallery.addEventListener('canplay', () => {
        audioDurationGallery.textContent = getTimeCodeFromNum(audioGallery.duration);
    })
}

playerGallery.appendChild(audioGallery);
audioGallery.setAttribute('hidden', true);
let isPlayGallery = false;

function playAudioGallery() {
    if(isPlayGallery) {
        audioGallery.pause();
    } else {
        audioGallery.play();
    } 
    isPlayGallery = !isPlayGallery;
    playButtonGallery.classList.toggle('pause-gallery');
};

let durSoundGallery; 

audioGallery.addEventListener('canplay', () => {
    durSoundGallery = audioGallery.duration;
})

const progressBarGallery = document.querySelector('.timeline-gallery');
const progressPointGallery = document.querySelector('.timeline-circle-gallery');

function shiftProgressPointGallery(progr) {
    progressPointGallery.style.left = progr;
    progressBarGallery.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${progr}, rgb(197, 180, 156) ${progr}, rgb(197, 180, 156) 100%)`;
}

let canShiftGallery = true;

progressPointGallery.onmousedown = function(event) {
    canShiftGallery = false;
    event.preventDefault();

    let shiftX = event.clientX - progressPointGallery.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - progressBarGallery.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = progressBarGallery.offsetWidth; 
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      progressPointGallery.style.left = newLeft + 'px';
      let shiftPercent = newLeft / progressBarGallery.offsetWidth * 100 + '%';
      progressBarGallery.style.background = `linear-gradient(to right, rgb(153, 111, 69) 0%, rgb(157, 122, 89) ${shiftPercent}, rgb(197, 180, 156) ${shiftPercent}, rgb(197, 180, 156) 100%)`;
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      canShiftGallery = true;
      audioGallery.currentTime = (parseInt(progressPointGallery.style.left) / progressBarGallery.offsetWidth) * durSoundGallery;
      audioTimeGallery.textContent = getTimeCodeFromNum(audioGallery.currentTime);
    }

};

setInterval(() => {
    let progress = audioGallery.currentTime / durSoundGallery * 100 + "%";
    if(canShiftGallery){ 
    shiftProgressPointGallery(progress);
    }
    audioTimeGallery.textContent = getTimeCodeFromNum(audioGallery.currentTime);
}, 10);


playButtonGallery.addEventListener('click', () => {
    playAudioGallery();
});

const buttonVolumeGallery = document.querySelector('.button-volume-gallery');
const volumeSliderGallery = document.querySelector(".sound-volume-gallery");

audioGallery.volume = 0.75;
volumeSliderGallery.value = Number(audioGallery.volume);

volumeSliderGallery.addEventListener('click', e => {
    volumeSliderGallery.value === '0' ? buttonVolumeGallery.classList.add('button-volume-off-gallery') :  buttonVolumeGallery.classList.remove('button-volume-off-gallery');
    audioGallery.volume = volumeSliderGallery.value;
})

let pointVolumeGallery;

buttonVolumeGallery.addEventListener('click', () => {
    if(audioGallery.volume > 0) {
        pointVolumeGallery = audioGallery.volume;
        volumeSliderGallery.value = '0';
        audioGallery.volume = Number(volumeSliderGallery.value);
        buttonVolumeGallery.classList.add('button-volume-off-gallery');
    } else {
        buttonVolumeGallery.classList.remove('button-volume-off-gallery');
        volumeSliderGallery.value = pointVolumeGallery;
        audioGallery.volume = volumeSliderGallery.value;
    };
});