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
  totalPounds: 0,

  custPerHour: [],
  cupsPerHour: [],
  poundsPerHour: [],
  cupsPerPound: [],
  employeesNeeded: [],

  avgCustPerHour: function() {
    for (item in this.hours) {
      customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcCupsPerHour: function() {
    for (item in this.custPerHour) {
      cupsPerHour = parseFloat((this.custPerHour[item] * this.cupsPerCust).toFixed(1));
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
    }
  },

  calcPoundsPerHour: function() {
    for(item in this.custPerHour) {
      poundsPerHour = parseFloat((this.custPerHour[item] * this.poundsPerCust).toFixed(1));
      this.poundsPerHour.push(poundsPerHour);
      this.totalPounds += poundsPerHour;
    }
  },

  calcCupsPerPound: function() {
    for (value in this.cupsPerHour) {
      cupsInPounds = parseFloat(((this.cupsPerHour[value] * 12) / 16).toFixed(1));
      this.cupsPerPound.push(cupsInPounds);
    }
  },

  calcEmployeesPerHour: function() {
    for(value in this.custPerHour) {
      employees = Math.ceil(this.custPerHour[value] / 30);
      this.employeesNeeded.push(employees);
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
    child.id = 'list';
    parent.appendChild(child);
  },

  createListItems: function() {
    var parent = document.getElementById('list');
    for (value in this.hours) {
      var child = document.createElement('li');
      // 6:00am: 86.4 lbs [23 customers, 27.6 cups (1.4 lbs), 85 lbs to-go]
      child.textContent = this.hours[value] + ': ' + this.totalPounds + ' lbs [' + this.custPerHour[value] + ' customers, ' + this.cupsPerHour[value] + ' cups (' + this.cupsInPounds[value] + ' lbs), ',
      parent.appendChild(child);
    }
  }
};


pikePlace.avgCustPerHour();
console.log(pikePlace.custPerHour);
console.log(pikePlace.totalCustomers);

pikePlace.calcCupsPerHour();
console.log(pikePlace.cupsPerHour);
console.log(pikePlace.totalCups);

pikePlace.calcPoundsPerHour();
console.log(pikePlace.poundsPerHour);
console.log(pikePlace.totalPounds);

pikePlace.calcCupsPerPound();
console.log(pikePlace.cupsPerPound);

pikePlace.calcEmployeesPerHour();
console.log(pikePlace.employeesNeeded);

pikePlace.displayName();
pikePlace.createList();
pikePlace.createListItems();
