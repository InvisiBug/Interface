const express = require("express");
const app = (module.exports = express());
const { getStore, setStore } = require("../../helpers/StorageDriver");
const { camelRoomName, printTime } = require("../../helpers/Functions");

const disconnectedState = {
  isConnected: false,
  isOpen: true,
  demand: false,
  // isOpen: false, // ! Not sure if this should default to closed when disconneted
};

const newValve = (room) => {
  var timer;
  var deviceData = disconnectedState;

  client.on("message", (topic, payload) => {
    if (topic == `${room} ${"Radiator Valve"}`) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        deviceData = disconnectedState;
        let environmentalData = getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          radiatorValves: {
            ...environmentalData.radiatorValves,
            [camelRoomName(room)]: deviceData,
          },
        };
        setStore("Environmental Data", environmentalData); // TODO break this out in to its own setValve function
      }, 10 * 1000);

      if (payload != `${room} ${"Radiator Valve Disconnected"}`) {
        var mqttData = JSON.parse(payload);

        deviceData = {
          ...deviceData,
          isConnected: true,
          isOpen: !mqttData.state,
          // isOpen: deviceData.isOpen,
          // demand: deviceData.demand,
        };

        let environmentalData = getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          radiatorValves: {
            ...environmentalData.radiatorValves,
            [camelRoomName(room)]: deviceData,
          },
        };
        setStore("Environmental Data", environmentalData);
      } else {
        console.log(`${room} ${"Radiator Valve Disconnected at "} ${printTime()}`);
      }
    }
  });
};

module.exports = {
  newValve: newValve,
};
