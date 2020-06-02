// Couldnt figure out how to check the local socket and open an ip socket ipon failure
// Components
import React from "react";
import openSocket from "socket.io-client";

class Socket extends React.Component {
  componentDidMount = () => {
    // const socket = openSocket('http://192.168.1.46:5001'); // Deployment
    const socket = openSocket("http://localhost:5001"); // Production,  Couldn't come figure out how to

    // Living Room
    socket.on("Living Room Heating Sensor", data => {
      if (data == null) localStorage.setItem("Living Room Heating Sensor", null);
      else localStorage.setItem("Living Room Heating Sensor", JSON.stringify(data));
    });

    // Kitchen
    socket.on("Kitchen Heating Sensor", data => {
      if (data == null) localStorage.setItem("Kitchen Heating Sensor", null);
      else localStorage.setItem("Kitchen Heating Sensor", JSON.stringify(data));
    });

    // Liams Room
    socket.on("Liams Room Heating Sensor", data => {
      if (data == null) localStorage.setItem("Liams Room Heating Sensor", null);
      else localStorage.setItem("Liams Room Heating Sensor", JSON.stringify(data));
    });

    // Study
    socket.on("Study Heating Sensor", data => {
      if (data == null) localStorage.setItem("Study Heating Sensor", null);
      else localStorage.setItem("Study Heating Sensor", JSON.stringify(data));
    });

    // Our Room
    socket.on("Our Room Heating Sensor", data => {
      if (data == null) localStorage.setItem("Our Room Heating Sensor", null);
      else localStorage.setItem("Our Room Heating Sensor", JSON.stringify(data));
    });

    socket.on("Desk LEDs", data => {
      if (data == null) localStorage.setItem("Desk LEDs", null);
      else localStorage.setItem("Desk LEDs", JSON.stringify(data));
    });

    socket.on("Screen LEDs", data => {
      if (data == null) localStorage.setItem("Screen LEDs", null);
      else localStorage.setItem("Screen LEDs", JSON.stringify(data));
    });

    socket.on("Table Lamp", data => {
      if (data == null) localStorage.setItem("Table Lamp", null);
      else localStorage.setItem("Table Lamp", JSON.stringify(data));
    });

    socket.on("Plug", data => {
      if (data == null) localStorage.setItem("Plug", null);
      else localStorage.setItem("Plug", JSON.stringify(data));
    });

    socket.on("Computer Audio", data => {
      if (data == null) localStorage.setItem("Computer Audio", null);
      else localStorage.setItem("Computer Audio", JSON.stringify(data));
    });

    socket.on("Computer Power", data => {
      if (data == null) localStorage.setItem("Computer Power", null);
      else localStorage.setItem("Computer Power", JSON.stringify(data));
    });

    socket.on("outsideSetpoint", data => {
      if (data == null) localStorage.setItem("Outside Setpoint", null);
      else localStorage.setItem("Outside Setpoint", JSON.stringify(data));
    });

    socket.on("Radiator Fan", data => {
      if (data == null) localStorage.setItem("Radiator Fan", null);
      else localStorage.setItem("Radiator Fan", JSON.stringify(data));
    });

    // Heating
    socket.on("Heating", data => {
      if (data == null) localStorage.setItem("Heating Schedule", null);
      else localStorage.setItem("Heating Schedule", JSON.stringify(data));
    });
  };

  ////////////////////////
  render() {
    return null;
  }
}

export default Socket;
