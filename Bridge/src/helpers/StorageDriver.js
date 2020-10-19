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
//boop
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

module.exports = {
  getStore: getStore,
  setStore: setStore,
  updateValue: updateValue,
  readValue: readValue,
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
