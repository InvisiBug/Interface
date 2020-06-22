// Couldnt figure out how to check the local socket and open an ip socket ip on failure
// Components
import React from "react";
import openSocket from "socket.io-client";
// import { DEVICES } from "../../Constants";
import { localStorageSaver } from "../../Helpers/localStorageDriver";

class Socket extends React.Component {
  componentDidMount = () => {
    // const socket = openSocket('http://192.168.1.46:5001'); // Deployment
    const socket = openSocket("http://localhost:5001"); // Production,  Couldn't come figure out how to

    // socket.on(DEVICES.kitchen.Lights, deviceData => {
    //   if (deviceData == null) localStorage.setItem(DEVICES.kitchenHeatingSensor, null);
    //   else localStorage.setItem(DEVICES.kitchenHeatingSensor, JSON.stringify(deviceData));
    // });

    // Living Room
    socket.on("Living Room Heating Sensor", deviceData => {
      localStorageSaver("Living Room Heating Sensor", deviceData);
    });

    // Kitchen
    socket.on("Kitchen Heating Sensor", deviceData => {
      localStorageSaver("Kitchen Heating Sensor", deviceData);
    });

    // Liams Room
    socket.on("Liams Room Heating Sensor", deviceData => {
      localStorageSaver("Liams Room Heating Sensor", deviceData);
    });

    // Study
    socket.on("Study Heating Sensor", deviceData => {
      localStorageSaver("Study Heating Sensor", deviceData);
    });

    // Our Room
    socket.on("Our Room Heating Sensor", deviceData => {
      localStorageSaver("Our Room Heating Sensor", deviceData);
    });

    socket.on("Desk LEDs", deviceData => {
      if (deviceData == null) localStorage.setItem("Desk LEDs", null);
      else localStorage.setItem("Desk LEDs", JSON.stringify(deviceData));
    });

    socket.on("Screen LEDs", deviceData => {
      if (deviceData == null) localStorage.setItem("Screen LEDs", null);
      else localStorage.setItem("Screen LEDs", JSON.stringify(deviceData));
    });

    socket.on("Table Lamp", deviceData => {
      if (deviceData == null) localStorage.setItem("Table Lamp", null);
      else localStorage.setItem("Table Lamp", JSON.stringify(deviceData));
    });

    socket.on("Floodlight", deviceData => {
      if (deviceData == null) localStorage.setItem("Floodlight", null);
      else localStorage.setItem("Floodlight", JSON.stringify(deviceData));
    });

    socket.on("Computer Audio", deviceData => {
      if (deviceData == null) localStorage.setItem("Computer Audio", null);
      else localStorage.setItem("Computer Audio", JSON.stringify(deviceData));
    });

    socket.on("Computer Power", deviceData => {
      if (deviceData == null) localStorage.setItem("Computer Power", null);
      else localStorage.setItem("Computer Power", JSON.stringify(deviceData));
    });

    socket.on("outsideSetpoint", deviceData => {
      if (deviceData == null) localStorage.setItem("Outside Setpoint", null);
      else localStorage.setItem("Outside Setpoint", JSON.stringify(deviceData));
    });

    socket.on("Radiator Fan", deviceData => {
      if (deviceData == null) localStorage.setItem("Radiator Fan", null);
      else localStorage.setItem("Radiator Fan", JSON.stringify(deviceData));
    });

    // Heating
    // socket.on("Heating", data => {
    //   if (data == null) localStorage.setItem("Heating Schedule", null);
    //   else localStorage.setItem("Heating Schedule", JSON.stringify(data));
    // });

    // Heating
    socket.on("heatingSchedule", deviceData => {
      if (deviceData == null) localStorage.setItem("Heating Schedule", null);
      else localStorage.setItem("Heating Schedule", JSON.stringify(deviceData));
    });
  };

  ////////////////////////
  render() {
    return null;
  }
}

export default Socket;
