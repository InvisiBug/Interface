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

module.exports = {
  getStore: getStore,
  setStore: setStore,
};
