// create Pike Place Coffee shop
var pikePlace = {

  name: 'Pike Place Market',
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  minCust: 14,
  maxCust: 35,
  cupsPerCust: 1.2,
  poundsPerCust: .34,

  totalCustomers: 0,
  totalCups: 0,
  packagedPounds: 0,
  dailyPounds: 0,

  custPerHour: [],
  cupsPerHour: [],
  poundsPerHour: [],
  cupsPerPound: [],
  employeesNeeded: [],
  totalPoundsPerHour: [],

  avgCustPerHour: function() {
    for (value in this.hours) {
      customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcCupsPerHour: function() {
    for (value in this.custPerHour) {
      cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
    }
  },

  calcPoundsPerHour: function() {
    for(value in this.custPerHour) {
      poundsPerHour = parseFloat((this.custPerHour[value] * this.poundsPerCust).toFixed(1));
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
    }
  },

  calcCupsPerPound: function() {
    for (value in this.cupsPerHour) {
      cupsInPounds = parseFloat(((this.cupsPerHour[value] * 12) / 16).toFixed(1));
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = parseFloat((this.cupsPerPound[value] + this.poundsPerHour[value]).toFixed(1));
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var parent = document.getElementById('main');
    var child = document.createElement('p');
    child.textContent = this.name;
    parent.appendChild(child);
  },

  createList: function() {
    var parent = document.getElementById('main');
    var child = document.createElement('ul');
    child.id = 'pike';
    parent.appendChild(child);
  },

  createListItems: function() {
    var parent = document.getElementById('pike');
    for (value in this.hours) {
      var child = document.createElement('li');
      child.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      parent.appendChild(child);
    }
  },

  createListTotals: function() {
    var parent = document.getElementById('pike');
    var child = document.createElement('li');
    // append total custsomers
    child.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    parent.appendChild(child);
    // append total cups
    child = document.createElement('li');
    child.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    parent.appendChild(child);
    // append total packaged pounds
    child = document.createElement('li');
    child.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    parent.appendChild(child);
    // append daily pounds total
    child = document.createElement('li');
    child.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    parent.appendChild(child);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcCupsPerHour();
    this.calcPoundsPerHour();
    this.calcCupsPerPound();
    this.calcEmployeesPerHour();
    this.calcTotalPoundsPerHour();
    this.displayName();
    this.createList();
    this.createListItems();
    this.createListTotals();
  }
};


var capHill = {

  name: 'Capitol Hill',
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  minCust: 12,
  maxCust: 28,
  cupsPerCust: 3.2,
  poundsPerCust: .03,

  totalCustomers: 0,
  totalCups: 0,
  packagedPounds: 0,
  dailyPounds: 0,

  custPerHour: [],
  cupsPerHour: [],
  poundsPerHour: [],
  cupsPerPound: [],
  employeesNeeded: [],
  totalPoundsPerHour: [],

  avgCustPerHour: function() {
    for (item in this.hours) {
      customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcCupsPerHour: function() {
    for (item in this.custPerHour) {
      cupsPerHour = Math.round((this.custPerHour[item] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
    }
  },

  calcPoundsPerHour: function() {
    for(item in this.custPerHour) {
      poundsPerHour = parseFloat((this.custPerHour[item] * this.poundsPerCust).toFixed(1));
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
    }
  },

  calcCupsPerPound: function() {
    for (value in this.cupsPerHour) {
      cupsInPounds = parseFloat(((this.cupsPerHour[value] * 12) / 16).toFixed(1));
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = parseFloat((this.cupsPerPound[value] + this.poundsPerHour[value]).toFixed(1));
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var parent = document.getElementById('main');
    var child = document.createElement('p');
    child.textContent = this.name;
    parent.appendChild(child);
  },

  createList: function() {
    var parent = document.getElementById('main');
    var child = document.createElement('ul');
    child.id = 'capHill';
    parent.appendChild(child);
  },

  createListItems: function() {
    var parent = document.getElementById('capHill');
    for (value in this.hours) {
      var child = document.createElement('li');
      child.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      parent.appendChild(child);
    }
  },

  createListTotals: function() {
    var parent = document.getElementById('capHill');
    var child = document.createElement('li');
    // append total custsomers
    child.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    parent.appendChild(child);
    // append total cups
    child = document.createElement('li');
    child.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    parent.appendChild(child);
    // append total packaged pounds
    child = document.createElement('li');
    child.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    parent.appendChild(child);
    // append daily pounds total
    child = document.createElement('li');
    child.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    parent.appendChild(child);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcCupsPerHour();
    this.calcPoundsPerHour();
    this.calcCupsPerPound();
    this.calcEmployeesPerHour();
    this.calcTotalPoundsPerHour();
    this.displayName();
    this.createList();
    this.createListItems();
    this.createListTotals();
  }
};

pikePlace.theBigOne();
capHill.theBigOne();
