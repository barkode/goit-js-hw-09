import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
  stopBtn.setAttribute('disabled', 'disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
