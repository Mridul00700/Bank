'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];


const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2021-06-13T14:43:26.374Z',
    '2021-06-14T18:49:59.371Z',
    '2021-06-15T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const formatMovement = (date, locale) => {

  const calcDays = (day1, day2) => Math.round(Math.abs((day2 - day1) / (1000 * 3600 * 24)));

  const daysPassed = calcDays(new Date(), date)
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';

  if (daysPassed === 1) return 'Yesterday';

  if (daysPassed <= 7) return `${daysPassed} days ago`

  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // // const minutes = date.getMinutes();
    // // const hours = date.getHours();
    // return `${day}/${month}/${year}`;
    return Intl.DateTimeFormat(locale).format(date);
  }
}

const formatCurrency = (value, locale, currency) => {
  const formattedMov = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);

  return formattedMov;
}


const displayMovements = function (acc, sort = false) {

  containerMovements.innerHTML = "";

  // const movs = [...movements];

  // const movs1 = sort ? movs.sort((a, b) => a - b) : movements;
  // console.log(movs1);
  // movs1.forEach(function (mov, i) {


  // Sorting

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;


  // Movements

  movs.forEach(function (mov, i) {
    let type;
    if (mov > 0)
      type = "deposit";
    else
      type = "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovement(date, acc.locale);

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency
    // }).format(mov);

    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);


    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}
  </div >
    </div >
  `
    containerMovements.insertAdjacentHTML("afterbegin", html);

  });

}




const creatUserNames = function (accs) {

  accs.forEach(acc => {
    acc.userName = acc.owner.toLowerCase().split(" ").map(na => na[0]).join("");
  });

}

creatUserNames(accounts);



const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  // const formattedMov = new Intl.NumberFormat(acc.locale, {
  //   style: 'currency',
  //   currency: acc.currency
  // }).format(acc.balance);

  const formattedMov = formatCurrency(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formattedMov;
};



const calcDisplaySummary = (acc) => {

  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0);
  const outgoes = acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);
  labelSumOut.textContent = formatCurrency(Math.abs(outgoes), acc.locale, acc.currency);

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * (acc.interestRate / 100)).reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);

}

const updateUI = (curAcc) => {
  curAcc && displayMovements(curAcc);

  curAcc && calcDisplayBalance(curAcc);

  curAcc && calcDisplaySummary(curAcc);
}



// calcDisplaySummary(account1.movements);

// // MAXIMUM - 
// console.log(movements.reduce((acc, cur) => acc > cur ? acc : cur, movements[0]));


// // Challenge 
// const calcAverageHumanAge = (ages) =>
//   ages.map((age) => age <= 2 ? (2 * age) : (16 + age * 4)).filter((age) => age > 18).reduce((acc, cur, i, arr) => acc + (cur / arr.length), 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// Login -  Invent handlers 
let currentAccount;

// // // Fake Login --
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;




btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.userName === inputLoginUsername.value);
  console.log(currentAccount);
  currentAccount?.pin === +(inputLoginPin.value) ? console.log('logged in ') : console.log("Invalid pin");;
  // Display Ui and Welcome
  labelWelcome.textContent = currentAccount === undefined ? 'Log in to get started' : `Welcome Back ${currentAccount.owner.split(' ')[0]} `;

  currentAccount !== undefined ? containerApp.style.opacity = 100 : containerApp.style.opacity = 0;


  // const now = new Date();
  // const day = `${ now.getDate() } `.padStart(2, 0);
  // const month = `${ now.getMonth() + 1 } `.padStart(2, 0);
  // const year = now.getFullYear();
  // const minutes = `${ now.getMinutes() } `.padStart(2, 0);
  // const hours = `${ now.getHours() } `.padStart(2, 0);

  // labelDate.textContent = `${ day } /${month}/${ year }, ${ hours }: ${ minutes } `
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long'
  }

  // // From Browser
  // const locale = navigator.language;
  // console.log(locale);


  // International Date API
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();

  updateUI(currentAccount);
});


// Transfer Amount

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const date = new Date();
  const dateCode = date.toISOString();

  const amount = +(inputTransferAmount.value);
  const receiverAccount = accounts.find((account) => account.userName === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAccount && currentAccount.balance >= amount && currentAccount?.userName !== receiverAccount) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(dateCode);
    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(dateCode);
    updateUI(currentAccount);
  }


});

//  Loan Request    10 % of the loan amount should be present as any deposits!!

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const date = new Date();
  const dateCode = date.toISOString();

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((dep) => dep >= (.1 * amount))) {
    console.log("Loan Granted!");
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(dateCode);

    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }
  else {
    console.log("Loan Rejected as claim is more than the limit amount!");
    inputLoanAmount.value = "";
  }

});

//  Close Account

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (currentAccount.pin === +(inputClosePin.value) && currentAccount.userName === inputCloseUsername.value) {

    const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName);
    inputCloseUsername.value = inputClosePin.value = "";
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

// Sorting 

let sort = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();

  sort = !sort;
  displayMovements(currentAccount, sort);
});






// Practice -

// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => +(el.textContent.replace('EU', '')));
// //   console.log(movementsUI);

// //   // console.log(movementsUI.map(el => +(el.textContent.replace('EU', ''))));

// const movementsUI2 = [...document.querySelectorAll('.movements__value')]
// // })

// const bankDepositSum = accounts.map(acc => acc.movements).flat().filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
// console.log(bankDepositSum);
// // flatMap( ()= > ...) instead of map

// // const leastDeposit = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
// const leastDeposit = accounts.flatMap(acc => acc.movements).reduce((acc, cur, i) => cur >= 1000 ? acc + 1 ( ++acc): acc, 0);
// console.log(leastDeposit);


// console.log(new Date(`${ account1.movementsDates[0] } `));
