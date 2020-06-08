////////////////////////////////////////////////////////////////////////
//
//  ███████╗████████╗██╗   ██╗██████╗ ██╗   ██╗
//  ██╔════╝╚══██╔══╝██║   ██║██╔══██╗╚██╗ ██╔╝
//  ███████╗   ██║   ██║   ██║██║  ██║ ╚████╔╝
//  ╚════██║   ██║   ██║   ██║██║  ██║  ╚██╔╝
//  ███████║   ██║   ╚██████╔╝██████╔╝   ██║
//  ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝    ╚═╝
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
var study = null;

var setpoint = 22;
var hysteresis = 0.5;

var addHeat = false;

var timer;

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
app.get("/api/heating/sensor/study/status", (req, res) => {
  res.json(study);
});

app.get("/api/heating/sensor/study/setpoint/status", (req, res) => {
  res.json(setpoint);
});

app.post("/api/heating/sensor/study/setpoint/set", (req, res) => {
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
  if (topic == "Study Heating Sensor") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("Clearing Data");
      study = null;
    }, 10 * 1000);

    if (payload != "Study Heating Sensor Disconnected") {
      study = JSON.parse(payload);
    } else {
      study = null;
      console.log("Study Heating Sensor Disconnected  at " + functions.printTime());
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
  io.emit("Study Heating Sensor", study);
  // console.log(study)
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
  var data;
  if (study) {
    data = {
      temperature: study.temperature,
      humidity: study.humidity,
      timestamp: functions.currentTime(),
    };
    db.collection("Study").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  } else {
    data = {
      temperature: null,
      humidity: null,
      timestamp: functions.currentTime(),
    };
    db.collection("Study").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  }
});

// const bedroomTemperatureController = setInterval(()  =>
// {
//   try
//   {
//     if((study.Temperature < setpoint - hysteresis))
//     {
//       client.publish("Study Radiator Control", JSON.stringify({"Node": "Study Temperature Controller", "state": true}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Study Temperature Controller", "state": true}));
//     }
//
//     if((study.Temperature > setpoint + hysteresis))
//     {
//       client.publish("Study Radiator Control", JSON.stringify({"Node": "Study Temperature Controller", "state": false}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Study Temperature Controller", "state": false}));
//     }
//   }
//
//   catch {}
// }, 5 * 1000);
