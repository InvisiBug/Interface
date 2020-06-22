////////////////////////////////////////////////////////////////////////
//
//  .d88888b.                         8888888b.
//  d88P" "Y88b                        888   Y88b
//  888     888                        888    888
//  888     888 888  888 888d888       888   d88P  .d88b.   .d88b.  88888b.d88b.
//  888     888 888  888 888P"         8888888P"  d88""88b d88""88b 888 "888 "88b
//  888     888 888  888 888           888 T88b   888  888 888  888 888  888  888
//  Y88b. .d88P Y88b 888 888           888  T88b  Y88..88P Y88..88P 888  888  888
//   "Y88888P"   "Y88888 888           888   T88b  "Y88P"   "Y88P"  888  888  888
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

// Schedule
const schedule = require("node-schedule");

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
app.get("/api/heating/sensor/ourRoom/status", (req, res) => {
  res.json(deviceData);
});

app.get("/api/heating/sensor/ourRoom/setpoint/status", (req, res) => {
  res.json(setpoint);
});

app.post("/api/heating/sensor/ourRoom/setpoint/set", (req, res) => {
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
  if (topic == "Our Room Heating Sensor") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      deviceData.isConnected = false;
    }, 10 * 1000);

    if (payload != "Our Room Heating Sensor Disconnected") {
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
      console.log("Our Room Heating Sensor Disconnected  at " + functions.printTime());
    }
  }
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
const sensorUpdate = setInterval(() => {
  sendSocketData();
}, 1 * 1000);

const sendSocketData = () => {
  io.emit("Our Room Heating Sensor", deviceData);
};

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
// var Hourly = new schedule.RecurrenceRule();
// Hourly.minute = 0;

// schedule.scheduleJob(Hourly, () => {
//   if (sensorData) {
//     var data = {
//       temperature: sensorData.temperature,
//       humidity: sensorData.humidity,
//       timestamp: functions.currentTime(),
//     };
//     db.collection("Our Room").insert(data, (err, res) => {
//       if (err) console.log(err);
//     });
//   } else {
//     data = {
//       temperature: null,
//       humidity: null,
//       timestamp: functions.currentTime(),
//     };
//     db.collection("Our Room").insert(data, (err, res) => {
//       if (err) console.log(err);
//     });
//   }
// });

// const bedroomtemperatureController = setInterval(()  =>
// {
//   try
//   {
//     if((sensorData.temperature < setpoint - hysteresis))
//     {
//       client.publish("Our Room Radiator Control", JSON.stringify({"Node": "Our Room temperature Controller", "state": true}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Our Room temperature Controller", "state": true}));
//     }
//
//     if((sensorData.temperature > setpoint + hysteresis))
//     {
//       client.publish("Our Room Radiator Control", JSON.stringify({"Node": "Our Room temperature Controller", "state": false}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Our Room temperature Controller", "state": false}));
//     }
//   }
//
//   catch {}
// }, 5 * 1000);
