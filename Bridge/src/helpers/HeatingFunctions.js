const { updateValue, readValue } = require("./StorageDriver");

const overRunTime = 15;
const boostTime = 20;

////////////////////////////////////////////////////////////////////////
//
//  ######
//  #     #  ####   ####   ####  #####
//  #     # #    # #    # #        #
//  ######  #    # #    #  ####    #
//  #     # #    # #    #      #   #
//  #     # #    # #    # #    #   #
//  ######   ####   ####   ####    #
//
////////////////////////////////////////////////////////////////////////
const boostOn = () => {
  let now = new Date();
  updateValue("heatingSchedule", "boostTime", now.setMinutes(now.getMinutes() + boostTime)); // Abstract this out in to a function
  heatingOn(boostTime);
};

const boostOff = () => {
  let now = new Date();
  updateValue("heatingSchedule", "boostTime", new Date().getTime());
  heatingOff();
};

////////////////////////////////////////////////////////////////////////
//
//  ######                                                #######
//  #     #   ##   #####  #   ##   #####  ####  #####     #         ##   #    #
//  #     #  #  #  #    # #  #  #    #   #    # #    #    #        #  #  ##   #
//  ######  #    # #    # # #    #   #   #    # #    #    #####   #    # # #  #
//  #   #   ###### #    # # ######   #   #    # #####     #       ###### #  # #
//  #    #  #    # #    # # #    #   #   #    # #   #     #       #    # #   ##
//  #     # #    # #####  # #    #   #    ####  #    #    #       #    # #    #
//
////////////////////////////////////////////////////////////////////////
// Radiator Fan
const radiatorFanOn = (time = 99999) => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + time));
};

const radiatorFanOff = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes()));
};

const radiatorFanOverrun = () => {
  let now = new Date();
  updateValue("heatingSchedule", "radiatorFanTime", now.setMinutes(now.getMinutes() + overRunTime));
};

const clearRadiatorFanTime = () => {
  updateValue("heatingSchedule", "radiatorFanTime", new Date().getTime());
};

////////////////////////////////////////////////////////////////////////
//
//  #    # ######   ##   ##### # #    #  ####
//  #    # #       #  #    #   # ##   # #    #
//  ###### #####  #    #   #   # # #  # #
//  #    # #      ######   #   # #  # # #  ###
//  #    # #      #    #   #   # #   ## #    #
//  #    # ###### #    #   #   # #    #  ####
//
////////////////////////////////////////////////////////////////////////
// Heating
const heatingOn = (time = 99999) => {
  let now = new Date();
  radiatorFanOn(time + overRunTime);
  updateValue("heatingSchedule", "heatingTime", now.setMinutes(now.getMinutes() + time));
};

const heatingOff = () => {
  let now = new Date();

  if (isHeatingOn()) {
    radiatorFanOverrun();
    // updateValue("heatingSchedule", "heatingTime", now.setMinutes(now.getMinutes()));
    updateValue("heatingSchedule", "heatingTime", new Date().getTime());
  }
};

const isHeatingOn = () => {
  return readValue("heatingSchedule", "heatingTime") > new Date();
};

clearRadiatorFanTime();

module.exports = {
  boostOn: boostOn,
  boostOff: boostOff,
  radiatorFanOverrun: radiatorFanOverrun,
  clearRatiatorFanTime: clearRadiatorFanTime,
  radiatorFanOn: radiatorFanOn,
  radiatorFanOff: radiatorFanOff,
  heatingOn: heatingOn,
  heatingOff: heatingOff,
};
