import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timerContainer = document.querySelector('.timer');
const refs = {
    dateTimeInput:document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    timerItems: timerContainer.querySelectorAll('.field'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minutesCounter: document.querySelector('[data-minutes]'),
    secondsCounter: document.querySelector('[data-seconds]'),
};

let date = new Date();
let currenTime =  date.getTime();
let remainigTime = null
let dateSelected = null;
let timerId = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    enableSeconds: true,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      dateSelected = selectedDates[0].getTime()
      checkingDate();
      console.log(dateSelected > currenTime);
    
      return dateSelected;
    },
  };
const fp = flatpickr(refs.dateTimeInput, options);

function checkingDate (){
  currenTime < dateSelected ? 
  refs.startBtn.removeAttribute('disabled') :
  alert('Please choose the date in the future')
}

function handleStartBtn (event) {
  event.currentTarget.setAttribute ('disabled','true');
  refs.dateTimeInput.setAttribute('disabled','true');
  timerId = setInterval (showTimeInFields,1000);
  setInterval (counterStopper,1000)
}

function showTimeInFields () {
  calculateRemainTimeConvert();
  refs.daysCounter.textContent = addLeadingZero(remainigTime.days);
    refs.hoursCounter.textContent = addLeadingZero(remainigTime.hours);
    refs.minutesCounter.textContent = addLeadingZero(remainigTime.minutes);
    refs.secondsCounter.textContent = addLeadingZero(remainigTime.seconds);
    
}

function calculateRemainTimeConvert () {
  date = new Date();
  currenTime = date.getTime();
  remainigTime = convertMs(dateSelected - currenTime);
  return remainigTime;
  // return currenTime - dateSelected
};

function counterStopper (){
  if ( remainigTime.days === 0 && 
    remainigTime.hours === 0 && 
    remainigTime.minutes === 0 && 
    remainigTime.seconds === 0) {
    clearInterval(timerId)}
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

  // convertedTime = {days, hours, minutes, seconds};

  return {days, hours, minutes, seconds};
}

function addLeadingZero(value) {  
  if (value < 10 ) {
    value = '0'.concat(value.toString());
    return value
  }
  return value
}


refs.dateTimeInput.addEventListener('click',() => {fp});
refs.startBtn.addEventListener('click', handleStartBtn)


