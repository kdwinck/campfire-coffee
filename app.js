// create global variables for hours of operation, combined daily pounds for all stores, and combined hourly pounds for all stores
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allStores = [];
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

  allStores.push(this);
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

CoffeeStand.prototype.createCoffeeRow = function () {
  var table = document.getElementById('coffeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  // create first cell with location name
  cell.textContent = this.name;
  row.appendChild(cell);
  cell = document.createElement('td');
  // create second cell with daily pounds total
  cell.textContent = Math.round(this.dailyPounds * 10) / 10;
  row.appendChild(cell);
  // create all hourly total cells for row
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
  this.calcEmployeesPerHour();
  this.calcTotalPoundsPerHour();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var pikePlace = new CoffeeStand('Pike Place Market', 14, 35, 1.2, .34, hours);
var capHill = new CoffeeStand('Capitol Hill', 12, 28, 3.2, .03, hours);
var seattleLibrary = new CoffeeStand('Seattle Public Library', 9, 45, 2.6, .02, hours);
var southLakeUnion = new CoffeeStand('South Lake Union', 5, 18, 1.3, .04, hours);
var seaTac = new CoffeeStand('Sea-Tac Airport', 28, 44, 1.1, .41, hours);

pikePlace.theBigOne();
capHill.theBigOne();
seattleLibrary.theBigOne();
southLakeUnion.theBigOne();
seaTac.theBigOne();

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
  header.id = 'rowHeader';
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

///// create coffee table /////////////////

createCoffeeTable(); //create empty table
createCoffeeHeader(); //create header row
for (var index in allStores) {
  allStores[index].createCoffeeRow();
}
createCoffeeTotalsRow(); //create coffee table totals row

//////////////////////////////////////////
