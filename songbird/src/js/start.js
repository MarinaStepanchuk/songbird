import '@/styles/main.scss'

const video = document.querySelector('.preview-video');
video.muted = false;
video.addEventListener('click', () => {
    console.log(1)
    video.muted = false;
})