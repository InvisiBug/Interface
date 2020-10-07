////////////////////////////////////////////////////////////////////////
//
//  ██████╗ ███████╗██████╗ ██████╗  ██████╗  ██████╗ ███╗   ███╗     ██████╗██╗     ██╗███╗   ███╗ █████╗ ████████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║    ██╔════╝██║     ██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝
//  ██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║██║   ██║██╔████╔██║    ██║     ██║     ██║██╔████╔██║███████║   ██║   █████╗
//  ██╔══██╗██╔══╝  ██║  ██║██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║    ██║     ██║     ██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝
//  ██████╔╝███████╗██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║    ╚██████╗███████╗██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗
//  ╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚═════╝╚══════╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
//
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
// const storageDriver = require("../helpers/StorageDriver");
const { getStore, setStore, toggleLogic } = require("../helpers/StorageDriver");
// const { boostTime } = require("../helpers/Constants");

////////////////////////////////////////////////////////////////////////
//
//    #    ######  ###
//   # #   #     #  #
//  #   #  #     #  #
// #     # ######   #
// ####### #        #
// #     # #        #
// #     # #       ###
//
////////////////////////////////////////////////////////////////////////
// app.post("/api/ci/outside/set",  (req, res) => {
//   console.log(req.body);
//   await storage.init();
//   await storage.setItem("outsideSetpoint", req.body);

//   res.end(null);
// });

// app.get("/api/ci/outside/get",  () => {
//   await storage.init();

//   try {
//     x = await storage.getItem("outsideSetpoint");
//     data = x.value;

//     res.json(data);
//   } catch (e) {
//     console.log(e);
//   }
// });
// -----  Schedule  -----
app.post("/api/ci/schedule/update", (req, res) => {
  setStore("heatingSchedule", frontendToBackend(req.body.data));
  sendHeatingSchedule();
  res.end(null);
});

// ----------  Boost  ----------
app.get("/api/ci/boost/on", (req, res) => {
  let boostTime = new Date();
  // boostTime.setMinutes(boostTime.getMinutes() + -60);
  toggleLogic("heatingSchedule", "boost", true);
  toggleLogic("heatingSchedule", "boostTime", boostTime.setMinutes(boostTime.getMinutes() + 15)); // *NB* figure out why boostTime cant be used here
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/boost/off", (req, res) => {
  toggleLogic("heatingSchedule", "boostTime", new Date().getTime());
  // Boost off gets set by the boost watchdog in the heating controller
  sendHeatingSchedule();
  res.end(null);
});

// -----  Manual  -----
app.get("/api/ci/manual/on", (req, res) => {
  toggleLogic("heatingSchedule", "auto", false);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/manual/off", (req, res) => {
  toggleLogic("heatingSchedule", "auto", true);
  sendHeatingSchedule();
  res.end(null);
});

// ----- On / Off -----
app.get("/api/ci/on", (req, res) => {
  let data = getStore("heatingSchedule");
  if (!data.auto) {
    toggleLogic("heatingSchedule", "isOn", true);
    sendHeatingSchedule();
  }
  res.end(null);
});

app.get("/api/ci/off", (req, res) => {
  let data = getStore("heatingSchedule");
  if (!data.auto) {
    toggleLogic("heatingSchedule", "isOn", false);
    sendHeatingSchedule();
  }
  sendHeatingSchedule();
  res.end(null);
});

////////////////////////////////////////////////////////////////////////
//
//  #####
// #     #  ####   ####  #    # ###### #####
// #       #    # #    # #   #  #        #
//  #####  #    # #      ####   #####    #
//       # #    # #      #  #   #        #
// #     # #    # #    # #   #  #        #
//  #####   ####   ####  #    # ######   #
//
////////////////////////////////////////////////////////////////////////
// var outsideSetpointSocket = setInterval( () => {
//   await storage.init();
//   try {
//     const datapoint = await storage.getItem("outsideSetpoint");
//     data = datapoint.value;
//     io.emit("outsideSetpoint", data);
//   } catch (e) {
//     console.log(e);
//   }
// }, 1000);

var heatingScheduleSocket = setInterval(() => {
  sendHeatingSchedule();
}, 1 * 1000);

const sendHeatingSchedule = () => {
  try {
    const data = getStore("heatingSchedule");
    const adjustedData = backendToFrontend(data);

    io.emit("Heating Schedule", adjustedData);
  } catch (e) {
    console.log(e);
  }
};

// ---------  Helpers  ----------
const frontendToBackend = (data) => {
  var newData = {};

  for (var key in data) {
    if (data[key].length > 1) {
      var newVals = [];
      for (var index in data[key]) {
        newVals[index] = parseFloat(Math.floor(data[key][index])) + toNodeDecimalConverter(data[key][index]); // used to convert to a string here
      }
      newData[key] = newVals;
    } else newData[key] = data[key];
  }
  return newData;
};

const backendToFrontend = (data) => {
  var newData = {};
  for (var key in data) {
    if (data[key].length > 1) {
      var newVals = [];
      for (var index in data[key]) {
        newVals[index] = parseFloat(Math.floor(data[key][index])) + toReactDecimalConverter(data[key][index]); // used to convert to a string here
      }
      newData[key] = newVals;
    } else newData[key] = data[key];
  }
  return newData;
};

const toNodeDecimalConverter = (val) => {
  switch (val % 1) {
    case 0.25:
      return 0.15;
    case 0.5:
      return 0.3;
    case 0.75:
      return 0.45;
    default:
      return 0.0;
  }
};

const toReactDecimalConverter = (val) => {
  switch (parseFloat((val % 1).toFixed(2))) {
    case 0.15:
      return 0.25;
    case 0.3:
      return 0.5;
    case 0.45:
      return 0.75;
    default:
      return 0.0;
  }
};
