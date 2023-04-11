import { Notify } from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');
const TIMER_DELAY = 1000;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    }
    btnStart.disabled = false;
  },
};

btnStop.disabled = true;
btnStart.disabled = true;
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);

const fp = flatpickr('#datetime-picker', options);

function startTimer() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    const timerTime = fp.selectedDates[0] - new Date();
    if (timerTime <= 0) {
      clearInterval(timerId);
      Notify.success('TIME IS OFF!!!!');
      btnStop.disabled = true;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    fieldDays.textContent = addLeadingZero(days);
    fieldHours.textContent = addLeadingZero(hours);
    fieldMinutes.textContent = addLeadingZero(minutes);
    fieldSeconds.textContent = addLeadingZero(seconds);
  }, TIMER_DELAY);
}

function stopTimer() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  Notify.failure('Countdows stoped.');
  clearInterval(timerId);
  fieldDays.textContent = '00';
  fieldHours.textContent = '00';
  fieldMinutes.textContent = '00';
  fieldSeconds.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
