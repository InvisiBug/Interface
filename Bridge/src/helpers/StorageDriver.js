const fs = require("fs");
const path = require("path");
const { get } = require("../App/Weather");

const setStore = (store, data) => {
  const storePath = path.join(`${__dirname}${"/../../PersistantStorage/"}${store}${".json"}`);
  try {
    fs.writeFileSync(storePath, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

const getStore = (store) => {
  const storePath = path.join(`${__dirname}${"/../../PersistantStorage/"}${store}${".json"}`);
  try {
    return JSON.parse(fs.readFileSync(storePath));
  } catch (e) {
    console.log(e);
  }
};

const updateValue = (store, point, value) => {
  let data = getStore(store);
  data = {
    ...data,
    [point]: value,
  };
  setStore(store, data);
};

const readValue = (store, point) => {
  let data = getStore(store);
  return data[point];
};

const updateBoostTime = (time = 0) => {
  let now = new Date();
  updateValue("heatingSchedule", "boostTime", now.setMinutes(now.getMinutes() + time));
};

const updateRadiatorFanTime = (time = 0) => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + time));
};

const updateHeatingTime = (time = 0) => {
  let now = new Date();
  updateValue("heatingSchedule", "heatingTime", now.setMinutes(now.getMinutes() + time));
};

// Valves
const setValve = (room, value) => {
  updateValue("Radiator Valves", room, value);
};

const getValve = (room) => {
  return readValue("Radiator Valves", room);
};

// Setpoints
const getRoomSetpoints = (room) => {
  return readValue("Room Setpoints", room);
};

// Conditions
const getRoomConditions = (room) => {
  let data = getStore("Environmental Data");
  return data.heatingSensors[room];
};

const getRoomTemperature = (room) => {
  let data = getStore("Environmental Data");
  return data.heatingSensors[room].temperature;
};

module.exports = {
  getStore: getStore,
  setStore: setStore,
  updateValue: updateValue,
  readValue: readValue,
  updateBoostTime: updateBoostTime,
  updateRadiatorFanTime: updateRadiatorFanTime,
  updateHeatingTime: updateHeatingTime,
  setValve: setValve,
  getValve: getValve,
  getRoomSetpoints: getRoomSetpoints,
  getRoomConditions: getRoomConditions,
  getRoomTemperature: getRoomTemperature,
};

// function setSchedule(schedule, item, time = 0) {
//   setParameter(schedule, item, (new Date() + time).getTime());
// }

// function setHeatingSchedule(item, time = 0) {
//   setSchedule("heating", item, time);
// }

// setHeatingFanSchedule(time = 0) {
//   setHeatingSchedule("Fan", time);
// }
