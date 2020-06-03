////////////////////////////////////////////////////////////////////////
//
// ███████╗██╗      ██████╗  ██████╗ ██████╗ ██╗     ██╗ ██████╗ ██╗  ██╗████████╗
// ██╔════╝██║     ██╔═══██╗██╔═══██╗██╔══██╗██║     ██║██╔════╝ ██║  ██║╚══██╔══╝
// █████╗  ██║     ██║   ██║██║   ██║██║  ██║██║     ██║██║  ███╗███████║   ██║
// ██╔══╝  ██║     ██║   ██║██║   ██║██║  ██║██║     ██║██║   ██║██╔══██║   ██║
// ██║     ███████╗╚██████╔╝╚██████╔╝██████╔╝███████╗██║╚██████╔╝██║  ██║   ██║
// ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
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
var deviceData = null;

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
app.get("/api/Plug/Toggle", (req, res) => {
  client.publish("Plug Control", "T");
  deviceData.state = !deviceData.state;
  sendSocketData();
  res.json(null);
});

app.get("/api/Plug/On", (req, res) => {
  client.publish("Plug Control", "1");
  deviceData.state = true;
  sendSocketData();
  res.json(null);
});

app.get("/api/Plug/Off", (req, res) => {
  client.publish("Plug Control", "0");
  deviceData.state = false;
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
  if (topic == "Plug") {
    if (payload != "Plug Disconnected") {
      deviceData = JSON.parse(payload);
    } else {
      deviceData = null;
      console.log("Plug Disconnected");
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
  io.emit("Plug", deviceData);
};
