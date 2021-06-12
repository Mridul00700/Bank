'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {

  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {

    let type;
    if (mov > 0)
      type = "deposit"
    else
      type = "withdrawal"

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${`${mov} EU`}</div>
    </div>
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

  labelBalance.textContent = `${acc.balance} EU`;
};



const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0);
  const outgoes = acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} EU`;
  labelSumOut.textContent = `${Math.abs(outgoes)} EU`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * (acc.interestRate / 100)).reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = interest;

}

const updateUI = (curAcc) => {
  curAcc && displayMovements(curAcc.movements);

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

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.userName === inputLoginUsername.value);
  console.log(currentAccount);
  currentAccount?.pin === Number(inputLoginPin.value) ? console.log('logged in ') : console.log("Invalid pin");;
  // Display Ui and Welcome
  labelWelcome.textContent = currentAccount === undefined ? 'Log in to get started' : `Welcome Back ${currentAccount.owner.split(' ')[0]}`;
  currentAccount !== undefined ? containerApp.style.opacity = 100 : containerApp.style.opacity = 0;
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();

  updateUI(currentAccount);
});



btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find((account) => account.userName === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAccount && currentAccount.balance >= amount && currentAccount?.userName !== receiverAccount) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }


});

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (currentAccount.pin === Number(inputClosePin.value) && currentAccount.userName === inputCloseUsername.value) {

    const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName);
    inputCloseUsername.value = inputClosePin.value = "";
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

  }





});

