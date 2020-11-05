////////////////////////////////////////////////////////////////////////
//
//  ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
//  ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
//  ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
//  ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
//  ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
//  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
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
const express = require("express");
const bodyParser = require("body-parser");
const app = (module.exports = express());
const chalk = require("chalk");

app.use(bodyParser.json()); // Used to handle data in post requests
process.stdout.write("\033c"); // Clear the console

////////////////////////////////////////////////////////////////////////
//
//  ######
//  #     #  ####  #####  #####  ####
//  #     # #    # #    #   #   #
//  ######  #    # #    #   #    ####
//  #       #    # #####    #        #
//  #       #    # #   #    #   #    #
//  #        ####  #    #   #    ####
//
////////////////////////////////////////////////////////////////////////
const fetchPort = process.env.PORT || 5000;
const socketPort = process.env.PORT || 5001;

////////////////////////////////////////////////////////////////////////
//
//   #####
//  #     #  ####   ####  #    # ###### #####
//  #       #    # #    # #   #  #        #
//   #####  #    # #      ####   #####    #
//        # #    # #      #  #   #        #
//  #     # #    # #    # #   #  #        #
//   #####   ####   ####  #    # ######   #
//
////////////////////////////////////////////////////////////////////////
let server = require("http").createServer(app);
global.io = require("socket.io")(server);

////////////////////////////////////////////////////////////////////////
//
//  #     #  #####  ####### #######
//  ##   ## #     #    #       #
//  # # # # #     #    #       #
//  #  #  # #     #    #       #
//  #     # #   # #    #       #
//  #     # #    #     #       #
//  #     #  #### #    #       #
//
////////////////////////////////////////////////////////////////////////
const mqtt = require("mqtt");
// global.client = mqtt.connect("mqtt://192.168.1.46");
global.client = mqtt.connect("mqtt://kavanet.io");
client.setMaxListeners(16); // Disables event listener warning

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

// client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));
client.on("message", (topic, payload) => {
  try {
    io.emit("MQTT Messages", JSON.parse(payload));
  } catch {}
});

////////////////////////////////////////////////////////////////////////
//
//  #     #
//  ##   ##  ####  #####  #    # #      ######  ####
//  # # # # #    # #    # #    # #      #      #
//  #  #  # #    # #    # #    # #      #####   ####
//  #     # #    # #    # #    # #      #           #
//  #     # #    # #    # #    # #      #      #    #
//  #     #  ####  #####   ####  ###### ######  ####
//
////////////////////////////////////////////////////////////////////////
// const heating        = require('./App/Devices/Heating.js');
// General
app.use(require("./App/Weather.js"));

// Our Room
app.use(require("./App/Devices/OurRoom/Desk LEDs"));
app.use(require("./App/Devices/OurRoom/Screen LEDs"));
app.use(require("./App/Devices/OurRoom/FloodLight"));
app.use(require("./App/Devices/OurRoom/Table Lamp"));
app.use(require("./App/Devices/OurRoom/FloodLight.js"));
app.use(require("./App/Devices/OurRoom/Sun.js"));
app.use(require("./App/Devices/OurRoom/Computer Audio.js"));
app.use(require("./App/Devices/OurRoom/Computer Power.js"));
// app.use(require('./App/Devices/Our Room/Blanket.js'));
app.use(require("./App/Devices/OurRoom/RadiatorFan.js"));

// Historical
app.use(require("./App/Historical.js"));

// Calor Imperium
app.use(require("./App/Controllers/HeatingController.js"));
app.use(require("./App/Calor Imperium.js"));
app.use(require("./App/Interfaces/Heating.js"));
app.use(require("./App/Services/HouseClimateStats"));
app.use(require("./App/Controllers/Watchdogs/Watchdogs"));

app.use(require("./App/Controllers/OurRoomHeatingController"));

////////////////////////////////////////////////////////////////////////
//
// #     #                                         #####
// #     # ######   ##   ##### # #    #  ####     #     # ###### #    #  ####   ####  #####
// #     # #       #  #    #   # ##   # #    #    #       #      ##   # #      #    # #    #
// ####### #####  #    #   #   # # #  # #          #####  #####  # #  #  ####  #    # #    #
// #     # #      ######   #   # #  # # #  ###          # #      #  # #      # #    # #####
// #     # #      #    #   #   # #   ## #    #    #     # #      #   ## #    # #    # #   #
// #     # ###### #    #   #   # #    #  ####      #####  ###### #    #  ####   ####  #    #
//
////////////////////////////////////////////////////////////////////////
const heatingSensor = require("./App/Interfaces/HeatingSensor");

const sensors = [
  {
    name: "Our Room",
    offset: 1.6,
  },
  {
    name: "Study",
    offset: -5,
  },
  {
    name: "Living Room",
    offset: -0.3,
  },
  {
    name: "Kitchen",
    offset: -1.2,
  },
  {
    name: "Liams Room",
    offset: -0.4,
  },
];

sensors.map((room, index) => {
  heatingSensor.newSensor(room.name, room.offset);
});

const radiatorValve = require("./App/Interfaces/RadiatorValve");

// radiatorValve.newValve("Our Room");

[
  ////////////////////////////////////////////////////////////////////////
  //
  //   #####
  //  #     #  ####  #    #  ####   ####  #      ######
  //  #       #    # ##   # #      #    # #      #
  //  #       #    # # #  #  ####  #    # #      #####
  //  #       #    # #  # #      # #    # #      #
  //  #     # #    # #   ## #    # #    # #      #
  //   #####   ####  #    #  ####   ####  ###### ######
  //
  ////////////////////////////////////////////////////////////////////////
  //This adds the the line printed information to all console.logs
  ("log", "warn", "error"),
].forEach((methodName) => {
  const originalMethod = console[methodName];
  console[methodName] = (...args) => {
    try {
      throw new Error();
    } catch (error) {
      originalMethod.apply(console, [
        ...args,
        chalk.yellow(
          "\t",
          error.stack // Grabs the stack trace
            .split("\n")[2] // Grabs third line
            .trim(3) // Removes spaces
            .replace(__dirname, "") // Removes script folder path
            .replace(/\s\(./, " ") // Removes first parentheses and replaces it with " at "
            .replace(/\)/, "") // Removes last parentheses
            .split(" ")
            .pop()
        ),
      ]);
    }
  };
});

////////////////////////////////////////////////////////////////////////
//
//  #
//  #       #  ####  ##### ###### #    #  ####
//  #       # #        #   #      ##   # #
//  #       #  ####    #   #####  # #  #  ####
//  #       #      #   #   #      #  # #      #
//  #       # #    #   #   #      #   ## #    #
//  ####### #  ####    #   ###### #    #  ####
//
////////////////////////////////////////////////////////////////////////
// Start the app
app.listen(fetchPort, console.log("App is listening on port " + fetchPort));
io.listen(socketPort, console.log("Socket is open on port " + socketPort));
