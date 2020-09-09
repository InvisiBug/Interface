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
  let scheduleData = store.getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const time = date.getHours() + "." + date.getMinutes();

  if (
    (scheduleData[days[day]][0] <= time && time <= scheduleData[days[day]][1]) ||
    (scheduleData[days[day]][2] <= time && time <= scheduleData[days[day]][3] && scheduleData.auto)
  ) {
    scheduleData = toggleLogic(scheduleData, "isActive", true);
    if (!oneshot[0]) {
      console.log("Send heating on signal");
      oneshot[0] = true;
    }
    oneshot = [oneshot[0], false, false];
  } else if (!scheduleData.auto && scheduleData.isOn) {
    scheduleData = toggleLogic(scheduleData, "isActive", true);
    if (!oneshot[1]) {
      console.log("Send heating on signal");
      oneshot[1] = true;
    }
    oneshot = [false, oneshot[1], false];
  } else {
    scheduleData = toggleLogic(scheduleData, "isActive", false);
    if (!oneshot[2]) {
      console.log("Send heating off signal");
      oneshot[2] = true;
    }
    onehsot = [false, false, oneshot[2]];
  }

  store.setStore("heatingSchedule", scheduleData);
}, 1.5 * 1000);

const toggleLogic = (data, point, value) => {
  data = {
    ...data,
    [point]: value,
  };
  return data;
};
