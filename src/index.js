/* ----------------------------------- Imports for Webpack to make dist folder -------------------------------------- */
// COMMENT WHEN TESTING!! HAVE NOT SET UP JEST WITH BABEL FOR BUILD PRODUCTION UNCOMMENT
// import './main.css';

// const importAll = require =>
//   require.keys().reduce((acc, next) => {
//     acc[next.replace("./", "")] = require(next);
//     return acc;
//   }, {});

// const images = importAll(
//   require.context("./assets", false, /\.(jpe?g|png|gif|svg)$/)
// );

/* ----------------------------------- Credit Card Validation -------------------------------------- */
const insertHyphen = (elm) => {
  let cardNumber = elm.value;
  let formatNumber = cardNumber.split('-').join('');
  if (formatNumber.length > 0) {
    formatNumber = formatNumber.match(new RegExp('.{1,4}', 'g')).join('-');
  }
  return elm.value = formatNumber;
}

const validateCreditCardNumber = (cardNumber) => {
  cardNumber = String(cardNumber);
  const length = cardNumber.length;
  if (length === 0) {
    return false;
  }
  let count = 0;

  /* Traverse the whole credit card number. If index + 1 is even, double the value.
  If above 9 then adjust value */
  for (let i = 0; i < length; i++) {
    let currentDigit = parseInt(cardNumber[i]);
    if ( (i+2) % 2 === 0) {
      if ((currentDigit *= 2) > 9) {
        currentDigit -= 9;
      }
    }
    count += currentDigit;
  }

  return (count % 10) === 0;
}


const cardType = (cardNumber) => { // returns card type image; should not rely on this for checking if a card is valid
  if (typeof cardNumber !== 'string') {
    throw Error('MUST BE A STRING OF NUMBERS');
  }
  if (cardNumber === '') {
    null
  }
	cardNumber = cardNumber.split(' ').join("");
  const types = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  }
  for(const type in types) {
    if(types[type].test(cardNumber)) {
      return type;
    }
  }
	return null;
};

const noInputScenario = (image) => image.setAttribute('hidden', true);

const luhnAlgorithm = (elm) => {
  let cardNumber = elm.value;
  elm.value = cardNumber.replace(/[^-\d]/g, '');
  cardNumber = cardNumber.replace(/\-/g, '');

  const imgCard = document.getElementById('imgCard');

  insertHyphen(elm)
  if (validateCreditCardNumber(cardNumber)) {
    if (cardNumber.length > 0) {
      imgCard.removeAttribute('hidden');
      const p = document.querySelector('p[data-paragraph="card"');
      if (p) {
        p.remove();
      }
      imgCard.src = './assets/' + (cardType(cardNumber) || 'other') + '.png';
      return true;
    } else {
      noInputScenario(imgCard);
      return false;
    }
  } else {
    noInputScenario(imgCard);
    return false;
  }
}

/* ----------------------------------- FORM SUBMISSION -------------------------------------- */

const removeElm = (type) => {
  const elm = document.querySelector(`p[data-paragraph="${type}"]`);
  if (elm !== null) {
    elm.remove();
    return true;
  }
  return false;
}

const insertAfter = (type) => {
  if (document.querySelector(`p[data-paragraph="${type}"]`)) {
    return;
  }
  const upperElm = document.querySelector(`input[name="${type}"]`);
  const p = document.createElement('p');

  p.classList.add('p-info');
  p.classList.add('fs-300');
  p.setAttribute('data-paragraph', type);

  if (type === 'name') {
    p.innerText = 'Please include your first and last name';
  } else if (type === 'email') {
    p.innerText = 'Please use a valid email address'
  } else {
    if (upperElm.value !== '') {
      p.innerText = 'Sorry that card number was invalid'
    } else {
      p.innerText = 'Enter your card number'
    }
  }
  upperElm.insertAdjacentElement('afterend', p);
  return p;
}

const successColours = (type) => {
  const input = document.querySelector(`input[name="${type}"]`);
  return input.style.border = '3px solid green';
}

const failedColours = (type) => {
  const input = document.querySelector(`input[name="${type}"]`)
  return input.style.border = '3px solid red';
}

