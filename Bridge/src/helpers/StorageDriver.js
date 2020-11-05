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
  // let data = getStore(store);
  // return data[point];

  return getStore(store)[point];
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

const setValveDemand = (room, value) => {
  let data = getStore("Environmental Data");

  data = {
    ...data,
    radiatorValves: {
      ...data.radiatorValves,
      [room]: {
        ...data.radiatorValves[room],
        demand: "value",
      },
    },
  };

  setStore("Environmental Data", data);

  console.log(data);
};

setValveDemand("ourRoom", "boop");

const getValveDemand = (room) => {
  return getStore("Environmental Data").radiatorValves[room].demand;
};

const getValveState = (room) => {
  return getStore("Environmental Data").radiatorValves[room].isOpen;
};

// Setpoints
const getRoomSetpoints = (room) => {
  return getStore("Environmental Data").setpoints[room];
};

// Conditions
const getRoomConditions = (room) => {
  return getStore("Environmental Data").heatingSensors[room];
};

const getRoomTemperature = (room) => {
  return getStore("Environmental Data").heatingSensors[room].temperature;
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
  getValveState: getValveState,
  getRoomSetpoints: getRoomSetpoints,
  getRoomConditions: getRoomConditions,
  getRoomTemperature: getRoomTemperature,
  getValveDemand: getValveDemand,
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
