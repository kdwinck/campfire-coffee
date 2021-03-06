// create global variables
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var names = [];
var allStores = [];
var allStoresDailyPounds = 0;
var allStoresHourlyPounds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var allStoresDailyEmploy = 0;
var allStoresHourlyEmploy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// create coffee stand constructor function
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
  this.dailyEmploy = 0;

  this.custPerHour = [];
  this.cupsPerHour = [];
  this.poundsPerHour = [];
  this.cupsPerPound = [];
  this.employeesNeeded = [];
  this.totalPoundsPerHour = [];

  allStores.push(this);
  names.push(this.name);
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
    var hourlyEmployees = Math.ceil(this.custPerHour[index] / 30);
    this.employeesNeeded.push(hourlyEmployees);
    this.dailyEmploy += hourlyEmployees;
    allStoresHourlyEmploy[index] += hourlyEmployees;
    allStoresDailyEmploy += hourlyEmployees;
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

CoffeeStand.prototype.methodCaller = function() {
  this.avgCustPerHour();
  this.calcHourlyValues();
  this.calcEmployeesPerHour();
  this.calcTotalPoundsPerHour();
};

CoffeeStand.prototype.clearData = function() {
  this.totalCustomers = 0;
  this.totalCups = 0;
  this.packagedPounds = 0;
  this.dailyPounds = 0;
  this.dailyEmploy = 0;

  this.custPerHour = [];
  this.cupsPerHour = [];
  this.poundsPerHour = [];
  this.cupsPerPound = [];
  this.employeesNeeded = [];
  this.totalPoundsPerHour = [];
};

