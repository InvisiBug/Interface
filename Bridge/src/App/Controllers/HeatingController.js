////////////////////////////////////////////////////////////////////////
//
//   #####
//  #     #  ####  #    # ###### #  ####
//  #       #    # ##   # #      # #    #
//  #       #    # # #  # #####  # #
//  #       #    # #  # # #      # #  ###
//  #     # #    # #   ## #      # #    #
//   #####   ####  #    # #      #  ####
//
////////////////////////////////////////////////////////////////////////
// Express
const express = require("express");
var app = (module.exports = express());
const store = require("../../helpers/StorageDriver");
const functions = require("../../helpers/Functions");
const { defaultConfiguration } = require("../Calor Imperium");

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
// var oneshot = [false, false, false, false];

var latch = false;
////////////////////////////////////////////////////////////////////////
//
// #######
//    #    # #    # ###### #####   ####
//    #    # ##  ## #      #    # #
//    #    # # ## # #####  #    #  ####
//    #    # #    # #      #####       #
//    #    # #    # #      #   #  #    #
//    #    # #    # ###### #    #  ####
//
////////////////////////////////////////////////////////////////////////
setInterval(() => {
  let scheduleData = store.getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const time = date.getHours() + "." + date.getMinutes();

  // console.log(`${"Time: "} ${time} ${" Schedule: "}${scheduleData[days[day]]}`);

  if (scheduleData.auto) {
    // Schedule in auto mode
    if (
      (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) ||
      (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
    ) {
      // On demand from schedule
      scheduleData = functions.toggleLogic(scheduleData, "isActive", true); // wont turn off if the schedule goes from on to off
      sendOnSignal();
    } else {
      // off demand from schedule
      sendOffSignal();
    }
  } else if (!scheduleData.auto && scheduleData.isOn) {
    // On button
    scheduleData = functions.toggleLogic(scheduleData, "isActive", true);
    sendOnSignal();
  } else {
    // Off button
    scheduleData = functions.toggleLogic(scheduleData, "isActive", false);
    sendOffSignal();
  }
  store.setStore("heatingSchedule", scheduleData);

  // console.log(oneshot);
}, 1.5 * 1000);

const sendOnSignal = () => {
  if (!latch) {
    latch = !latch;
    console.log("Send On Signal");
  }
};

const sendOffSignal = () => {
  if (latch) {
    latch = !latch;
    console.log("Send Off Signal");
  }
};

// *NB* This bit can be condensed down
// Heating
setInterval(() => {
  let heating = store.getStore("Heating");
  if (latch) {
    if (heating.isConnected && !heating.isOn) {
      console.log("Heating Turn On ");
      client.publish("Heating Control", "1");
    }
  } else if (heating.isConnected && heating.isOn) {
    console.log("Heating Turn Off");
    client.publish("Heating Control", "0");
  }
}, 2 * 1000);

// Radiator Fan
setInterval(() => {
  let radiatorFan = store.getStore("Radiator Fan");
  if (radiatorFan.isAutomatic) {
    if (latch) {
      if (radiatorFan.isConnected && !radiatorFan.isOn) {
        console.log("Radiator Fan Turn On");
        client.publish("Radiator Fan Control", "1");
      }
    } else if (radiatorFan.isConnected && radiatorFan.isOn) {
      console.log("Radiator Fan Turn Off");
      client.publish("Radiator Fan Control", "0");
    }
  }
}, 1 * 1000);
