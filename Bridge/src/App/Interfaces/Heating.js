// Express
const express = require("express");
const app = (module.exports = express());

const { getStore, setStore, toggleLogic } = require("../../helpers/StorageDriver");
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
  if (topic == "Heating") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      deviceData.isConnected = false;
      setStore("Heating", deviceData);
    }, 10 * 1000);

    if (payload != `${"Heating Disconnected"}`) {
      var mqttData = JSON.parse(payload);

      deviceData = {
        ...deviceData,
        isConnected: true,
        isOn: mqttData.state,
      };
      setStore("Heating", deviceData);
    } else {
      console.log(`${"Heating Disconnected"}`);
    }
  } else if (topic === "Heating Button") {
    const scheduleData = getStore("heatingSchedule");
    if (scheduleData.boost) {
      toggleLogic("heatingSchedule", "boostTime", new Date().getTime()); // Turn Boost Off
      console.log("Boost was on, turn off");
    } else {
      console.log("Boost was off, turn on");
      let boostTime = new Date();
      toggleLogic("heatingSchedule", "boost", true);
      toggleLogic("heatingSchedule", "boostTime", boostTime.setMinutes(boostTime.getMinutes() + 15));
    }
  }
});

setInterval(() => {
  sendSocketData();
}, 1 * 1000);

const sendSocketData = () => {
  io.emit("Heating", deviceData);
};
