import GuitarBuffer from './buffer';
import Guitar from './guitar';
import sounds from './sounds';

const context = new (window.AudioContext || window.webkitAudioContext)();
const buffer = new GuitarBuffer(context, sounds);
buffer.getBuffer();

let guitar = null;
let preset = 0;

function playGuitar() {
    const index = Number(this.dataset.note) + preset;
    guitar = new Guitar(context, buffer.getSound(index));
    guitar.play();
}

function stopGuitar() {
    guitar.stop();
}

const buttons = document.querySelectorAll('.notes .note');
buttons.forEach((button) => {
    button.addEventListener('mouseenter', playGuitar.bind(button));
    button.addEventListener('mouseleave', stopGuitar);
});

const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const rewind = document.querySelector('.rewind');
const circle = document.querySelector('.circle');

function playTrack() {
    play.querySelector('.pause-icon').style.display = 'block';
    play.querySelector('.play-icon').style.display = 'none';
}

function pauseTrack() {
    play.querySelector('.pause-icon').style.display = 'none';
    play.querySelector('.play-icon').style.display = 'block';
}

audio.addEventListener('pause', pauseTrack);
audio.addEventListener('play', playTrack);

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playTrack();
    } else {
        audio.pause();
        pauseTrack();
    }
});

rewind.addEventListener('click', () => {
    audio.currentTime = 0;
});

circle.addEventListener('click', () => {
    preset = (preset === 0) ? 15 : 0;
    circle.classList.toggle('rock');
});

audio.addEventListener('ended', () => {
    pauseTrack();
});

export default Guitar;
