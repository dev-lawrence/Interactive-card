const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const numberInput = document.querySelector('#number');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const cvcInput = document.querySelector('#cvc');

// show error message
const message = (name, message) => {
  const inputControl = name.parentElement;
  const errorMessage = inputControl.querySelector('.error-msg');
  name.style.border = `2px solid var(--input-error)`;
  errorMessage.textContent = message;
};

// remove error message
const removeMessage = (name) => {
  const inputControl = name.parentElement;
  const errorMessage = inputControl.querySelector('.error-msg');
  name.style.border = '2px solid green';
  name.style.borderImage = `var(--input-active)`;
  errorMessage.textContent = '';
};

// update card name
const updateName = (e) => {
  const cardHolderName = document.querySelector('#card-name');
  cardHolderName.textContent = e.target.value;
  removeMessage(nameInput);
};

// change text to numbers
const textToNumbers = (e) => {
  let ch = String.fromCharCode(e.which);

  if (!/[0-9]/.test(ch)) {
    e.preventDefault();
  }
};

// update card number
const updateNumber = (e) => {
  const cardNumber = document.querySelector('#card-number');
  cardNumber.textContent = e.target.value;
  removeMessage(numberInput);

  // for alphabets
  const str = e.target.value
    .replace(/[^A-Za-z]+/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

  // for numbers
  const num = e.target.value
    .replace(/[^0-9]+/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

  if ((numberInput.value = num)) {
  } else if ((numberInput.value = str)) {
    message(numberInput, 'Wrong format, Numbers only');
  }

  if (numberInput.value.length <= 19) {
    numberInput.maxLength = 19;
  }
};

// update card month
const updateMonth = (e) => {
  const cardMonth = document.querySelector('#card-month');
  cardMonth.textContent = e.target.value;
  removeMessage(monthInput);
  textToNumbers(e);
  if (monthInput.maxLength <= 2) {
    monthInput.maxLength = 2;
  }
};

// update card month
const updateYear = (e) => {
  const cardYear = document.querySelector('#card-year');
  cardYear.textContent = e.target.value;
  removeMessage(yearInput);
  textToNumbers(e);
  if (yearInput.maxLength <= 2) {
    yearInput.maxLength = 2;
  }
};

// update card cvc
const updateCvc = (e) => {
  const cardCvc = document.querySelector('#card-cvc');
  cardCvc.textContent = e.target.value;
  removeMessage(cvcInput);
  textToNumbers(e);

  if (cvcInput.maxLength <= 3) {
    cvcInput.maxLength = 3;
  }
};

// Success message
const successMsg = () => {
  const alertMsg = document.querySelector('#success-msg');
  alertMsg.style.display = 'flex';
  form.style.display = 'none';
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    window.location.reload();
  });
};

// submit form
const submitForm = (e) => {
  e.preventDefault();

  // if name field is empty
  if (nameInput.value.trim() === '') {
    message(nameInput, `Can't be blank`);
  }

  // if number field is empty
  if (numberInput.value.trim() === '') {
    message(numberInput, `Can't be blank`);
  }

  // if the lenght is not 19 characters
  else if (numberInput.value.length != 19) {
    message(numberInput, `Number should not be less than 16`);
  }

  // if month field is empty
  if (monthInput.value.trim() === '') {
    message(monthInput, `Can't be blank`);
  }

  // if year field is empty
  if (yearInput.value.trim() === '') {
    message(yearInput, `Can't be blank`);
  }

  // if cvc field is empty
  if (cvcInput.value.trim() === '') {
    message(cvcInput, `Can't be blank`);
  }

  // if all the details are checked then submit
  if (
    nameInput.value.trim() != '' &&
    numberInput.value.trim() != '' &&
    monthInput.value.trim() != '' &&
    yearInput.value.trim() != '' &&
    cvcInput.value.trim() != '' &&
    numberInput.value.length === 19
  ) {
    successMsg();
  }
};

// event listeners
form.addEventListener('submit', submitForm);
nameInput.addEventListener('input', updateName);
numberInput.addEventListener('input', updateNumber);

['input', 'keypress'].forEach((e) => {
  monthInput.addEventListener(e, updateMonth);
});

['input', 'keypress'].forEach((e) => {
  yearInput.addEventListener(e, updateYear);
});

['input', 'keypress'].forEach((e) => {
  cvcInput.addEventListener(e, updateCvc);
});
