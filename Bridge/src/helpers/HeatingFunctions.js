const { updateValue } = require("./StorageDriver");
 require("../App")
const overRunTime = 15;
const boostTime = 20;

const boostOn = () => {
  console.log("Boost On");
  let now = new Date();

  updateValue("heatingSchedule", "boostTime", now.setMinutes(now.getMinutes() + boostTime));
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + boostTime + overRunTime));
};

const boostOff = () => {
  console.log("Boost Off");
  let now = new Date();

  updateValue("heatingSchedule", "boostTime", new Date().getTime());
  radiatorFanOverrun();
};

const radiatorFanOverrun = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + overRunTime));
};

const radiatorFanOn = (time = 99999) => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + time));
};

const clearRadiatorFanTime = () => {
  updateValue("heatingSchedule", "radiatorFanTime", new Date().getTime());
};

module.exports = {
  boostOn: boostOn,
  boostOff: boostOff,
  radiatorFanOverrun: radiatorFanOverrun,
  clearRatiatorFanTime: clearRadiatorFanTime,
  radiatorFanOn: radiatorFanOn,
};
brnch check
