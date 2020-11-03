const fs = require("fs");
const path = require("path");

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

const setValve = (room, value) => {
  updateValue("Radiator Valves", room, value);
};

const getValve = (room) => {
  return readValue("Radiator Valves", room);
};

// const updateHeatingZone = (room, point, value) => {
//   let data = getStore("Heating Zones");
//   data = {
//     ...data,
//     [room]: {
//       ...data[room],
//       [point]: value,
//     },
//   };
//   setStore("Heating Zones", data);
// };

// updateHeatingZone("ourRoom", "needsHeat", false);

// console.log(getStore("Heating Zones"));

// setTimeout(() => updateValue("Heating Zones"), 5000);

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
