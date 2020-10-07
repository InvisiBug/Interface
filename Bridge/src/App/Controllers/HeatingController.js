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
  const time = date.getHours() + "." + date.getMinutes();

  // console.log(`${"Time: "} ${time} ${" Schedule: "}${scheduleData[days[day]]}`);

  if (!scheduleData.boost) {
    if (scheduleData.auto) {
      // Schedule in auto mode
      if (
        (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) || // Seems to be some overlap ie schedule on at 16:02 when should be on at 16:15
        (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
      ) {
        // On demand from schedule
        toggleLogic("heatingSchedule", "isActive", true);
        sendOnSignal();
      } else if (!scheduleData.boost) {
        // off demand from schedule
        sendOffSignal();
      }
    } else if (!scheduleData.auto && scheduleData.isOn) {
      // On button
      toggleLogic("heatingSchedule", "isActive", true);
      sendOnSignal();
    } else {
      // Off button
      toggleLogic("heatingSchedule", "isActive", false);
      sendOffSignal();
    }
  }
}, 1.5 * 1000);

const sendOnSignal = () => {
  if (!latch) {
    latch = !latch;
    // console.log("Send On Signal");
  }
};

const sendOffSignal = () => {
  if (latch) {
    latch = !latch;
    // console.log("Send Off Signal");
  }
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
  if (radiatorFan.isAutomatic) {
    // if (now < heating.boostTime) {
    //   sendOnSignal();
    // } else {
    //   toggleLogic("heatingSchedule", "boost", false);
    //   sendOffSignal();
    // }
    if (latch) {
      if (radiatorFan.isConnected && !radiatorFan.isOn) {
        // console.log("Radiator Fan Turn On");
        client.publish("Radiator Fan Control", "1");
      }
    } else if (radiatorFan.isConnected && radiatorFan.isOn) {
      // console.log("Radiator Fan Turn Off");
      client.publish("Radiator Fan Control", "0");
    }
  }
}, 1 * 1000);

// Boost
setInterval(() => {
  let heating = getStore("heatingSchedule");
  let now = new Date().getTime();

  if (heating.boost) {
    if (now < heating.boostTime) {
      sendOnSignal();
    } else {
      toggleLogic("heatingSchedule", "boost", false);
      sendOffSignal();
    }
  }
}, 100);
