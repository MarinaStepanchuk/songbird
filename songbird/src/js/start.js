import '@/styles/main.scss'

const video = document.querySelector('.preview-video');
video?.addEventListener('click', () => {
    video.muted = false;
})