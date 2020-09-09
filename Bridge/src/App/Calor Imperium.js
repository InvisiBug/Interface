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
const fs = require("fs");
const path = require("path");
const storageDriver = require("../helpers/StorageDriver");

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
  storageDriver.setStore("heatingSchedule", frontendToBackend(req.body.data));
  sendHeatingSchedule();
  res.end(null);
});

// ----------  Boost  ----------
app.get("/api/ci/boost/on", (req, res) => {
  toggleLogic("boost", true);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/boost/off", (req, res) => {
  toggleLogic("boost", false);
  sendHeatingSchedule();
  res.end(null);
});

// -----  Manual  -----
app.get("/api/ci/manual/on", (req, res) => {
  toggleLogic("auto", false);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/manual/off", (req, res) => {
  toggleLogic("auto", true);
  sendHeatingSchedule();
  res.end(null);
});

// ----- On / Off -----
app.get("/api/ci/on", (req, res) => {
  let data = storageDriver.getStore("heatingSchedule");
  if (!data.auto) {
    toggleLogic("isOn", true);
    sendHeatingSchedule();
  }
  res.end(null);
});

app.get("/api/ci/off", (req, res) => {
  let data = storageDriver.getStore("heatingSchedule");
  if (!data.auto) {
    toggleLogic("isOn", false);
    sendHeatingSchedule();
  }
  sendHeatingSchedule();
  res.end(null);
});

const toggleLogic = (point, value) => {
  let data = storageDriver.getStore("heatingSchedule");
  data = {
    ...data,
    [point]: value,
  };
  storageDriver.setStore("heatingSchedule", data);
};

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
    const data = storageDriver.getStore("heatingSchedule");
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
