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

// Functions
const functions = require("../../Functions.js");

// Database
const path = require("path");
const Engine = require("tingodb")();
const db = new Engine.Db(path.join(__dirname, "../../../Databases/Heating"), {});
// const db     = new Engine.Db(__dirname, {});

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
var liamsRoom = null;

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
app.get("/api/heating/sensor/liamsRoom/status", (req, res) => {
  res.json(liamsRoom);
});

app.get("/api/heating/sensor/liamsRoom/setpoint/status", (req, res) => {
  res.json(setpoint);
});

app.post("/api/heating/sensor/liamsRoom/setpoint/set", (req, res) => {
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
  if (topic == "Liams Room Heating Sensor") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      liamsRoom = null;
    }, 10 * 1000);

    if (payload != "Liams Room Heating Sensor Disconnected") {
      liamsRoom = JSON.parse(payload);
    } else {
      liamsRoom = null;
      console.log("Liams Room Heating Sensor Disconnected");
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
  io.emit("Liams Room Heating Sensor", liamsRoom);
}, 1 * 1000);

////////////////////////////////////////////////////////////////////////
//
//   #####
//  #     #  ####  #    # ###### #####  #    # #      ######
//  #       #    # #    # #      #    # #    # #      #
//   #####  #      ###### #####  #    # #    # #      #####
//        # #      #    # #      #    # #    # #      #
//  #     # #    # #    # #      #    # #    # #      #
//   #####   ####  #    # ###### #####   ####  ###### ######
//
////////////////////////////////////////////////////////////////////////
var Hourly = new schedule.RecurrenceRule();
Hourly.minute = 0;

schedule.scheduleJob(Hourly, () => {
  if (liamsRoom) {
    var data = {
      temperature: liamsRoom.temperature,
      humidity: liamsRoom.humidity,
      timestamp: functions.currentTime(),
    };
    db.collection("Liams Room").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  } else {
    var data = {
      temperature: null,
      humidity: null,
      timestamp: functions.currentTime(),
    };
    db.collection("Liams Room").insert(data, (err, res) => {
      if (err) console.log(err);
    });
  }
});

// const bedroomTemperatureController = setInterval(()  =>
// {
//   try
//   {
//     if((liamsRoom.Temperature < setpoint - hysteresis))
//     {
//       client.publish("Liams Room Radiator Control", JSON.stringify({"Node": "Liams Room Temperature Controller", "state": true}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Liams Room Temperature Controller", "state": true}));
//     }
//
//     if((liamsRoom.Temperature > setpoint + hysteresis))
//     {
//       client.publish("Liams Room Radiator Control", JSON.stringify({"Node": "Liams Room Temperature Controller", "state": false}));
//       client.publish("Heating Request Control",   JSON.stringify({"Node": "Liams Room Temperature Controller", "state": false}));
//     }
//   }
//
//   catch {}
// }, 5 * 1000);
