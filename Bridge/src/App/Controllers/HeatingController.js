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
const { toggleLogic } = require("../../helpers/Functions");
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

  // *NB* make boost override everything
  if (!scheduleData.boost) {
    if (scheduleData.auto) {
      // Schedule in auto mode
      if (
        (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) || // Seems to be some overlap ie schedule on at 16:02 when should be on at 16:15
        (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3])
      ) {
        // On demand from schedule
        scheduleData = toggleLogic(scheduleData, "isActive", true);
        sendOnSignal();
      } else if (!scheduleData.boost) {
        // off demand from schedule
        console.log("jdkshadkjsah");
        sendOffSignal();
      }
    } else if (!scheduleData.auto && scheduleData.isOn) {
      // On button
      scheduleData = toggleLogic(scheduleData, "isActive", true);
      sendOnSignal();
    } else {
      // Off button
      scheduleData = toggleLogic(scheduleData, "isActive", false);
      sendOffSignal();
    }
    store.setStore("heatingSchedule", scheduleData);
  }
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

// Boost
setInterval(() => {
  let heating = store.getStore("heatingSchedule");
  let now = new Date();

  if (heating.boost) {
    if (now < heating.boostTime) {
      console.log("On Boosted");
      sendOnSignal();
    } else {
      console.log("Off Boosted");
      toggleLogic("boost", false);
      sendOffSignal();
    }
  }
}, 2 * 1000);

// *NB* put this in the helpers file
// const toggleLogic = (point, value) => {
//   let data = store.getStore("heatingSchedule");
//   data = {
//     ...data,
//     [point]: value,
//   };
//   store.setStore("heatingSchedule", data);
// };
