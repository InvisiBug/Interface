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
const app = (module.exports = express());

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
// app.post("/api/calorImperium/outside/set", async (req, res) => {
//   console.log(req.body);
//   await storage.init();
//   await storage.setItem("outsideSetpoint", req.body);

//   res.end(null);
// });

// app.get("/api/calorImperium/outside/get", async () => {
//   await storage.init();

//   try {
//     x = await storage.getItem("outsideSetpoint");
//     data = x.value;

//     res.json(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

app.post("/api/ci/schedule/update", async (req, res) => {
  console.log(req.body);

  data = req.body.vals;

  let dataToSend = {};

  for (var key in data) {
    dataToSend[key] = frontendToBackend(data[key]);
  }

  console.log(JSON.stringify(dataToSend));

  // await storage.init();
  // await storage.setItem("heatingSchedule", req.body);

  res.end(null);
});

// ----------  Boost  ----------
app.get("/api/ci/boost/on", async (req, res) => {
  let data = await getStore("heatingSchedule");
  data = {
    ...data,
    vals: { ...data.vals, boost: true },
  };
  await setStore("heatingSchedule", data);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/boost/off", async (req, res) => {
  let data = await getStore("heatingSchedule");
  data = {
    ...data,
    vals: { ...data.vals, boost: false },
  };
  await setStore("heatingSchedule", data);
  sendHeatingSchedule();
  res.end(null);
});

// -----  Manual  -----
app.get("/api/ci/manual/on", async (req, res) => {
  let data = await getStore("heatingSchedule");
  data = {
    ...data,
    vals: { ...data.vals, auto: false },
  };
  await setStore("heatingSchedule", data);
  sendHeatingSchedule();
  res.end(null);
});

app.get("/api/ci/manual/off", async (req, res) => {
  let data = await getStore("heatingSchedule");
  data = {
    ...data,
    vals: { ...data.vals, auto: true },
  };
  await setStore("heatingSchedule", data);
  sendHeatingSchedule();
  res.end(null);
});

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
setStore = async (store, data) => {
  await storage.init();
  try {
    await storage.setItem(store, data);
  } catch (e) {
    console.log(e);
  }
};

getStore = async (store) => {
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
    let datapoint = await storage.getItem("outsideSetpoint");
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
    io.emit("Heating Schedule", data.vals);
  } catch (e) {
    console.log(e);
  }
};

// ---------  Helpers  ----------
var frontendToBackend = (tempValues) => {
  try {
    var adjustedValues = [];

    for (var index of tempValues.keys()) {
      var last = [];

      tempValues[index] % 1 === 0.25
        ? (last[index] = "15")
        : tempValues[index] % 1 === 0.5
        ? (last[index] = "30")
        : tempValues[index] % 1 === 0.75
        ? (last[index] = "45")
        : tempValues[index] % 1 === 0.0
        ? (last[index] = "00")
        : null;

      var value = parseFloat(Math.floor(tempValues[index]) + "." + last[index]);

      adjustedValues[index] = value;
    }
    return adjustedValues;
  } catch (error) {
    // enable, boost and heatingOn are handled here
    // console.log(error)
    return tempValues;
  }
};

var backendToFrontend = (values) => {
  try {
    let newValues = [];
    let finalVals = [];

    var first = [];
    var last = [];

    for (let index of values.keys()) {
      // newValues[index] = values[index].toString().padStart(4, '0');

      newValues[index] = (Math.round(values[index] * 100) / 100).toFixed(2);
      newValues[index] = newValues[index].toString().padStart(5, "0");

      first[index] = newValues[index].substring(0, 2);
      last[index] = newValues[index].substring(2, 4);

      newValues[index].substring(3, 5) == "15"
        ? (last[index] = "25")
        : newValues[index].substring(3, 5) == "30"
        ? (last[index] = "50")
        : newValues[index].substring(3, 5) == "45"
        ? (last[index] = "75")
        : null;

      finalVals[index] = parseFloat(first[index] + "." + last[index]);
    }
    return finalVals;
  } catch (error) {
    // enable, boost and heatingOn are handled here
    // console.log(error)
    return values;
  }
};
