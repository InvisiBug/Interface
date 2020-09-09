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
const fs = require("fs");
const path = require("path");

////////////////////////////////////////////////////////////////////////
//
//  #####                                              ######
// #     # #####  ####  #####    ##    ####  ######    #     # #####  # #    # ###### #####   ####
// #         #   #    # #    #  #  #  #    # #         #     # #    # # #    # #      #    # #
//  #####    #   #    # #    # #    # #      #####     #     # #    # # #    # #####  #    #  ####
//       #   #   #    # #####  ###### #  ### #         #     # #####  # #    # #      #####       #
// #     #   #   #    # #   #  #    # #    # #         #     # #   #  #  #  #  #      #   #  #    #
//  #####    #    ####  #    # #    #  ####  ######    ######  #    # #   ##   ###### #    #  ####
//
////////////////////////////////////////////////////////////////////////
const setStore = (store, data) => {
  var storePath = path.join(__dirname, `${"../../../PersistantStorage/"}${store}${".json"}`);
  try {
    fs.writeFileSync(storePath, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

const getStore = (store) => {
  const storePath = path.join(__dirname, "../../../", "PersistantStorage", `${store}${".json"}`);
  try {
    return JSON.parse(fs.readFileSync(storePath, "utf8"));
  } catch (e) {
    console.log(e);
  }
};

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
  let data = getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const time = date.getHours() + "." + date.getMinutes();

  if ((data[days[day]][0] <= time && time <= data[days[day]][1]) || (data[days[day]][2] <= time && time <= data[days[day]][3])) {
    data = toggleLogic(data, "isActive", true);
    if (!oneshot[0]) {
      console.log("Send heating on signal");
      oneshot[0] = true;
    }
    oneshot = [oneshot[0], false, false];
  } else if (!data.auto && data.isOn) {
    data = toggleLogic(data, "isActive", true);
    if (!oneshot[1]) {
      console.log("Send heating on signal");
      oneshot[1] = true;
    }
    oneshot = [false, oneshot[1], oneshot[2]];
  } else {
    data = toggleLogic(data, "isActive", false);
    if (!oneshot[2]) {
      console.log("Send heating off signal");
      oneshot[2] = true;
    }
    onehsot = [false, false, oneshot[2]];
  }

  setStore("heatingSchedule", data);
}, 1.5 * 1000);

const toggleLogic = (data, point, value) => {
  data = {
    ...data,
    [point]: value,
  };
  return data;
};
