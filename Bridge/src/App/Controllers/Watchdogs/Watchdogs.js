const express = require("express");
var app = (module.exports = express());
const { getStore, setStore, updateValue } = require("../../../helpers/StorageDriver");

// console.log("Hello from watchdogs");

// TODO, Move each watchdog to seperate files
// Heating
setInterval(() => {
  let heatingSchedule = getStore("heatingSchedule");
  let heatingController = getStore("Heating");
  let now = new Date().getTime();

  if (now < heatingSchedule.heatingTime) {
    if (heatingController.isConnected && !heatingController.isOn) {
      console.log("Heating On");
      client.publish("Heating Control", "1");
    }
  } else if (heatingController.isConnected && heatingController.isOn) {
    console.log("Heating Off");
    client.publish("Heating Control", "0");
  }
}, 1 * 1000);

// Radiator Fan
setInterval(() => {
  let radiatorFan = getStore("Radiator Fan");
  let heating = getStore("heatingSchedule");
  let now = new Date().getTime();

  if (radiatorFan.isAutomatic) {
    if (now < heating.radiatorFanTime) {
      if (radiatorFan.isConnected && !radiatorFan.isOn) {
        client.publish("Radiator Fan Control", "1");
      }
    } else if (radiatorFan.isConnected && radiatorFan.isOn) {
      client.publish("Radiator Fan Control", "0");
    }
  }
}, 1 * 1000);
