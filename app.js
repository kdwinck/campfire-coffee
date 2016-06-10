// create global variable for hours of operation
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allStoresDailyPounds = 0;
var allStoresHourlyPounds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// create constructor function to build each coffee stand
function CoffeeStand(name, minCust, maxCust, cupsPerCust, poundsPerCust, hours) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cupsPerCust = cupsPerCust;
  this.poundsPerCust = poundsPerCust;

  this.hours = hours;
  this.totalCustomers = 0;
  this.totalCups = 0;
  this.packagedPounds = 0;
  this.dailyPounds = 0;

  this.custPerHour = [];
  this.cupsPerHour = [];
  this.poundsPerHour = [];
  this.cupsPerPound = [];
  this.employeesNeeded = [];
  this.totalPoundsPerHour = [];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

// create coffeestand prototype functions
CoffeeStand.prototype.avgCustPerHour = function() {
  for (index in this.hours) {
    var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    this.custPerHour.push(customers);
    this.totalCustomers += customers;
  }
};

CoffeeStand.prototype.calcHourlyValues = function() {
  for (var index in this.custPerHour) {
    // calculate cups of coffee sold per hour
    var cupsPerHour = Math.round((this.custPerHour[index] * this.cupsPerCust) * 10) / 10;
    this.cupsPerHour.push(cupsPerHour);
    this.totalCups += cupsPerHour;
    // calculate packaged coffee sold per hour
    var poundsPerHour = Math.round((this.custPerHour[index] * this.poundsPerCust) * 10) / 10;
    this.poundsPerHour.push(poundsPerHour);
    this.packagedPounds += poundsPerHour;
    // calculate cups in terms of pounds
    var cupsInPounds = Math.round((this.cupsPerHour[index] / 16) * 10) / 10;
    this.cupsPerPound.push(cupsInPounds);
  }
};

CoffeeStand.prototype.calcEmployeesPerHour = function() {
  for (var index in this.custPerHour) {
    var employees = Math.ceil(this.custPerHour[index] / 30);
    this.employeesNeeded.push(employees);
  }
};

CoffeeStand.prototype.calcTotalPoundsPerHour = function() {
  for (var index in this.hours) {
    var hourlyPounds = Math.round((this.cupsPerPound[index] + this.poundsPerHour[index]) * 10 ) / 10;
    this.totalPoundsPerHour.push(hourlyPounds);
    this.dailyPounds += hourlyPounds;
    allStoresHourlyPounds[index] += hourlyPounds;
  }
  allStoresDailyPounds += this.dailyPounds;
};

// CoffeeStand.prototype.displayName = function() {
//   var main = document.getElementById('main');
//   var storeName = document.createElement('p');
//   storeName.textContent = this.name;
//   main.appendChild(storeName);
// };
//
// CoffeeStand.prototype.createList = function() {
//   var main = document.getElementById('main');
//   var ul_tag = document.createElement('ul');
//   ul_tag.id = this.name;
//   main.appendChild(ul_tag);
// };
//
// CoffeeStand.prototype.createListItems = function() {
//   var ul_tag = document.getElementById(this.name);
//   for (value in this.hours) {
//     var listData = document.createElement('li');
//     listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
//     ul_tag.appendChild(listData);
//   }
// };
//
// CoffeeStand.prototype.createListTotals = function() {
//   var ul_tag = document.getElementById(this.name);
//   var listData = document.createElement('li');
//   // append total custsomers
//   listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
//   ul_tag.appendChild(listData);
//   // append total cups
//   listData = document.createElement('li');
//   listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
//   ul_tag.appendChild(listData);
//   // append total packaged pounds
//   listData = document.createElement('li');
//   listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
//   ul_tag.appendChild(listData);
//   // append daily pounds total
//   listData = document.createElement('li');
//   listData.textContent = 'Total pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
//   ul_tag.appendChild(listData);
// };

CoffeeStand.prototype.createCoffeeRow = function () {
  var table = document.getElementById('coffeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = this.name;
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.textContent = Math.round(this.dailyPounds * 10) / 10;
  row.appendChild(cell);
  for (var index in hours) {
    cell = document.createElement('td');
    cell.textContent = this.totalPoundsPerHour[index];
    row.appendChild(cell);
  }
  table.appendChild(row);
};

CoffeeStand.prototype.theBigOne = function() {
  this.avgCustPerHour();
  this.calcHourlyValues();
  // this.calcPoundsPerHour();  added these to calcHourlyValues method
  // this.calcCupsPerPound();
  this.calcEmployeesPerHour();
  this.calcTotalPoundsPerHour();
  // this.displayName();
  // this.createList();
  // this.createListItems();
  // this.createListTotals();
  this.createCoffeeRow();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////


var pikePlace = new CoffeeStand('Pike Place Market', 14, 35, 1.2, .34, hours);
var capHill = new CoffeeStand('Capitol Hill', 12, 28, 3.2, .03, hours);
var seattleLibrary = new CoffeeStand('Seattle Public Library', 9, 45, 2.6, .02, hours);
var southLakeUnion = new CoffeeStand('South Lake Union', 5, 18, 1.3, .04, hours);
var seaTac = new CoffeeStand('Sea-Tac Airport', 28, 44, 1.1, .41, hours);

// create function that will make table for coffee data
function createCoffeeTable() {
  var main = document.getElementById('main');
  var table = document.createElement('table');
  table.id = 'coffeeTable';
  main.appendChild(table);
};

// create function to make table header row
function createCoffeeHeader() {
  var table = document.getElementById('coffeeTable');
  var header = document.createElement('tr');
  table.appendChild(header);        // make table header row
  var data = document.createElement('td');
  data.textContent = '';
  header.appendChild(data);         // append first cell
  data = document.createElement('td');
  data.textContent = 'Daily Location Total';
  header.appendChild(data);        // append second cell
  for (index in hours) {
    data = document.createElement('td');
    data.textContent = hours[index];
    header.appendChild(data);      // append each hour to a new cell
  }
};

function createCoffeeTotalsRow() {
  var table = document.getElementById('coffeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = 'Totals';
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.textContent = Math.round(allStoresDailyPounds * 10) / 10;
  row.appendChild(cell);
  for (var index in allStoresHourlyPounds) {
    cell = document.createElement('td');
    cell.textContent = Math.round(allStoresHourlyPounds[index] * 10) / 10;
    row.appendChild(cell);
  }
  table.appendChild(row);
}

createCoffeeTable(); //create empty table
createCoffeeHeader(); //create header ro

pikePlace.theBigOne();
capHill.theBigOne();
seattleLibrary.theBigOne();
southLakeUnion.theBigOne();
seaTac.theBigOne();

console.log(allStoresDailyPounds);
console.log(allStoresHourlyPounds);

createCoffeeTotalsRow(); //create coffee table totals row
