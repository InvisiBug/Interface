////////////////////////////////////////////////////////////////////////
//
// ██╗  ██╗██╗████████╗ ██████╗██╗  ██╗███████╗███╗   ██╗    ██╗  ██╗███████╗ █████╗ ████████╗██╗███╗   ██╗ ██████╗     ███████╗███████╗███╗   ██╗███████╗ ██████╗ ██████╗
// ██║ ██╔╝██║╚══██╔══╝██╔════╝██║  ██║██╔════╝████╗  ██║    ██║  ██║██╔════╝██╔══██╗╚══██╔══╝██║████╗  ██║██╔════╝     ██╔════╝██╔════╝████╗  ██║██╔════╝██╔═══██╗██╔══██╗
// █████╔╝ ██║   ██║   ██║     ███████║█████╗  ██╔██╗ ██║    ███████║█████╗  ███████║   ██║   ██║██╔██╗ ██║██║  ███╗    ███████╗█████╗  ██╔██╗ ██║███████╗██║   ██║██████╔╝
// ██╔═██╗ ██║   ██║   ██║     ██╔══██║██╔══╝  ██║╚██╗██║    ██╔══██║██╔══╝  ██╔══██║   ██║   ██║██║╚██╗██║██║   ██║    ╚════██║██╔══╝  ██║╚██╗██║╚════██║██║   ██║██╔══██╗
// ██║  ██╗██║   ██║   ╚██████╗██║  ██║███████╗██║ ╚████║    ██║  ██║███████╗██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝    ███████║███████╗██║ ╚████║███████║╚██████╔╝██║  ██║
// ╚═╝  ╚═╝╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
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

// Functions
const functions = require("../../Functions.js");

// Database
const path = require("path");
const Engine = require("tingodb")();
const db = new Engine.Db(path.join(__dirname, "../../../Databases/Heating"), {});
// const db     = new Engine.Db(__dirname, {});

// Schedule
const schedule = require("node-schedule");
const RadiatorFan = require("../OurRoom/RadiatorFan.js");

////////////////////////////////////////////////////////////////////////
//
//  #     #
//  #     #   ##   #####  #   ##   #####  #      ######  ####
//  #     #  #  #  #    # #  #  #  #    # #      #      #
//  #     # #    # #    # # #    # #####  #      #####   ####
//   #   #  ###### #####  # ###### #    # #      #           #
//    # #   #    # #   #  # #    # #    # #      #      #    #
//     #    #    # #    # # #    # #####  ###### ######  ####
//
////////////////////////////////////////////////////////////////////////
var deviceData;
var timer;

var setpoint = 22;
var hysteresis = 0.5;

var addHeat = false;

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
app.get("/api/heating/sensor/kitchen/status", (req, res) => {
  res.json(deviceData);
});

app.get("/api/heating/sensor/kitchen/setpoint/status", (req, res) => {
  res.json(deviceData);
});

app.post("/api/heating/sensor/kitchen/setpoint/set", (req, res) => {
  setpoint = req.body.value;
  console.log(setpoint);
  res.end(null);
});

////////////////////////////////////////////////////////////////////////
//
//  #     #  #####  ####### #######    #     #                                              ######
//  ##   ## #     #    #       #       ##   ## ######  ####   ####    ##    ####  ######    #     # ######  ####  ###### # #    # ###### #####
//  # # # # #     #    #       #       # # # # #      #      #       #  #  #    # #         #     # #      #    # #      # #    # #      #    #
//  #  #  # #     #    #       #       #  #  # #####   ####   ####  #    # #      #####     ######  #####  #      #####  # #    # #####  #    #
//  #     # #   # #    #       #       #     # #           #      # ###### #  ### #         #   #   #      #      #      # #    # #      #    #
//  #     # #    #     #       #       #     # #      #    # #    # #    # #    # #         #    #  #      #    # #      #  #  #  #      #    #
//  #     #  #### #    #       #       #     # ######  ####   ####  #    #  ####  ######    #     # ######  ####  ###### #   ##   ###### #####
//
////////////////////////////////////////////////////////////////////////
client.on("message", (topic, payload) => {
  if (topic == "Kitchen Heating Sensor") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      deviceData.isConnected = false;
    }, 10 * 1000);

    if (payload != "Kitchen Heating Sensor Disconnected") {
      var mqttData = JSON.parse(payload);

      deviceData = {
        ...deviceData,
        isConnected: true,
        temperature: mqttData.temperature,
        humidity: mqttData.humidity,
        pressure: mqttData.pressure,
        battery: mqttData.battery,
      };
    } else {
      console.log("Kitchen heating sensor disconnected at " + functions.printTime());
    }
  }
});

// client .message
// {
//   switch(topi)
//   {
//     case: kithcen sensor
//       do kitchen sensor stuff
//     break;

//     case: bedroom sensor
//       do bedroom sensor studd
//       break
//   }

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
const sensorUpdate = setInterval(() => {
  io.emit("Kitchen Heating Sensor", deviceData);
}, 1 * 1000);

////////////////////////////////////////////////////////////////////////
//
//  ######
//  #     #   ##   #####   ##   #####    ##    ####  ######
//  #     #  #  #    #    #  #  #    #  #  #  #      #
//  #     # #    #   #   #    # #####  #    #  ####  #####
//  #     # ######   #   ###### #    # ######      # #
//  #     # #    #   #   #    # #    # #    # #    # #
//  ######  #    #   #   #    # #####  #    #  ####  ######
//
////////////////////////////////////////////////////////////////////////
var Hourly = new schedule.RecurrenceRule();
Hourly.minute = 0;

schedule.scheduleJob(Hourly, () => {
  if (deviceData) {
    var data = {
      temperature: deviceData.temperature,
      humidity: deviceData.humidity,
      timestamp: functions.currentTime(),
    };
    db.collection("Kitchen").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  } else {
    data = {
      temperature: null,
      humidity: null,
      timestamp: functions.currentTime(),
    };
    db.collection("Kitchen").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  }
});

// const bedroomTemperatureController = setInterval(()  =>
// {
//   try
//   {
//     if((kitchen.temperature < setpoint - hysteresis))
//     {
//       client.publish("Kitchen Radiator Control", JSON.stringify({"Node": "Kitchen Temperature Controller", "state": true}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Kitchen Temperature Controller", "state": true}));
//     }
//
//     if((kitchen.temperature > setpoint + hysteresis))
//     {
//       client.publish("Kitchen Radiator Control", JSON.stringify({"Node": "Kitchen Temperature Controller", "state": false}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Kitchen Temperature Controller", "state": false}));
//     }
//   }
//
//   catch {}
// }, 5 * 1000);
