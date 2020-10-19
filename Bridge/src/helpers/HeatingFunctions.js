const { updateValue, readValue } = require("./StorageDriver");
const overRunTime = 15;
const boostTime = 20;

// Boost
const boostOn = () => {
  let now = new Date();
  updateValue("heatingSchedule", "boostTime", now.setMinutes(now.getMinutes() + boostTime));
  // updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + boostTime + overRunTime));
  radiatorFanOn(boostTime + overRunTime);
};

const boostOff = () => {
  let now = new Date();
  updateValue("heatingSchedule", "boostTime", new Date().getTime());
  radiatorFanOverrun();
};

// Radiator Fan
const radiatorFanOn = (time = 99999) => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + time));
};

const radiatorFanOff = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes()));
};

const radiatorFanOverrun = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + overRunTime));
};

const clearRadiatorFanTime = () => {
  updateValue("heatingSchedule", "radiatorFanTime", new Date().getTime());
};

// Heating
const heatingOn = (time = 99999) => {
  let now = new Date();
  radiatorFanOn();
  updateValue("heatingSchedule", "heatingTime", now.setMinutes(now.getMinutes() + time));
};

const heatingOff = () => {
  let now = new Date();

  if (readValue("heatingSchedule", "heatingTime") > now) {
    radiatorFanOverrun();
  }

  updateValue("heatingSchedule", "heatingTime", now.setMinutes(now.getMinutes()));
};

clearRadiatorFanTime();

module.exports = {
  boostOn: boostOn,
  boostOff: boostOff,
  radiatorFanOverrun: radiatorFanOverrun,
  clearRatiatorFanTime: clearRadiatorFanTime,
  radiatorFanOn: radiatorFanOn,
  radiatorFanOff: radiatorFanOff,
  heatingOn: heatingOn,
  heatingOff: heatingOff,
};
