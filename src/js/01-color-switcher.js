import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const DELAY_TIMER = 1000;

Notify.init({
  timeout: DELAY_TIMER,
  showOnlyTheLastOne: true,
  success: {
    background: '#000000',
  },
});

let intervalId = null;

stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', () => {
  Loading.dots();
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    Loading.remove();
    Notify.success(`Color ${randomColor}`);
    document.body.style.backgroundColor = randomColor;
  }, DELAY_TIMER);
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
