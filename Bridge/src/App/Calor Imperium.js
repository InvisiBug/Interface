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

// Persistant Storage
const storage = require("node-persist");

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
// app.post("/api/ci/outside/set", async (req, res) => {
//   console.log(req.body);
//   await storage.init();
//   await storage.setItem("outsideSetpoint", req.body);

//   res.end(null);
// });

// app.get("/api/ci/outside/get", async () => {
//   await storage.init();

//   try {
//     x = await storage.getItem("outsideSetpoint");
//     data = x.value;

//     res.json(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

// ----------  Boost  ----------
app.get("/api/ci/boost/on", async (req, res) => {
  await toggleLogic("boost", true);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/boost/off", async (req, res) => {
  await toggleLogic("boost", false);
  sendHeatingSchedule();
  res.end(null);
});

// -----  Manual  -----
app.get("/api/ci/manual/on", async (req, res) => {
  await toggleLogic("auto", false);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/manual/off", async (req, res) => {
  await toggleLogic("auto", true);
  sendHeatingSchedule();
  res.end(null);
});

// ----- On / Off -----
app.get("/api/ci/on", async (req, res) => {
  let data = await getStore("heatingSchedule");
  if (!data.auto) {
    await toggleLogic("isOn", true);
    sendHeatingSchedule();
  }
  res.end(null);
});

app.get("/api/ci/off", async (req, res) => {
  let data = await getStore("heatingSchedule");
  if (!data.auto) {
    await toggleLogic("isOn", false);
    sendHeatingSchedule();
  }
  sendHeatingSchedule();
  res.end(null);
});

const toggleLogic = async (point, value) => {
  let data = await getStore("heatingSchedule");
  data = {
    ...data,
    [point]: value,
  };
  await setStore("heatingSchedule", data);
};

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
const setStore = async (store, data) => {
  await storage.init();
  try {
    await storage.setItem(store, data);
  } catch (e) {
    console.log(e);
  }
};

const getStore = async (store) => {
  await storage.init();
  try {
    return await storage.getItem(store);
  } catch (e) {
    console.log(e);
  }
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
var outsideSetpointSocket = setInterval(async () => {
  await storage.init();
  try {
    const datapoint = await storage.getItem("outsideSetpoint");
    data = datapoint.value;
    io.emit("outsideSetpoint", data);
  } catch (e) {
    console.log(e);
  }
}, 1000);

var heatingScheduleSocket = setInterval(async () => {
  sendHeatingSchedule();
}, 1 * 1000);

const sendHeatingSchedule = async () => {
  try {
    const data = await getStore("heatingSchedule");
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
