//Obtener los elementos del DOM
const player =  document.querySelector('.player');
const video =  player.querySelector('.viewer');
const progress =  player.querySelector('.progress');
const progressBar =  player.querySelector('.progress__filled');
const toggle =  player.querySelector('.toggle');
const fullScreenButton =  player.querySelector('.fullScreen');
const skipButtons =  player.querySelectorAll('[data-skip]');
const ranges =  player.querySelectorAll('.player__slider');
let mouseDown = false;

//Construir las funciones

function togglePlay() {
  // if (video.paused) {
  //   video.play();
  // }
  // else{
  //   video.pause();
  // }
  const method = video.paused ? 'play' : 'pause'; //version corta aunque mas dificil de leer
  video[method]();
}

function toggleButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeRanges() {
  video[this.name] = this.value; //asi se asocia valor a una propiedad
  //se puede buscar hacer algo para que solo se dispare cuando se de click
}

function handleProgress() {
  const percent = (video.currentTime/video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; //asi se asocia valor a un estilo
}

function scrub(e) {
  const scrub = (e.offsetX * video.duration) / progress.offsetWidth;
  video.currentTime = scrub;
}

function fullScreen() {
  if (document.fullscreen) {
    document.exitFullscreen();
  }
  else{
    player.requestFullscreen();
  }
}

//Asociar los listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', changeRanges));
ranges.forEach(range => range.addEventListener('mousemove', changeRanges));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullScreenButton.addEventListener('click', fullScreen);
