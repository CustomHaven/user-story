const indexFile = require('./index');
const { JSDOM } = require('jsdom');
const { toBeInTheDocument, toHaveAttribute } = require('@testing-library/jest-dom');
const html = require('./duphtml');


let dom, window, document, inputName, inputEmail, inputCard, count, typeArray, inputArray, cardImg, arrayPush, object;
describe('Testing the HTML FORM from index.html using JSDOM', () => {

  /* ---------------------------------------- STARTING --------------------------------------------- */

  beforeEach(() => {
    dom = new JSDOM(html);
    window = dom.window;
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    })
    document = window.document;
    global.window = window;
    global.document = document;
    
    inputName = document.querySelector(`input[name="name"]`);
    inputName.value = 'John Doe';
    inputEmail = document.querySelector(`input[name="email"]`);
    inputEmail.value = 'test@email.com';
    inputCard = document.querySelector(`input[name="card"]`);
    inputCard.value = '5457623898234113';

    cardImg = document.getElementById('imgCard');
    arrayPush = [];
    typeArray = ['name', 'email', 'card']
    count = 0
    inputArray = [inputName, inputEmail, inputCard];

    object = {
      name: 'John Doe',
      email: 'test@emailing.com',
      card: '5457623898234113'
    };
  });

  afterEach(() => {
    count = 0;
  });


  /* ---------------------------------------- emailValidator() --------------------------------------------- */

  describe('Email Validation onkeyup', () => {
    it('PASS Email Validation check with a valid email', () => {
      expect(indexFile.emailValidator(inputEmail.value)).toBe(true);
      expect(indexFile.emailValidator(inputEmail.value)).toBeTruthy();
    });

    it('FAIL Email Validation check if email has no @', () => {
      expect(indexFile.emailValidator('testemail.com')).toBe(false);
      expect(indexFile.emailValidator('testemail.com')).toBeFalsy();
    });

    it('FAIL Email Validation check email after @ if there is no dot .', () => {
      expect(indexFile.emailValidator('test@emailcom')).toBe(false);
      expect(indexFile.emailValidator('test@emailcom')).toBeFalsy();
    });

    it('FAIL Email Validation check email if a dot . is right after @', () => {
      expect(indexFile.emailValidator('test@.emailcom')).toBe(false);
      expect(indexFile.emailValidator('test@emailcom')).toBeFalsy();
    });

    it('FAIL Email Validation check if email has has multiple @', () => {
      expect(indexFile.emailValidator('te@st@emai@l.com')).toBe(false);
      expect(indexFile.emailValidator('testemail.com')).toBeFalsy();
    });

    it('FAIL Email Validation check if email contains a space', () => {
      expect(indexFile.emailValidator('te st@email.com')).toBe(false);
      expect(indexFile.emailValidator('testemail.com')).toBeFalsy();
    });
  });


  /* ---------------------------------------- nameValidator() --------------------------------------------- */

  describe('nameValidator block', () => {
    it('nameValidator success if input name has two words', () => {
      expect(indexFile.nameValidator('John Doe')).toBe(true);
      expect(indexFile.nameValidator('John Doe')).toBeTruthy();
    });

    it('nameValidator fail if input name has 1 words', () => {
      expect(indexFile.nameValidator('John')).toBe(false);
      expect(indexFile.nameValidator('John')).toBeFalsy();
    });

    it('nameValidator success if input name has 3 words', () => {
      expect(indexFile.nameValidator('John Doe Miller')).toBe(true);
      expect(indexFile.nameValidator('John Doe Miller')).toBeTruthy();
    });

    it('nameValidator FAIL if input name has 4 words', () => {
      expect(indexFile.nameValidator('John Doe East West')).toBe(false);
      expect(indexFile.nameValidator('John Doe East West')).toBeFalsy();
    });

    it('nameValidator FAIL if input name has 4 or more words', () => {
      expect(indexFile.nameValidator('John Doe Fire Dragon Heart Loving')).toBe(false);
      expect(indexFile.nameValidator('John Doe Fire Dragon Heart Loving')).toBeFalsy();
    });
  })


  describe('LuhnAlgorithm for CC', () => {


    /* ---------------------------------------- luhnAlgorithm() --------------------------------------------- */

    it('luhnAlgorithm main function returns true meaning CC isValid', () => {
      expect(indexFile.luhnAlgorithm(inputCard)).toBe(true)
    })

    it('luhnAlgorithm main function returns false meaning CC isInValid', () => {
      inputCard.value = '45643';
      expect(indexFile.luhnAlgorithm(inputCard)).toBe(false)
    });


    /* ---------------------------------------- validateCreditCardNumber() --------------------------------------------- */

    it('validateCreditCardNumber returns true as the cardNumber is legit', () => {
      expect(indexFile.validateCreditCardNumber(inputCard.value)).toBe(true)
    });

    it('validateCreditCardNumber returns false as the cardNumber is NOT legit', () => {
      inputCard.value = '45643';
      expect(indexFile.validateCreditCardNumber(inputCard.value)).toBe(false)
    });


    /* ---------------------------------------- noInputScenario() --------------------------------------------- */

    it('noInputScenario', () => {
      indexFile.noInputScenario(cardImg);  
      expect(cardImg).toHaveAttribute('hidden');
      expect(cardImg.hasAttribute('hidden')).toBe(true);
    });

    /* ---------------------------------------- insertHyphen() --------------------------------------------- */

    it('insertHyphen function insertes dashes into the card numbers', () => {
      expect(indexFile.insertHyphen(inputCard)).toBe('5457-6238-9823-4113');
    });

    /* ---------------------------------------- cardType() --------------------------------------------- */  

    it('cardType returns the cardType as a string', ()  => {
      expect(indexFile.cardType('5457623898234113')).toBe('mastercard');
    });
  
    it('cardType not given a parameter to throw error', () => {
      expect(() => indexFile.cardType()).toThrow('MUST'); // dont need entire string to test just first letters should suffice
    });
  
    it('invalid property string cardType returns null', () => {
      expect(indexFile.cardType('32423')).toBeNull();
    });
  });


  describe('form Submission', () => { 


    /* ---------------------------------------- successColours() --------------------------------------------- */

    it('successColours returns the colour values', () => {
      expect(indexFile.successColours('name')).toBe('3px solid green');
      expect(indexFile.successColours('email')).toBe('3px solid green');
      expect(indexFile.successColours('card')).toBe('3px solid green');
    });

    /* ---------------------------------------- failedColours() --------------------------------------------- */

    it('failedColours returns the colour values', () => {
      expect(indexFile.failedColours('name')).toBe('3px solid red');
      expect(indexFile.failedColours('email')).toBe('3px solid red');
      expect(indexFile.failedColours('card')).toBe('3px solid red');
    });


    /* ---------------------------------------- insertAfter() --------------------------------------------- */

    it('insertAfter element NOT TO BE IN THE DOCUMENT INITALLY', () => {
      const pName = document.querySelector(`p[data-paragraph="name"]`)
      const pEmail = document.querySelector(`p[data-paragraph="email"]`)
      const pCard = document.querySelector(`p[data-paragraph="card"]`)

      expect(pName).not.toBeInTheDocument();
      expect(pEmail).not.toBeInTheDocument();
      expect(pCard).not.toBeInTheDocument();
    })

    it('insertAfter element TO BE IN THE DOCUMENT INITALLY', () => {
      for (const type of typeArray) {
        expect(indexFile.insertAfter(type)).toBeInTheDocument()

      }
      const pName = document.querySelector(`p[data-paragraph="name"]`);
      const pEmail = document.querySelector(`p[data-paragraph="email"]`);
      const pCard = document.querySelector(`p[data-paragraph="card"]`);

      expect(pName.classList.contains('p-info')).toBe(true);
      expect(pEmail.classList.contains('p-info')).toBe(true);
      expect(pCard.classList.contains('p-info')).toBe(true);

      expect(pName.hasAttribute('data-paragraph')).toBe(true);
      expect(pEmail.hasAttribute('data-paragraph')).toBe(true);
      expect(pCard.hasAttribute('data-paragraph')).toBe(true);

      expect(pName.innerText).toBe('Please include your first and last name');
      expect(pEmail.innerText).toBe('Please use a valid email address');
      expect(pCard.innerText).toBe('Sorry that card number was invalid');
    });


    /* ---------------------------------------- removeElm() --------------------------------------------- */

    it('removeElm remove the element with this data attribute p[data-paragraph="${type}"]', () => {
      for (const type of typeArray) {
        arrayPush.push(indexFile.insertAfter(type))
      }
      arrayPush.forEach(elm => {
        const attributeType = elm.getAttribute('data-paragraph');
        expect(indexFile.removeElm(attributeType)).toBe(true);
        expect(elm).not.toBeInTheDocument()
      })
    });

    it('removeElm if NOT found in the document do nothing and return false', () => {
      for (const type of typeArray) {
        expect(indexFile.removeElm(type)).toBe(false);
      }
    });



    /* ---------------------------------------- finalValidatorChecking() --------------------------------------------- */

    it('FAILED finalValidatorChecking no name or incorrect name format', () => {
      object.name = 'John'
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);

      delete object.name;
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);
    });

    it('FAILED finalValidatorChecking no email or incorrect email format', () => {
      object.email = 'tryy@ dsf@.com'
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);

      delete object.email;
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);
    });

    it('FAILED finalValidatorChecking no card number or incorrect card number format', () => {
      object.card = '4543597437';
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);

      delete object.card;
      expect(indexFile.finalValidatorChecking(object, typeArray)).toBe(false);
    });


    it('PASSED finalValidatorChecking returns object SUCCESSFULLY', () => {
      expect(indexFile.finalValidatorChecking(object, typeArray)).toEqual(object);
    });



    /* ---------------------------------------- clearInput() --------------------------------------------- */

    it('clearInput function clears the input values LOOPING ALL 3 types', () => {
      for (const type of inputArray) {
        expect(indexFile.clearInput(typeArray[count])).toBe(type.value)
        // Proof that the value is empty/empty string .toBeFalsy()
        expect(indexFile.newValue(typeArray[count])).toBeFalsy()
        count++
      }
    });


    /* ---------------------------------------- newValue() --------------------------------------------- */

    it('newValue function returns the value inside the input LOOPING ALL 3 types', () => {
      for (const type of inputArray) {
        expect(indexFile.newValue(typeArray[count])).toBe(type.value)
        // Proof that we have value content with .toBeTruthy()
        expect(indexFile.newValue(typeArray[count])).toBeTruthy()
        count++
      }
    });


    /* ---------------------------------------- handleSubmit() --------------------------------------------- */

    it('PASS handleSubmit finally last function passes has no parameter input realize heavily on the funcs above', () => {

      // e2e testing success passes all stages
      const inputObject = {
        name: inputName.value,
        email: inputEmail.value, 
        card: inputCard.value
      };
      expect(indexFile.handleSubmit()).toEqual(inputObject);
    });


  });


  /* ---------------------------------------- FINISHED --------------------------------------------- */

});