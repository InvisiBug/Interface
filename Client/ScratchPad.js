var date = new Date();

var data = {
  monday: [2.3, 4.5, 6.5, 8.5],
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

console.log(data.monday[0]);

console.log(date.getDate() - 1);
console.log(date.getHours());
console.log(date.getMinutes());

const day = date.getDate() - 1;
const min = date.getMinutes();
const hour = date.getHours();
// const hour = 2.5;

const time = date.getHours() + "." + date.getMinutes();

console.log(time);

console.log(hour);
console.log(data[days[day]][0]);
console.log(data[days[day]][1]);
console.log(data[days[day]][2]);
console.log(data[days[day]][3]);

if (
  (data[days[day]][0] <= time && time <= data[days[day]][1]) ||
  (data[days[day]][2] <= time && time <= data[days[day]][3])
) {
  console.log("Schedule Active");
} else {
  console.log("Not Ready");
}

console.log(data[days[day]][0]);

console.log(date);
