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
  isAutomatic: false,
  isOn: false,
  isConnected: false,
};

// var deviceData;

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
app.get("/api/RadiatorFan/Status", (req, res) => {
  res.json(deviceData);
});

// Automatic / Manual
app.get("/api/RadiatorFanAutomatic/On", (req, res) => {
  console.log("Auto Mode On");
  deviceData.isAutomatic = true;
  sendSocketData();
  res.json(null);
});

app.get("/api/RadiatorFanAutomatic/off", (req, res) => {
  console.log("Auto Mode Off");
  deviceData.isAutomatic = false;
  sendSocketData();
  res.json(null);
});

// On / Off
app.get("/api/RadiatorFan/On", (req, res) => {
  if (!deviceData.isAutomatic) {
    deviceData.isOn = true;
    client.publish("Radiator Fan Control", "1"); // Toggle power button
  } else {
    console.log("Fan Not In Manual");
  }
  sendSocketData();
  res.json(null);
});

app.get("/api/RadiatorFan/Off", (req, res) => {
  if (!deviceData.isAutomatic) {
    deviceData.isOn = false;
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
      deviceData.isConnected = false;
    }, 10 * 1000);

    if (payload != "Radiator Fan Disconnected") {
      deviceData = {
        ...deviceData,
        isConnected: true,
        isOn: JSON.parse(payload).state,
      };
    } else {
      console.log("Radiator Fan Disconnected");
    }
  } else if (topic == "Radiator Fan Button") {
    if (!deviceData.isAutomatic) {
      switch (deviceData.isOn) {
        case true:
          deviceData = {
            ...deviceData,
            isOn: false,
          };
          client.publish("Radiator Fan Control", "0");
          break;

        case false:
          deviceData = {
            ...deviceData,
            isOn: true,
          };
          client.publish("Radiator Fan Control", "1");
          break;
      }
      sendSocketData();
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
  io.emit("Radiator Fan", deviceData);
};
