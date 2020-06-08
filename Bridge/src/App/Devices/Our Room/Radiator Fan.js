////////////////////////////////////////////////////////////////////////
//
// ██████╗  █████╗ ██████╗ ██╗ █████╗ ████████╗ ██████╗ ██████╗     ███████╗ █████╗ ███╗   ██╗
// ██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗    ██╔════╝██╔══██╗████╗  ██║
// ██████╔╝███████║██║  ██║██║███████║   ██║   ██║   ██║██████╔╝    █████╗  ███████║██╔██╗ ██║
// ██╔══██╗██╔══██║██║  ██║██║██╔══██║   ██║   ██║   ██║██╔══██╗    ██╔══╝  ██╔══██║██║╚██╗██║
// ██║  ██║██║  ██║██████╔╝██║██║  ██║   ██║   ╚██████╔╝██║  ██║    ██║     ██║  ██║██║ ╚████║
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝
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
const device = "radiatorFan";

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
// var deviceData = null;
var deviceData = {
  automatic: false,
  state: null,
};

// var deviceData;

var timer;

console.log(deviceData);
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
app.get("/api/RadiatorFan/Status", (req, res) => {
  res.json(deviceData);
});

// Automatic / Manual
app.get("/api/RadiatorFanAutomatic/On", (req, res) => {
  console.log("Auto Mode On");
  deviceData.automatic = true;
  sendSocketData();
  res.json(null);
});

app.get("/api/RadiatorFanAutomatic/off", (req, res) => {
  console.log("Auto Mode Off");
  deviceData.automatic = false;
  sendSocketData();
  res.json(null);
});

// On / Off
app.get("/api/RadiatorFan/On", (req, res) => {
  if (!deviceData.automatic) {
    deviceData.state = true;
    client.publish("Radiator Fan Control", "1"); // Toggle power button
  } else {
    console.log("Fan Not In Manual");
  }
  sendSocketData();
  res.json(null);
});

app.get("/api/RadiatorFan/Off", (req, res) => {
  if (!deviceData.automatic) {
    deviceData.state = false;
    client.publish("Radiator Fan Control", "0"); // Toggle power button
  } else {
    console.log("Fan Not In Manual");
  }

  sendSocketData();
  res.json(null);
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
  if (topic == "Radiator Fan") {
    clearTimeout(timer);

    timer = setTimeout(() => {
      deviceData = null;
    }, 10 * 1000);

    if (payload != "Radiator Fan Disconnected") {
      deviceData.state = JSON.parse(payload).state;
    } else {
      deviceData.state = null;
      console.log("Radiator Fan Disconnected");
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

var sendSocketData = () => {
  io.emit("Radiator Fan", deviceData);
};
