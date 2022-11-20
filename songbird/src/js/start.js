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