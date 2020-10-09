const { updateValue } = require("./StorageDriver");

const overRunTime = 15;

const boostOn = () => {
  console.log("Boost On");

  let now = new Date();
  const boostTime = 15;

  updateValue("heatingSchedule", "boostTime", now.setMinutes(now.getMinutes() + boostTime));
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + boostTime + overRunTime));
};

const boostOff = () => {
  console.log("Boost Off");
  let now = new Date();

  updateValue("heatingSchedule", "boostTime", new Date().getTime());
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + overRunTime));
};

const radiatorFanOverrun = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + overRunTime));
};

const clearRadiatorFanTime = () => {
  updateValue("heatingSchedule", "radiatorFanTime", new Date().getTime());
};

module.exports = {
  boostOn: boostOn,
  boostOff: boostOff,
  radiatorFanOverrun: radiatorFanOverrun,
  clearRatiatorFanTime: clearRadiatorFanTime,
};
