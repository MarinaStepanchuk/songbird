(()=>{"use strict";var __webpack_modules__={561:()=>{eval("\r\n\r\n//----------volume video------------\r\n\r\nconst volume = document.querySelector('.sound-switcher-container');\r\nconst volumeImg = document.querySelector('.sound-switcher-icon')\r\nconst video = document.querySelector('.preview-video');\r\n\r\nlet soundOff = true;\r\n\r\nvolume.addEventListener('click', () => {\r\n    if(soundOff) {\r\n        volumeImg.src = './assets/img/volume-icon-on.svg';\r\n        volumeOn();\r\n        video.muted = false;\r\n    } else {\r\n        volumeImg.src = './assets/img/volume-icon-off.svg';\r\n        volumeOff(); \r\n    }\r\n});\r\n\r\nconst volumeOff = () => {\r\n    video.volume = 0;\r\n    soundOff = true;\r\n};\r\n\r\nconst volumeOn = () => {\r\n    video.volume =1;\r\n    soundOff = true;\r\n    soundOff = false;\r\n};\r\n\r\nconst menuButton = document.querySelector('.menu-container');\r\nconst menuContainer = document.querySelector('.navigation-container');\r\nconst blur = document.querySelector('.background');\r\n\r\nmenuButton.addEventListener('click', () => {\r\n    console.log(1)\r\n  if(menuButton.classList.contains('menu-open')) {\r\n      menuButton.classList.remove('menu-open');\r\n      menuContainer.classList.remove('menu-open');\r\n      blur.classList.remove('menu-open');\r\n  } else {\r\n      menuButton.classList.add('menu-open');\r\n      menuContainer.classList.add('menu-open');\r\n      blur.classList.add('menu-open');\r\n  }\r\n});\r\n\r\nblur.addEventListener('click', () => {\r\n  menuButton.classList.remove('menu-open');\r\n  menuContainer.classList.remove('menu-open');\r\n  blur.classList.remove('menu-open');\r\n});\n\n//# sourceURL=webpack:///./js/start.js?")}},__webpack_exports__={};__webpack_modules__[561]()})();