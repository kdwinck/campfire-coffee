// create Pike Place Coffee shop
var pikePlace = {
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

  avgCustPerHour: function() {
    for (item in this.hours) {
      customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.custPerHour.push(customers);
      this.totalCustomers += customers;
    }
  },

  calcCupsPerHour: function() {
    for (item in this.custPerHour) {
      cupsPerHour = Math.ceil(this.custPerHour[item] * this.cupsPerCust);
      this.cupsPerHour.push(cupsPerHour);
      this.totalCups += cupsPerHour;
    }
  }

};

pikePlace.avgCustPerHour();
console.log(pikePlace.custPerHour);
console.log(pikePlace.totalCustomers);
pikePlace.calcCupsPerHour();
console.log(pikePlace.cupsPerHour);
console.log(pikePlace.totalCups);
