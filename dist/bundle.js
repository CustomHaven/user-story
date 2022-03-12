/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.css */ \"./src/main.css\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n/* ----------------------------------- Imports for Webpack to make dist folder -------------------------------------- */\n// COMMENT WHEN TESTING!! HAVE NOT SET UP JEST WITH BABEL\n // const importAll = require =>\n//   require.keys().reduce((acc, next) => {\n//     acc[next.replace(\"./\", \"\")] = require(next);\n//     return acc;\n//   }, {});\n// const images = importAll(\n//   require.context(\"./assets\", false, /\\.(jpe?g|png|gif|svg)$/)\n// );\n\n/* ----------------------------------- Credit Card Validation -------------------------------------- */\n\nconst insertHyphen = elm => {\n  let cardNumber = elm.value;\n  let formatNumber = cardNumber.split('-').join('');\n\n  if (formatNumber.length > 0) {\n    formatNumber = formatNumber.match(new RegExp('.{1,4}', 'g')).join('-');\n  }\n\n  return elm.value = formatNumber;\n};\n\nconst validateCreditCardNumber = cardNumber => {\n  cardNumber = String(cardNumber);\n  const length = cardNumber.length;\n\n  if (length === 0) {\n    return false;\n  }\n\n  let count = 0;\n  /* Traverse the whole credit card number. If index + 1 is even, double the value.\r\n  If above 9 then adjust value */\n\n  for (let i = 0; i < length; i++) {\n    let currentDigit = parseInt(cardNumber[i]);\n\n    if ((i + 2) % 2 === 0) {\n      if ((currentDigit *= 2) > 9) {\n        currentDigit -= 9;\n      }\n    }\n\n    count += currentDigit;\n  }\n\n  return count % 10 === 0;\n};\n\nconst cardType = cardNumber => {\n  // returns card type image; should not rely on this for checking if a card is valid\n  if (typeof cardNumber !== 'string') {\n    throw Error('MUST BE A STRING OF NUMBERS');\n  }\n\n  if (cardNumber === '') {\n    null;\n  }\n\n  cardNumber = cardNumber.split(' ').join(\"\");\n  const types = {\n    electron: /^(4026|417500|4405|4508|4844|4913|4917)\\d+$/,\n    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\\d+$/,\n    dankort: /^(5019)\\d+$/,\n    interpayment: /^(636)\\d+$/,\n    unionpay: /^(62|88)\\d+$/,\n    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,\n    mastercard: /^5[1-5][0-9]{14}$/,\n    amex: /^3[47][0-9]{13}$/,\n    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,\n    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,\n    jcb: /^(?:2131|1800|35\\d{3})\\d{11}$/\n  };\n\n  for (const type in types) {\n    if (types[type].test(cardNumber)) {\n      return type;\n    }\n  }\n\n  return null;\n};\n\nconst noInputScenario = image => image.setAttribute('hidden', true);\n\nconst luhnAlgorithm = elm => {\n  let cardNumber = elm.value;\n  elm.value = cardNumber.replace(/[^-\\d]/g, '');\n  cardNumber = cardNumber.replace(/\\-/g, '');\n  const imgCard = document.getElementById('imgCard');\n  insertHyphen(elm);\n\n  if (validateCreditCardNumber(cardNumber)) {\n    if (cardNumber.length > 0) {\n      imgCard.removeAttribute('hidden');\n      const p = document.querySelector('p[data-paragraph=\"card\"');\n\n      if (p) {\n        p.remove();\n      }\n\n      imgCard.src = './assets/' + (cardType(cardNumber) || 'other') + '.png';\n      return true;\n    } else {\n      noInputScenario(imgCard);\n      return false;\n    }\n  } else {\n    noInputScenario(imgCard);\n    return false;\n  }\n};\n/* ----------------------------------- FORM SUBMISSION -------------------------------------- */\n\n\nconst removeElm = type => {\n  const elm = document.querySelector(`p[data-paragraph=\"${type}\"]`);\n\n  if (elm !== null) {\n    elm.remove();\n    return true;\n  }\n\n  return false;\n};\n\nconst insertAfter = type => {\n  if (document.querySelector(`p[data-paragraph=\"${type}\"]`)) {\n    return;\n  }\n\n  const upperElm = document.querySelector(`input[name=\"${type}\"]`);\n  const p = document.createElement('p');\n  p.classList.add('p-info');\n  p.classList.add('fs-300');\n  p.setAttribute('data-paragraph', type);\n\n  if (type === 'name') {\n    p.innerText = 'Please include your first and last name';\n  } else if (type === 'email') {\n    p.innerText = 'Please use a valid email address';\n  } else {\n    if (upperElm.value !== '') {\n      p.innerText = 'Sorry that card number was invalid';\n    } else {\n      p.innerText = 'Enter your card number';\n    }\n  }\n\n  upperElm.insertAdjacentElement('afterend', p);\n  return p;\n};\n\nconst successColours = type => {\n  const input = document.querySelector(`input[name=\"${type}\"]`);\n  return input.style.border = '3px solid green';\n};\n\nconst failedColours = type => {\n  const input = document.querySelector(`input[name=\"${type}\"]`);\n  return input.style.border = '3px solid red';\n};\n\nconst newValue = type => document.querySelector(`input[name=\"${type}\"]`).value;\n\nconst clearInput = type => document.querySelector(`input[name=\"${type}\"]`).value = '';\n\nconst nameValidator = str => /^[^\\s]+( [^\\s]+)( [^\\s]+)?$/.test(str);\n\nconst emailValidator = str => /^[^@\\s]+@[^@\\s\\.]+\\.[^@\\s]+$/.test(str);\n\nconst finalValidatorChecking = (object, array) => {\n  const imgCard = document.getElementById('imgCard'); // Assigning the respected Object key to each object key so that the backend can work accordingly\n\n  if (emailValidator(object.email) && nameValidator(object.name) && validateCreditCardNumber(object.card)) {\n    for (const type of array) {\n      successColours(type);\n      removeElm(type);\n    }\n\n    imgCard.setAttribute('hidden', true);\n    return object;\n  } else if (emailValidator(object.email) && nameValidator(object.name)) {\n    const filtered = array.filter(word => /[^card]/.test(word));\n\n    for (const type of filtered) {\n      successColours(type);\n      removeElm(type);\n    }\n\n    failedColours('card');\n    insertAfter('card');\n    return false;\n  } else if (emailValidator(object.email) && validateCreditCardNumber(object.card)) {\n    const filtered = array.filter(word => /[^name]/.test(word));\n\n    for (const type of filtered) {\n      successColours(type);\n      removeElm(type);\n    }\n\n    imgCard.setAttribute('hidden', true);\n    failedColours('name');\n    insertAfter('name');\n    return false;\n  } else if (validateCreditCardNumber(object.card) && nameValidator(object.name)) {\n    const filtered = array.filter(word => /[^email]/.test(word));\n\n    for (const type of filtered) {\n      successColours(type);\n      removeElm(type);\n    }\n\n    imgCard.setAttribute('hidden', true);\n    failedColours('email');\n    insertAfter('email');\n    return false;\n  } else if (validateCreditCardNumber(object.card)) {\n    const filtered = array.filter(word => /[^card]/.test(word));\n\n    for (const type of filtered) {\n      failedColours(type);\n      insertAfter(type);\n    }\n\n    imgCard.setAttribute('hidden', true);\n    successColours('card');\n    removeElm('card');\n    return false;\n  } else if (emailValidator(object.email)) {\n    const filtered = array.filter(word => /[^email]/.test(word));\n\n    for (const type of filtered) {\n      failedColours(type);\n      insertAfter(type);\n    }\n\n    successColours('email');\n    removeElm('email');\n    return false;\n  } else if (nameValidator(object.name)) {\n    const filtered = array.filter(word => /[^name]/.test(word));\n\n    for (const type of filtered) {\n      failedColours(type);\n      insertAfter(type);\n    }\n\n    successColours('name');\n    removeElm('name');\n    return false;\n  } else {\n    for (const type of array) {\n      failedColours(type);\n      insertAfter(type);\n    }\n\n    return false;\n  }\n};\n\nconst handleSubmit = () => {\n  // building helper arrays for the incomming logic\n  const resultArray = [];\n  const arrayTypes = ['name', 'email', 'card']; // Looping through with for of on arrayTypes then sending each type to their relative helper function\n\n  for (const type of arrayTypes) {\n    // getting the input value from each input fields\n    resultArray.push(newValue(type)); // clearing the input fields\n\n    clearInput(type);\n  }\n\n  let obj = Object.assign({}, resultArray);\n  let {\n    0: name,\n    1: email,\n    2: card\n  } = obj;\n  obj = {\n    name,\n    email,\n    card\n  };\n  obj.card = obj.card.replace(/\\-/g, '');\n  return finalValidatorChecking(obj, arrayTypes);\n};\n/* ----------------------------------- Exports -------------------------------------- */\n// for testing if block\n\n\nif (!\"MISSING_ENV_VAR\".JEST_WORKER_ID) {\n  window.insertHyphen = insertHyphen;\n  window.noInputScenario = noInputScenario;\n  window.luhnAlgorithm = luhnAlgorithm;\n  window.validateCreditCardNumber = validateCreditCardNumber;\n  window.cardType = cardType;\n  window.handleSubmit = handleSubmit;\n  window.newValue = newValue;\n  window.clearInput = clearInput;\n  window.nameValidator = nameValidator;\n  window.emailValidator = emailValidator;\n  window.successColours = successColours;\n  window.failedColours = failedColours;\n  window.finalValidatorChecking = finalValidatorChecking;\n  window.insertAfter = insertAfter;\n  window.removeElm = removeElm;\n}\n\nif (\"MISSING_ENV_VAR\".JEST_WORKER_ID) {\n  module.exports = {\n    handleSubmit,\n    insertHyphen,\n    noInputScenario,\n    luhnAlgorithm,\n    validateCreditCardNumber,\n    cardType,\n    newValue,\n    clearInput,\n    nameValidator,\n    emailValidator,\n    successColours,\n    failedColours,\n    insertAfter,\n    removeElm,\n    finalValidatorChecking\n  };\n}\n\n;\n\n//# sourceURL=webpack://user-stories/./src/index.js?");

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://user-stories/./src/main.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;