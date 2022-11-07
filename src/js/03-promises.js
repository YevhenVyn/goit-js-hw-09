const formContainer = document.querySelector('.form')
const refs = {
  inputDelay: formContainer.querySelector('[name = delay]'),
  inputStep: formContainer.querySelector('[name = step]'),
  inputAmount: formContainer.querySelector('[name = amount]'),
  btnSub: formContainer.querySelector('[type= submit]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  })
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }).catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  })
}

function handleBtnSub (event) {
  event.preventDefault();
  startPromiseCycle(getInputValues(),createPromise)
}

function startPromiseCycle(obj,fn){
  let currentDelay = obj.delay;
  for (let i = 1; i <= obj.amount; i+=1) {
    fn(i,currentDelay);
    currentDelay = currentDelay + obj.step
  }
}

function getInputValues () {
return {
    delay: Number(refs.inputDelay.value),
    step: Number(refs.inputStep.value), 
    amount: refs.inputAmount.value,
    // test: 'test',
  }
}

refs.btnSub.addEventListener('click', handleBtnSub);