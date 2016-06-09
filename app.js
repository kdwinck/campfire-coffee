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
      var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcHourlyValues: function() {
    for (value in this.custPerHour) {
      // calculate cups of coffee sold per hour
      var cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
      // calculate packaged coffee sold per hour
      var poundsPerHour = Math.round((this.custPerHour[value] * this.poundsPerCust) * 10) / 10;
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
      // calculate cups in terms of pounds
      var cupsInPounds = Math.round((this.cupsPerHour[value] / 16) * 10) / 10;
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      var employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = Math.round((this.cupsPerPound[value] + this.poundsPerHour[value]) * 10 ) / 10;
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var main = document.getElementById('main');
    var storeName = document.createElement('p');
    storeName.textContent = this.name;
    main.appendChild(storeName);
  },

  createList: function() {
    var main = document.getElementById('main');
    var ul_tag = document.createElement('ul');
    ul_tag.id = 'pike';
    main.appendChild(ul_tag);
  },

  createListItems: function() {
    var ul_tag = document.getElementById('pike');
    for (value in this.hours) {
      var listData = document.createElement('li');
      listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      ul_tag.appendChild(listData);
    }
  },

  createListTotals: function() {
    var ul_tag = document.getElementById('pike');
    var listData = document.createElement('li');
    // append total custsomers
    listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    ul_tag.appendChild(listData);
    // append total cups
    listData = document.createElement('li');
    listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    ul_tag.appendChild(listData);
    // append total packaged pounds
    listData = document.createElement('li');
    listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    ul_tag.appendChild(listData);
    // append daily pounds total
    listData = document.createElement('li');
    listData.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    ul_tag.appendChild(listData);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcHourlyValues();
    // this.calcPoundsPerHour();  added these to calcHourlyValues method
    // this.calcCupsPerPound();
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
    for (value in this.hours) {
      var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcHourlyValues: function() {
    for (value in this.custPerHour) {
      // calculate cups of coffee sold per hour
      var cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
      // calculate packaged coffee sold per hour
      var poundsPerHour = Math.round((this.custPerHour[value] * this.poundsPerCust) * 10) / 10;
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
      // calculate cups in terms of pounds
      var cupsInPounds = Math.round((this.cupsPerHour[value] / 16) * 10) / 10;
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      var employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = Math.round((this.cupsPerPound[value] + this.poundsPerHour[value]) * 10 ) / 10;
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var main = document.getElementById('main');
    var storeName = document.createElement('p');
    storeName.textContent = this.name;
    main.appendChild(storeName);
  },

  createList: function() {
    var main = document.getElementById('main');
    var ul_tag = document.createElement('ul');
    ul_tag.id = 'capHill';
    main.appendChild(ul_tag);
  },

  createListItems: function() {
    var ul_tag = document.getElementById('capHill');
    for (value in this.hours) {
      var listData = document.createElement('li');
      listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      ul_tag.appendChild(listData);
    }
  },

  createListTotals: function() {
    var ul_tag = document.getElementById('capHill');
    var listData = document.createElement('li');
    // append total custsomers
    listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    ul_tag.appendChild(listData);
    // append total cups
    listData = document.createElement('li');
    listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    ul_tag.appendChild(listData);
    // append total packaged pounds
    listData = document.createElement('li');
    listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    ul_tag.appendChild(listData);
    // append daily pounds total
    listData = document.createElement('li');
    listData.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    ul_tag.appendChild(listData);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcHourlyValues();
    this.calcEmployeesPerHour();
    this.calcTotalPoundsPerHour();
    this.displayName();
    this.createList();
    this.createListItems();
    this.createListTotals();
  }
};


var seattleLibrary = {

  name: 'Seattle Public Library',
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  minCust: 9,
  maxCust: 45,
  cupsPerCust: 2.6,
  poundsPerCust: .02,

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
      var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcHourlyValues: function() {
    for (value in this.custPerHour) {
      // calculate cups of coffee sold per hour
      var cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
      // calculate packaged coffee sold per hour
      var poundsPerHour = Math.round((this.custPerHour[value] * this.poundsPerCust) * 10) / 10;
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
      // calculate cups in terms of pounds
      var cupsInPounds = Math.round((this.cupsPerHour[value] / 16) * 10) / 10;
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      var employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = Math.round((this.cupsPerPound[value] + this.poundsPerHour[value]) * 10 ) / 10;
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var main = document.getElementById('main');
    var storeName = document.createElement('p');
    storeName.textContent = this.name;
    main.appendChild(storeName);
  },

  createList: function() {
    var main = document.getElementById('main');
    var ul_tag = document.createElement('ul');
    ul_tag.id = 'spl';
    main.appendChild(ul_tag);
  },

  createListItems: function() {
    var ul_tag = document.getElementById('spl');
    for (value in this.hours) {
      var listData = document.createElement('li');
      listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      ul_tag.appendChild(listData);
    }
  },

  createListTotals: function() {
    var ul_tag = document.getElementById('spl');
    var listData = document.createElement('li');
    // append total custsomers
    listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    ul_tag.appendChild(listData);
    // append total cups
    listData = document.createElement('li');
    listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    ul_tag.appendChild(listData);
    // append total packaged pounds
    listData = document.createElement('li');
    listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    ul_tag.appendChild(listData);
    // append daily pounds total
    listData = document.createElement('li');
    listData.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    ul_tag.appendChild(listData);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcHourlyValues();
    this.calcEmployeesPerHour();
    this.calcTotalPoundsPerHour();
    this.displayName();
    this.createList();
    this.createListItems();
    this.createListTotals();
  }
};


var southLakeUnion = {

  name: 'South Lake Union',
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  minCust: 5,
  maxCust: 18,
  cupsPerCust: 1.3,
  poundsPerCust: .04,

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
      var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcHourlyValues: function() {
    for (value in this.custPerHour) {
      // calculate cups of coffee sold per hour
      var cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
      // calculate packaged coffee sold per hour
      var poundsPerHour = Math.round((this.custPerHour[value] * this.poundsPerCust) * 10) / 10;
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
      // calculate cups in terms of pounds
      var cupsInPounds = Math.round((this.cupsPerHour[value] / 16) * 10) / 10;
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      var employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = Math.round((this.cupsPerPound[value] + this.poundsPerHour[value]) * 10) / 10;
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var main = document.getElementById('main');
    var storeName = document.createElement('p');
    storeName.textContent = this.name;
    main.appendChild(storeName);
  },

  createList: function() {
    var main = document.getElementById('main');
    var ul_tag = document.createElement('ul');
    ul_tag.id = 'slu';
    main.appendChild(ul_tag);
  },

  createListItems: function() {
    var ul_tag = document.getElementById('slu');
    for (value in this.hours) {
      var listData = document.createElement('li');
      listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      ul_tag.appendChild(listData);
    }
  },

  createListTotals: function() {
    var ul_tag = document.getElementById('slu');
    var listData = document.createElement('li');
    // append total custsomers
    listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    ul_tag.appendChild(listData);
    // append total cups
    listData = document.createElement('li');
    listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    ul_tag.appendChild(listData);
    // append total packaged pounds
    listData = document.createElement('li');
    listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    ul_tag.appendChild(listData);
    // append daily pounds total
    listData = document.createElement('li');
    listData.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    ul_tag.appendChild(listData);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcHourlyValues();
    this.calcEmployeesPerHour();
    this.calcTotalPoundsPerHour();
    this.displayName();
    this.createList();
    this.createListItems();
    this.createListTotals();
  }
};


var seaTac = {

  name: 'Sea-Tac Airport',
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  minCust: 28,
  maxCust: 44,
  cupsPerCust: 1.1,
  poundsPerCust: .41,

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
      var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcHourlyValues: function() {
    for (value in this.custPerHour) {
      // calculate cups of coffee sold per hour
      var cupsPerHour = Math.round((this.custPerHour[value] * this.cupsPerCust) * 10) / 10;
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
      // calculate packaged coffee sold per hour
      var poundsPerHour = Math.round((this.custPerHour[value] * this.poundsPerCust) * 10) / 10;
      this.poundsPerHour.push(poundsPerHour);
      this.packagedPounds += poundsPerHour;
      // calculate cups in terms of pounds
      var cupsInPounds = Math.round((this.cupsPerHour[value] / 16) * 10) / 10;
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for (value in this.custPerHour) {
      var employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (value in this.hours) {
      var hourlyPounds = Math.round((this.cupsPerPound[value] + this.poundsPerHour[value]) * 10 ) / 10;
      this.totalPoundsPerHour.push(hourlyPounds);
      this.dailyPounds += hourlyPounds;
    }
  },

  displayName: function() {
    var main = document.getElementById('main');
    var storeName = document.createElement('p');
    storeName.textContent = this.name;
    main.appendChild(storeName);
  },

  createList: function() {
    var main = document.getElementById('main');
    var ul_tag = document.createElement('ul');
    ul_tag.id = 'seatac';
    main.appendChild(ul_tag);
  },

  createListItems: function() {
    var ul_tag = document.getElementById('seatac');
    for (value in this.hours) {
      var listData = document.createElement('li');
      listData.textContent = this.hours[value] + ': ' + this.totalPoundsPerHour[value] + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsPerPound[value] + ' lbs), ' + this.poundsPerHour[value] + ' lbs-to-go]',
      ul_tag.appendChild(listData);
    }
  },

  createListTotals: function() {
    var ul_tag = document.getElementById('seatac');
    var listData = document.createElement('li');
    // append total custsomers
    listData.textContent = 'Total customers at ' + this.name + ': ' + Math.ceil(this.totalCustomers);
    ul_tag.appendChild(listData);
    // append total cups
    listData = document.createElement('li');
    listData.textContent = 'Total cups sold at ' + this.name + ': ' + Math.ceil(this.totalCups);
    ul_tag.appendChild(listData);
    // append total packaged pounds
    listData = document.createElement('li');
    listData.textContent = 'Total to-go pound packages sold at ' + this.name + ': ' + (this.packagedPounds).toFixed(1);
    ul_tag.appendChild(listData);
    // append daily pounds total
    listData = document.createElement('li');
    listData.textContent = 'Total Pounds of beans needed at ' + this.name + ': ' + (this.dailyPounds).toFixed(1);
    ul_tag.appendChild(listData);
  },

  theBigOne: function() {
    this.avgCustPerHour();
    this.calcHourlyValues();
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
seattleLibrary.theBigOne();
southLakeUnion.theBigOne();
seaTac.theBigOne();

// loop through hourly totals and add values to new global array to get hourly totals for all
// stores combined.
// i.e.   for (i in this.hours) {
//  hourlyTotals = pikePlace.totals[i] + capHill.totals[i] + seattleLibrary.totals[i]..etc..
// for each hour of the day.
// }
