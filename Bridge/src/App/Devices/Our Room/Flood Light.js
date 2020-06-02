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
var plug = null;

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
  plug.state = !plug.state;
  res.json(plug);
});

app.get("/api/Plug/On", (req, res) => {
  client.publish("Plug Control", "1");
  plug.state = true;
  res.json(plug);
});

app.get("/api/Plug/Off", (req, res) => {
  client.publish("Plug Control", "0");
  plug.state = false;
  res.json(plug);
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
      plug = JSON.parse(payload);
    } else {
      plug = null;
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
  io.emit("Plug", plug);
}, 1 * 1000);
