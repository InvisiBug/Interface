// Couldnt figure out how to check the local socket and open an ip socket ip on failure
import openSocket from "socket.io-client";
// import { DEVICES } from "../../Constants";
import {
  localStorageSaver,
  localStorageParser
} from "../../Helpers/localStorageDriver";

const Socket = () => {
  // const socket = openSocket('http://192.168.1.46:5001'); // Deployment
  const socket = openSocket("http://localhost:5001"); // Production

  // const devices = [
  //   { name: "Living Room Heating Sensor" },
  //   { name: "Kitchen Heating Sensor" },
  //   { name: "Liams Room Heating Sensor" },
  //   { name: "Study Heating Sensor" },
  //   { name: "Our Room Heating Sensor" },
  //   { name: "Desk LEDs" },
  //   { name: "Screen LEDs" },
  //   { name: "Table Lamp" },
  //   { name: "Floodlight" },
  //   { name: "Computer Audio" },
  //   { name: "Computer Power" },
  //   { name: "Outside Setpoint" },
  //   { name: "Radiator Fan" }
  // ];

  // devices.map(device => {
  //   socket.on(device.name, deviceData => {
  //     localStorageSaver(device.name, deviceData);
  //   });
  //   return null;
  // });

  const devices = [
    "Living Room Heating Sensor",
    "Kitchen Heating Sensor",
    "Liams Room Heating Sensor",
    "Study Heating Sensor",
    "Our Room Heating Sensor",
    "Desk LEDs",
    "Screen LEDs",
    "Table Lamp",
    "Floodlight",
    "Computer Audio",
    "Computer Power",
    "Outside Setpoint",
    "Radiator Fan",
    "Heating Schedule"
  ];

  devices.map(device => {
    socket.on(device, deviceData => {
      localStorageSaver(device, deviceData);
    });
    return null;
  });

  let logLength = 20;

  var log = [];
  if (localStorageParser("Mqtt")) {
    log = localStorageParser("Mqtt");
  }

  socket.on("MQTT Messages", payload => {
    for (let i = 0; i < logLength; i++) {
      log[i] = log[i + 1];
    }
    log[logLength - 1] = payload;

    localStorageSaver("Mqtt", log);
  });

  return null;
};

export default Socket;
