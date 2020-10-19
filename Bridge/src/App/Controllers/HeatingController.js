/* 
  * NB *
  The timers here may cause issues if they are too short 
  the system uses file system sync which references files 
  which have to be qued for reading and writing
  if the file is accessed too quickly there may be issues
*/
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
const { getStore, setStore, updateValue } = require("../../helpers/StorageDriver");
const { defaultConfiguration } = require("../Calor Imperium");
const { days } = require("../../helpers/Constants");
const { radiatorFanOn, radiatorFanOverrun, heatingOn, heatingOff } = require("../../helpers/HeatingFunctions");

// app.use(require("./Watchdogs/Watchdogs"));

var latch = false;
var scheduleDemand = false;
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
  let scheduleData = getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const now = date.getTime();
  const time = date.getHours() + "." + date.getMinutes();

  if (scheduleData.boostTime < now) {
    // Boost Off
    if (scheduleData.auto) {
      // Schedule in auto mode
      if (
        (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) || // Seems to be some overlap ie schedule on at 16:02 when should be on at 16:15
        (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
      ) {
        console.log("Heating On (A)");
        heatingOn(); // On demand from schedule
      } else {
        console.log("Heating Off (B)");
        heatingOff(); // off demand from schedule
      }
    }
  } else {
    // Boost On
    console.log("Heating On (E)");
    heatingOn();
  }
}, 0.5 * 1000);

// TODO, Move each watchdog to seperate files
// ----- Watchdogs -----

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
