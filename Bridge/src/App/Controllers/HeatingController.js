/*
  *NB*
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
const { getStore, setStore, toggleLogic } = require("../../helpers/StorageDriver");
// const { toggleLogic } = require("../../helpers/Functions");
const { defaultConfiguration } = require("../Calor Imperium");

const { days } = require("../../helpers/Constants");

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
  let now = new Date().getTime();
  const time = date.getHours() + "." + date.getMinutes();

  // console.log(`${"Time: "} ${time} ${" Schedule: "}${scheduleData[days[day]]}`);

  if (scheduleData.boostTime < now) {
    // Boost Off
    if (scheduleData.auto) {
      // Schedule in auto mode
      if (
        (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) || // Seems to be some overlap ie schedule on at 16:02 when should be on at 16:15
        (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
      ) {
        heatingOn(); // On demand from schedule
      } else {
        heatingOff(); // off demand from schedule
      }
    } else if (!scheduleData.auto && scheduleData.isOn) {
      // *NB* Maybe rename isOn to something like onRequested
      heatingOn(); // On button
    } else {
      heatingOff(); // Off button
    }
  } else {
    // Boost On
    heatingOn();
  }
}, 1.5 * 1000);

// const heatingOn = () => {
//   if (!latch) {
//     toggleLogic("heatingSchedule", "isActive", true);
//     latch = !latch;
//     // console.log("Send On Signal");
//   }
// };

// const heatingOff = () => {
//   if (latch) {
//     toggleLogic("heatingSchedule", "isActive", false);
//     latch = !latch;
//     // console.log("Send Off Signal");
//   }
// };

const heatingOn = () => {
  toggleLogic("heatingSchedule", "isActive", true);
  latch = true;
  // console.log("Send On Signal");
};

const heatingOff = () => {
  toggleLogic("heatingSchedule", "isActive", false);
  latch = false;
};

// *NB* This bit can be condensed down
// Heating
setInterval(() => {
  let heating = getStore("Heating");
  if (latch) {
    if (heating.isConnected && !heating.isOn) {
      // console.log("Heating Turn On ");
      client.publish("Heating Control", "1");
    }
  } else if (heating.isConnected && heating.isOn) {
    // console.log("Heating Turn Off");
    client.publish("Heating Control", "0");
  }
}, 2 * 1000);

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

// Boost
// setInterval(() => {
//   let heating = getStore("heatingSchedule");
//   let now = new Date().getTime();

//   if (heating.boost) {
//     if (now < heating.boostTime) {
//       console.log("On From Boost");
//       heatingOn();
//     } else {
//       console.log("Off From Boost");
//       // toggleLogic("heatingSchedule", "boost", false);
//       heatingOff();
//     }
//   }
// }, 100);
