import '@/styles/main.scss';

//----------volume video------------

const volume = document.querySelector('.sound-switcher-container');
const volumeImg = document.querySelector('.sound-switcher-icon')
const video = document.querySelector('.preview-video');

let soundOff = true;

volume.addEventListener('click', () => {
    if(soundOff) {
        volumeImg.src = './assets/img/volume-icon-on.svg';
        volumeOn();
        video.muted = false;
    } else {
        volumeImg.src = './assets/img/volume-icon-off.svg';
        volumeOff(); 
    }
});

const volumeOff = () => {
    video.volume = 0;
    soundOff = true;
};

const volumeOn = () => {
    video.volume =1;
    soundOff = true;
    soundOff = false;
};

const menuButton = document.querySelector('.menu-container');
const menuContainer = document.querySelector('.navigation-container');
const blur = document.querySelector('.background');

menuButton.addEventListener('click', () => {
    console.log(1)
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