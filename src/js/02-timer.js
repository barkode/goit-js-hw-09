import { Notify } from 'notiflix';
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
let timerTimeChoise = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerTimeChoise = selectedDates[0];
    if (timerTimeChoise < Date.now()) {
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

flatpickr('#datetime-picker', options);

function startTimer() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    const endTime = timerTimeChoise - Date.now();
    if (endTime <= 0) {
      clearInterval(timerId);
      Notify.success('TIME IS OFF!!!!');
      btnStop.disabled = true;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(endTime);
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
