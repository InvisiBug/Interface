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
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
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
var server = require("http").createServer(app);
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

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to " + "All");
});

client.on("connect", () => null);
// client.on('message', (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload )));

////////////////////////////////////////////////////////////////////////
//
//  #     #
//  ##   ##  ####  #####  #    # #      ######  ####
//  # # # # #    # #    # #    # #      #      #
//  #  #  # #    # #    # #    # #      #####   ####
//  #     # #    # #    # #    # #      #           #
//  #     # #    # #    # #    # #      #      #    #
//  #     #  ####  #####   ####  ###### #####1#  ####
//
////////////////////////////////////////////////////////////////////////
// const heating        = require('./App/Devices/Heating.js');
// General
app.use(require("./App/Weather.js"));

// Living Room
app.use(require("./App/Devices/Living Room/HeatingSensor.js"));

// Kitchen
app.use(require("./App/Devices/Kitchen/HeatingSensor.js"));
app.use(require("./App/Devices/Kitchen/Heating Controller.js"));

// Liam's Room
app.use(require("./App/Devices/Liams Room/HeatingSensor.js"));

// Study
app.use(require("./App/Devices/Study/HeatingSensor.js"));

// Our Roomrs
app.use(require("./App/Devices/OurRoom/Desk LEDs"));
app.use(require("./App/Devices/OurRoom/Screen LEDs"));
app.use(require("./App/Devices/OurRoom/Flood Light"));
app.use(require("./App/Devices/OurRoom/Table Lamp"));
app.use(require("./App/Devices/OurRoom/Flood Light.js"));
app.use(require("./App/Devices/OurRoom/Computer Audio.js"));
app.use(require("./App/Devices/OurRoom/Computer Power.js"));
// app.use(require('./App/Devices/Our Room/Blanket.js'));
app.use(require("./App/Devices/OurRoom/HeatingSensor.js"));
app.use(require("./App/Devices/OurRoom/RadiatorFan.js"));

// Historical
app.use(require("./App/Historical.js"));

// Calor Imperium
app.use(require("./App/Calor Imperium.js"));

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
["log", "warn", "error"].forEach((methodName) => {
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

app.get("/api/test", (req, res) => {
  res.json(forecastWeatherData);
});

var ourRoomSchedule = {
  monday: [6, 8, 18, 23],
  tuesday: [6, 8, 18, 23],
  wednesday: [6, 8, 18, 23],
  thursday: [6, 8, 18, 23],
  friday: [6, 8, 18, 23],
  saturday: [10, 15, 16, 24],
  sunday: [10, 15, 18.07, 24],
  enable: true,
  boost: false,
  heatingOn: true,
};

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
