// Couldnt figure out how to check the local socket and open an ip socket ip on failure
import openSocket from "socket.io-client";
import { localStorageSaver, localStorageParser } from "../../Helpers/localStorageDriver";

const Socket = () => {
  const socket = openSocket("http://192.168.1.46:5001"); // Deployment
  // const socket = openSocket("http://localhost:5001"); // Production

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
    "New Computer Audio",
    "Computer Power",
    "Outside Setpoint",
    "Radiator Fan",
    "Heating Schedule",
    "Heating",
    "Sun",
    "Environmental Data"
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
