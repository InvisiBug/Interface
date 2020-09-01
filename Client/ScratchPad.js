var date = new Date();

var data = {
  monday: [4.3, 8.15, 18.3, 23.45],
  tuesday: [6.3, 8.3, 18.15, 23],
  wednesday: [6.3, 8.15, 18.15, 23],
  thursday: [6, 8, 18, 23],
  friday: [6, 8, 18, 23],
  saturday: [5.3, 8, 18, 24],
  sunday: [5.3, 8, 18, 24],
  auto: true,
  boost: false,
  isOn: false,
  isActive: false
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

console.log(date.getDate() - 1);
console.log(date.getHours());
console.log(date.getMinutes());

console.log(data.value.vals[days[1]]);

console.log(date);