const newValue = (type) => document.querySelector(`input[name="${type}"]`).value;
const clearInput = (type) => document.querySelector(`input[name="${type}"]`).value = '';
const nameValidator = (str) => /^[^\s]+( [^\s]+)( [^\s]+)?$/.test(str);
const emailValidator = (str) => /^[^@\s]+@[^@\s\.]+\.[^@\s]+$/.test(str);


const finalValidatorChecking = (object, array) => {
  const imgCard = document.getElementById('imgCard');  
  // Assigning the respected Object key to each object key so that the backend can work accordingly
  if (emailValidator(object.email) && nameValidator(object.name) && validateCreditCardNumber(object.card)) {
    for (const type of array) {
      successColours(type)
      removeElm(type)
    }
    imgCard.setAttribute('hidden', true);
    return object;

  } else if (emailValidator(object.email) && nameValidator(object.name)) {

    const filtered = array.filter(word => /[^card]/.test(word));
    for (const type of filtered) {
      successColours(type)
      removeElm(type)
    }
    
    failedColours('card');
    insertAfter('card');
    return false;

  } else if (emailValidator(object.email) && validateCreditCardNumber(object.card)) {

    const filtered = array.filter(word => /[^name]/.test(word));
    for (const type of filtered) {
      successColours(type)
      removeElm(type)
    }
    imgCard.setAttribute('hidden', true);
    failedColours('name');
    insertAfter('name');
    return false;

  } else if (validateCreditCardNumber(object.card) && nameValidator(object.name)) {

    const filtered = array.filter(word => /[^email]/.test(word));
    for (const type of filtered) {
      successColours(type)
      removeElm(type)
    }
    imgCard.setAttribute('hidden', true);
    failedColours('email');
    insertAfter('email');
    return false;

  } else if (validateCreditCardNumber(object.card)) {

    const filtered = array.filter(word => /[^card]/.test(word));
    for (const type of filtered) {
      failedColours(type)
      insertAfter(type)
    }
    imgCard.setAttribute('hidden', true);
    successColours('card');
    removeElm('card')
    return false;

  } else if (emailValidator(object.email)) {

    const filtered = array.filter(word => /[^email]/.test(word));
    for (const type of filtered) {
      failedColours(type)
      insertAfter(type)
    }
    successColours('email');
    removeElm('email');
    return false;

  } else if (nameValidator(object.name)) {

    const filtered = array.filter(word => /[^name]/.test(word));
    for (const type of filtered) {
      failedColours(type)
      insertAfter(type)
    }
    successColours('name');
    removeElm('name');
    return false;

  } else {

    for (const type of array) {
      failedColours(type)
      insertAfter(type)
    }
    return false;
  }

}


const handleSubmit = () => {
  // building helper arrays for the incomming logic
  const resultArray = [];
  const arrayTypes = ['name', 'email', 'card']

  // Looping through with for of on arrayTypes then sending each type to their relative helper function
  for (const type of arrayTypes) {
    // getting the input value from each input fields
    resultArray.push(newValue(type))
    // clearing the input fields
    clearInput(type)
  }

  let obj = Object.assign({}, resultArray);
  let { 0: name, 1: email, 2: card } = obj;
  obj = { name, email, card };
  obj.card = obj.card.replace(/\-/g, '');

  return finalValidatorChecking(obj, arrayTypes);
}


/* ----------------------------------- Exports -------------------------------------- */
// for testing if block
if (!process.env.JEST_WORKER_ID) {
  window.insertHyphen = insertHyphen;
  window.noInputScenario = noInputScenario;
  window.luhnAlgorithm = luhnAlgorithm;
  window.validateCreditCardNumber = validateCreditCardNumber;
  window.cardType = cardType;
  window.handleSubmit = handleSubmit;
  window.newValue = newValue;
  window.clearInput = clearInput;
  window.nameValidator = nameValidator;
  window.emailValidator = emailValidator;
  window.successColours = successColours;
  window.failedColours = failedColours;
  window.finalValidatorChecking = finalValidatorChecking;
  window.insertAfter = insertAfter;
  window.removeElm = removeElm;
}

if (process.env.JEST_WORKER_ID) {
  module.exports = {
    handleSubmit,
    insertHyphen,
    noInputScenario,
    luhnAlgorithm,
    validateCreditCardNumber,
    cardType,
    newValue,
    clearInput,
    nameValidator,
    emailValidator,
    successColours,  
    failedColours,
    insertAfter,
    removeElm,
    finalValidatorChecking
  }
};