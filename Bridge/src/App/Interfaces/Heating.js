// Express
const express = require("express");
const app = (module.exports = express());

const store = require("../../helpers/StorageDriver");
// MQTT
const mqtt = require("mqtt");
const connection = mqtt.connect("mqtt://kavanet.io");

connection.setMaxListeners(15); // Disables event listener warning
connection.subscribe("#", (err) => {
  err ? console.log(err) : null;
});

connection.on("connect", () => null);

////////////////////////////////////////////////////////////////////////
//
//  #     #
//  #     #   ##   #####  #   ##   #####  #      ######  ####
//  #     #  #  #  #    # #  #  #  #    # #      #      #
//  #     # #    # #    # # #    # #####  #      #####   ####
//   #   #  ###### #####  # ###### #    # #      #           #
//    # #   #    # #   #  # #    # #    # #      #      #    #
//     #    #    # #    # # #    # #####  ###### ######  ####
//
////////////////////////////////////////////////////////////////////////
const saveToStorage = true;
var deviceData = {
  isConnected: false,
  isOn: false,
};
var timer = setTimeout(() => {
  deviceData.isConnected = false;
}, 10 * 1000);

////////////////////////////////////////////////////////////////////////
//
//  #     #  #####  ####### #######
//  ##   ## #     #    #       #
//  # # # # #     #    #       #
//  #  #  # #     #    #       #
//  #     # #   # #    #       #
//  #     # #    #     #       #
//  #     #  #### #    #       #
//
////////////////////////////////////////////////////////////////////////
connection.on("message", (topic, payload) => {
  if (topic == `${"Heating"}`) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      deviceData.isConnected = false;
      store.setStore(`${"Heating"}`, deviceData);
    }, 10 * 1000);

    if (payload != `${"Heating Disconnected"}`) {
      var mqttData = JSON.parse(payload);

      deviceData = {
        ...deviceData,
        isConnected: true,
        isOn: mqttData.state,
      };
      store.setStore(`${"Heating"}`, deviceData);
    } else {
      console.log(`${"Heating Disconnected"}`);
    }
  } else if (topic === "Heating Controller Button") {
    let scheduleData = store.getStore("heatingSchedule");
    if (scheduleData.boost) {
      toggleLogic("boostTime", new Date()); // Turn Boost Off
    } else {
      let boostTime = new Date();
    }
    console.log(scheduleData);
    // check the sate of boost time,
    // if not 0 then make 0
    // if 0 then add on an hour

    // put toggle logic inside a helper file first
  }
});

setInterval(() => {
  sendSocketData();
}, 1 * 1000);

const sendSocketData = () => {
  io.emit(`${"Heating"}`, deviceData);
};

const toggleLogic = (point, value) => {
  let data = storageDriver.getStore("heatingSchedule");
  data = {
    ...data,
    [point]: value,
  };
  storageDriver.setStore("heatingSchedule", data);
};