CoffeeStand.prototype.subtractFromTotals = function() {
  allStoresDailyPounds -= this.dailyPounds;
  allStoresDailyEmploy -= this.dailyEmploy;
  for (var i in this.poundsPerHour) {
    allStoresHourlyPounds[i] -= this.totalPoundsPerHour[i];
  }
  for (var x in this.employeesNeeded) {
    allStoresHourlyEmploy[x] -= this.employeesNeeded[x];
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var pikePlace = new CoffeeStand('Pike Place Market', 14, 35, 1.2, .34, hours);
var capHill = new CoffeeStand('Capitol Hill', 12, 28, 3.2, .03, hours);
var seattleLibrary = new CoffeeStand('Seattle Public Library', 9, 45, 2.6, .02, hours);
var southLakeUnion = new CoffeeStand('South Lake Union', 5, 18, 1.3, .04, hours);
var seaTac = new CoffeeStand('Sea-Tac Airport', 28, 44, 1.1, .41, hours);

pikePlace.methodCaller();
capHill.methodCaller();
seattleLibrary.methodCaller();
southLakeUnion.methodCaller();
seaTac.methodCaller();

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// makes h1 tag for a table
function createTableTitle(textContent) {
  var tableSection = document.getElementById('table-data');
  var headTag = document.createElement('h1');
  headTag.textContent = textContent;
  tableSection.appendChild(headTag);
}

// create function that will make table
function createTable(tableId) {
  var tableSection = document.getElementById('table-data');
  var table = document.createElement('table');
  table.id = tableId;
  tableSection.appendChild(table);
}

// create function to make table header row
function createHeaderRow(tableId, textContent) {
  var table = document.getElementById(tableId);
  var header = document.createElement('tr');
  header.id = 'rowHeader';
  table.appendChild(header);        // make table header row
  hours.unshift(textContent);
  hours.unshift('');
  for (index in hours) {
    data = document.createElement('td');
    data.textContent = hours[index];
    header.appendChild(data);      // append each hour to a new cell
  }
  hours.shift();
  hours.shift();
}

function createCoffeeRow(tableId, object) {
  var table = document.getElementById(tableId);
  var row = document.createElement('tr');
  object.totalPoundsPerHour.unshift(Math.round(object.dailyPounds * 10) / 10);
  object.totalPoundsPerHour.unshift(object.name);
  for (var index in object.totalPoundsPerHour) {
    var cell = document.createElement('td');
    cell.textContent = object.totalPoundsPerHour[index];
    row.appendChild(cell);
  }
  table.appendChild(row);
  object.totalPoundsPerHour.shift();
  object.totalPoundsPerHour.shift();
}

function createCoffeeTotalsRow() {
  var table = document.getElementById('coffeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = 'Totals';
  row.appendChild(cell);
  allStoresHourlyPounds.unshift(Math.round(allStoresDailyPounds * 10) / 10);
  for (var index in allStoresHourlyPounds) {
    cell = document.createElement('td');
    cell.textContent = Math.round(allStoresHourlyPounds[index] * 10) / 10;
    row.appendChild(cell);
  }
  table.appendChild(row);
  allStoresHourlyPounds.shift();
}

function createEmployeeRow(tableId, object) {
  var table = document.getElementById(tableId);
  var row = document.createElement('tr');
  object.employeesNeeded.unshift(Math.ceil(object.dailyEmploy));
  object.employeesNeeded.unshift(object.name);
  for (var index in object.employeesNeeded) {
    cell = document.createElement('td');
    cell.textContent = object.employeesNeeded[index];
    row.appendChild(cell);
  }
  table.appendChild(row);
  object.employeesNeeded.shift();
  object.employeesNeeded.shift();
}

function createEmployTotalsRow() {
  var table = document.getElementById('employeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = 'Totals';
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.textContent = allStoresDailyEmploy;
  row.appendChild(cell);
  for (var index in allStoresHourlyEmploy) {
    cell = document.createElement('td');
    cell.textContent = Math.round(allStoresHourlyEmploy[index] * 10) / 10;
    row.appendChild(cell);
  }
  table.appendChild(row);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

///// create coffee table /////////////////
function makeCoffeeTable() {
  createTableTitle('Beans Needed By Location Each Day');
  createTable('coffeeTable'); //create empty table
  createHeaderRow('coffeeTable', 'Daily Location Total'); //create header row
  for (var index in allStores) {
    createCoffeeRow('coffeeTable', allStores[index]);
  }
  createCoffeeTotalsRow(); //create coffee table totals row
}

///// create employee table ////////////////
function makeEmployeeTable() {
  createTableTitle('Baristas Needed By Location Each Day');
  createTable('employeeTable');
  createHeaderRow('employeeTable', 'Total');
  for (var index in allStores) {
    createEmployeeRow('employeeTable', allStores[index]);
  }
  createEmployTotalsRow();
}

makeCoffeeTable();
makeEmployeeTable();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearInputFields() {
  event.target.storeName.value = '';
  event.target.minCust.value = null;
  event.target.maxCust.value = null;
  event.target.cupsPer.value = null;
  event.target.poundsPer.value = null;
}

function clearTableData() {
  var section = document.getElementById('table-data');
  section.innerHTML = '';
}

function updateStore(storeName, minCust, maxCust, cupsPer, poundsPer) {
  for (var i in allStores) {
    if (allStores[i].name === storeName) {
      // update location values
      allStores[i].minCust = minCust;
      allStores[i].maxCust = maxCust;
      allStores[i].cupsPerCust = cupsPer;
      allStores[i].poundsPerCust = poundsPer;
      // remove old data form the totals
      allStores[i].subtractFromTotals();
      // clear current store data
      allStores[i].clearData();
      // call all methods with new values
      allStores[i].methodCaller();
    }
  }
}

function updateHtmlTables() {
  clearTableData();
  makeCoffeeTable();
  makeEmployeeTable();
  clearInputFields();
}

// function to add or update store
function createStore(event) {
  event.preventDefault();

  // get values - convert number inputs to floats
  var storeName = event.target.storeName.value;
  var minCust = parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var cupsPer = parseFloat(event.target.cupsPer.value);
  var poundsPer = parseFloat(event.target.poundsPer.value);

  // instantiate a new item Object
  if (names.indexOf(storeName) !== -1) {
    updateStore(storeName, minCust, maxCust, cupsPer, poundsPer);
    updateHtmlTables();
  } else {
    var newLocation = new CoffeeStand(storeName, minCust, maxCust, cupsPer, poundsPer, hours);
    newLocation.methodCaller();
    updateHtmlTables();
  }
}

var newStore = document.getElementById('form');

newStore.addEventListener('submit', createStore);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
