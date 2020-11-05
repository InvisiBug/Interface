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
// const { getStore, setStore, updateValue, getRoomSetpoints, getRoomTemperature } = require("../../helpers/StorageDriver");
// const { defaultConfiguration } = require("../Calor Imperium");
// const { days } = require("../../helpers/Constants");
// const { radiatorFanOn, radiatorFanOverrun, heatingOn, heatingOff } = require("../../helpers/HeatingFunctions");

const { getRoomSetpoints, getRoomTemperature } = require("../../helpers/StorageDriver");
const { openOurRoomValve, closeOurRoomValve } = require("../../helpers/ValveDriver");

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
  /*
  get setpoints
  get current temperature
  get current time

  if current temperature is less than desired (add hysteris)
  open radiator valve

  once valve is open, turn on radiator fan and heating
  */

  let setpoint = getRoomSetpoints("ourRoom");
  let currentTemp = getRoomTemperature("ourRoom");

  var date = new Date();
  let currentHour = date.getHours();

  if (currentTemp < setpoint[currentHour]) {
    // openOurRoomValve();
  } else {
    // console.log("Dont add heat");
  }

  // console.log(`Current Temp: ${currentTemp} \t Target Temp: ${setpoint[currentHour]}`);
}, 0.5 * 1000);
