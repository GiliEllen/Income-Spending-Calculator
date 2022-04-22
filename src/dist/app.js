console.log("Connected!");
// Capturing DOM elements
var form = document.querySelector('#formy');
var type = document.querySelector('#incomeOrSpending');
var amount = document.querySelector('#amount');
var incomeList = document.querySelector('#income_list');
var spendingList = document.querySelector('#spending_list');
var totalbalanceInnerText = document.querySelector('#balanceInnerText');
var graphContainer = document.querySelector('.bars_wrapper');
var graphSection = document.querySelector('#graph_submit_holder');
var type2 = document.querySelector('#incomeOrSpending2');
// Defining vars for calculating
var incomeSum = 0;
var spendingSum = 0;
var totalBalance = 0;
// Income class constractor
var Income = /** @class */ (function () {
    function Income(amount, height) {
        this.amount = amount;
        this.height = height;
    }
    return Income;
}());
// Spending class constractor
var Spending = /** @class */ (function () {
    function Spending(amount, height) {
        this.amount = amount;
        this.height = height;
    }
    return Spending;
}());
// Defining arrays
var incomeArray = [];
var spendingArray = [];
// Event listener for top form
// Gets the type: income or spending from user choice
// If income run incomeListAdd
// If spending run spendingListAdd
// Does calculation for total balance
form.addEventListener('submit', function (ev) {
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
    totalbalanceInnerText.innerHTML = totalBalance + "$";
});
// Event listener for graph creation form
// reset bars
// Creates bars with diffrent colors depending on type
graphSection.addEventListener('submit', function (event) {
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
    incomeList.innerHTML += "<li>" + Number(amount.value) + "</li>";
}
// Manipulating DOM to add to spendings list
function spendingListAdd() {
    var spendingCalculation = -Number(amount.value);
    spendingArray.push(new Spending(spendingCalculation, 0));
    console.log(spendingArray);
    spendingList.innerHTML += "<li>" + -Number(amount.value) + "</li>";
}
// calculiting sum of the arr.amount 
function sumUpOrDown(arr) {
    var sum = 0;
    arr.forEach(function (money) {
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
    var max = findingBiggestNumberOfArray(arr);
    arr = calculatingPercentage(max, arr);
    arr.forEach(function (element) {
        var barHeight = Math.abs(element.amount);
        var newBar = document.createElement('div');
        newBar.classList.add("bar");
        newBar.style.height = element.height + "%";
        newBar.setAttribute("id", "" + color);
        graphContainer.append(newBar);
    });
}
function findingBiggestNumberOfArray(arr) {
    var amountArr = [];
    arr.forEach(function (element) {
        amountArr.push(Math.abs(element.amount));
    });
    var max = amountArr[0];
    for (var i = 1; i < amountArr.length; i++) {
        if (amountArr[i] > max) {
            max = amountArr[i];
        }
    }
    return max;
}
function calculatingPercentage(maxi, arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].height = Math.abs(arr[i].amount) * 100 / maxi;
    }
    return arr;
}
