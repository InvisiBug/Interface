// Couldnt figure out how to check the local socket and open an ip socket ip on failure
import openSocket from "socket.io-client";
// import { DEVICES } from "../../Constants";
import { localStorageSaver } from "../../Helpers/localStorageDriver";

const Socket = () => {
  // const socket = openSocket('http://192.168.1.46:5001'); // Deployment
  const socket = openSocket("http://localhost:5001"); // Production

  const devices = [
    { name: "Living Room Heating Sensor" },
    { name: "Kitchen Heating Sensor" },
    { name: "Liams Room Heating Sensor" },
    { name: "Study Heating Sensor" },
    { name: "Our Room Heating Sensor" },
    { name: "Desk LEDs" },
    { name: "Screen LEDs" },
    { name: "Table Lamp" },
    { name: "Floodlight" },
    { name: "Computer Audio" },
    { name: "Computer Power" },
    { name: "Outside Setpoint" },
    { name: "Radiator Fan" }
  ];

  devices.map(device => {
    socket.on(device.name, deviceData => {
      localStorageSaver(device.name, deviceData);
    });
    return null;
  });

  return null;
};

export default Socket;
