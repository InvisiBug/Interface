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
var oneshot = [false, false, false];
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
  // On Off Controller
  let scheduleData = store.getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const time = date.getHours() + "." + date.getMinutes();

  if (scheduleData.auto) {
    if (
      (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) ||
      (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
    ) {
      scheduleData = functions.toggleLogic(scheduleData, "isActive", true);
      if (!oneshot[0]) {
        console.log("Send heating on signal");
        oneshot[0] = true;
      }
      oneshot = [oneshot[0], false, false];
    }
  } else if (!scheduleData.auto && scheduleData.isOn) {
    scheduleData = functions.toggleLogic(scheduleData, "isActive", true);
    if (!oneshot[1]) {
      console.log("Send heating on signal");
      oneshot[1] = true;
    }
    oneshot = [false, oneshot[1], false];
  } else {
    scheduleData = functions.toggleLogic(scheduleData, "isActive", false);
    if (!oneshot[2]) {
      console.log("Send heating off signal");
      oneshot[2] = true;
    }
    // onehsot = [false, false, oneshot[2]];
    oneshot[0] = false; // *NB* Figure out this bullshit later
    oneshot[1] = false;
  }
  store.setStore("heatingSchedule", scheduleData);
}, 1.5 * 1000);

setInterval(() => {
  let heating = store.getStore("Heating");
  if (oneshot[0] || oneshot[1]) {
    if (heating.isConnected && !heating.isOn) {
      console.log("Turn on stupid");
      client.publish("Heating Control", "1");
    }
  } else if (oneshot[2] && heating.isOn) {
    console.log("Turn Off stupid");
    client.publish("Heating Control", "0");
  }
}, 2 * 1000);

setInterval(() => {
  let radiatorFan = store.getStore("Radiator Fan");
  if (radiatorFan.isAutomatic) {
    if (oneshot[0] || oneshot[1]) {
      if (radiatorFan.isConnected && !radiatorFan.isOn) {
        console.log("Turn on stupid");
        client.publish("Radiator Fan Control", "1");
      }
    } else if (oneshot[2] && radiatorFan.isOn) {
      console.log("Turn Off stupid");
      client.publish("Radiator Fan Control", "0");
    }
  }
}, 1 * 1000);
