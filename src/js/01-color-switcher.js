const refs = {
    buttonsBox: document.querySelector ('.start-stop-buttons'),
    buttons: document.querySelectorAll('button'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.buttonsBox.addEventListener('click', changeButtonStatus);

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(changeBgColor,1000);
});

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
});

function changeButtonStatus () {
    refs.buttons.forEach(element => {
        element.hasAttribute('disabled') ?
        element.removeAttribute('disabled') :
        element.setAttribute ('disabled','true')
})
};

function changeBgColor () {
    document.body.style.backgroundColor = getRandomHexColor();
};


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };