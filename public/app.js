"use strict";
console.log(`Connected!`);
// Capturing DOM elements
const form = document.querySelector('#formy');
const type = document.querySelector('#incomeOrSpending');
const amount = document.querySelector('#amount');
const incomeList = document.querySelector('#income_list');
const spendingList = document.querySelector('#spending_list');
const totalbalanceInnerText = document.querySelector('#balanceInnerText');
const graphContainer = document.querySelector('.bars_wrapper');
const graphSection = document.querySelector('#graph_submit_holder');
const type2 = document.querySelector('#incomeOrSpending2');
// Defining vars for calculating
let incomeSum = 0;
let spendingSum = 0;
let totalBalance = 0;
// Income class constractor
class Income {
    constructor(amount, height) {
        this.amount = amount;
        this.height = height;
    }
}
// Spending class constractor
class Spending {
    constructor(amount, height) {
        this.amount = amount;
        this.height = height;
    }
}
// Defining arrays
const incomeArray = [];
const spendingArray = [];
// Event listener for top form
// Gets the type: income or spending from user choice
// If income run incomeListAdd
// If spending run spendingListAdd
// Does calculation for total balance
form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (type.value === 'income') {
        incomeListAdd();
    }
    if (type.value === 'spending') {
        spendingListAdd();
    }
    incomeSum = sumUpOrDown(incomeArray);
    spendingSum = sumUpOrDown(spendingArray);
    totalBalance = calculationgBalance(incomeSum, spendingSum);
    totalbalanceInnerText.innerHTML = `${totalBalance}$`;
});
// Event listener for graph creation form
// reset bars
// Creates bars with diffrent colors depending on type
graphSection.addEventListener('submit', (event) => {
    event.preventDefault();
    graphContainer.innerHTML = "";
    if (type2.value === 'income') {
        creatingBarsFromArray(incomeArray, "green");
    }
    if (type2.value === 'spending') {
        creatingBarsFromArray(spendingArray, "red");
    }
});
// Manipulating DOM to add to income list
function incomeListAdd() {
    incomeArray.push(new Income(Number(amount.value), 0));
    incomeList.innerHTML += `<li>${Number(amount.value)}</li>`;
}
// Manipulating DOM to add to spendings list
function spendingListAdd() {
    let spendingCalculation = -Number(amount.value);
    spendingArray.push(new Spending(spendingCalculation, 0));
    console.log(spendingArray);
    spendingList.innerHTML += `<li>${-Number(amount.value)}</li>`;
}
// calculiting sum of the arr.amount 
function sumUpOrDown(arr) {
    let sum = 0;
    arr.forEach(money => {
        sum += money.amount;
    });
    return sum;
}
// calculating total balance based on both arr.amount balances
function calculationgBalance(fisrtBalance, secondBalance) {
    return totalBalance = fisrtBalance + secondBalance;
}
// Function:
// Geta an array of Income or Spending, and a color
// Finds the biggest number of each array.amount
// 
function creatingBarsFromArray(arr, color) {
    let max = findingBiggestNumberOfArray(arr);
    arr = calculatingPercentage(max, arr);
    arr.forEach(element => {
        let barHeight = Math.abs(element.amount);
        const newBar = document.createElement('div');
        newBar.classList.add("bar");
        newBar.style.height = `${element.height}%`;
        newBar.setAttribute(`id`, `${color}`);
        graphContainer.append(newBar);
    });
}
function findingBiggestNumberOfArray(arr) {
    const amountArr = [];
    arr.forEach(element => {
        amountArr.push(Math.abs(element.amount));
    });
    let max = amountArr[0];
    for (let i = 1; i < amountArr.length; i++) {
        if (amountArr[i] > max) {
            max = amountArr[i];
        }
    }
    return max;
}
function calculatingPercentage(maxi, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].height = Math.abs(arr[i].amount) * 100 / maxi;
    }
    return arr;
}
