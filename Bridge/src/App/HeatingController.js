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

// Persistant Storage
const storage = require("node-persist");

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
const getStore = async (store) => {
  await storage.init();
  try {
    return await storage.getItem(store);
  } catch (e) {
    console.log(e);
  }
};

const setStore = async (store, input) => {
  await storage.init();
  try {
    await storage.setItem(store, input);
  } catch (e) {
    console.log(e);
  }
};

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
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
setInterval(async () => {
  let data = await getStore("heatingSchedule");

  var date = new Date();
  const day = date.getDay();
  const time = date.getHours() + "." + date.getMinutes();

  if ((data[days[day]][0] <= time && time <= data[days[day]][1]) || (data[days[day]][2] <= time && time <= data[days[day]][3])) {
    data = toggleLogic(data, "isActive", true);
  } else if (!data.auto && data.isOn) {
    data = toggleLogic(data, "isActive", true);
  } else {
    data = toggleLogic(data, "isActive", false);
  }

  await setStore("heatingSchedule", data);
}, 1.5 * 1000);

const toggleLogic = (data, point, value) => {
  data = {
    ...data,
    [point]: value,
  };
  return data;
};
