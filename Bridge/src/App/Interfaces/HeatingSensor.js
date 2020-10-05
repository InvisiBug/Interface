// Express
const express = require("express");
const app = (module.exports = express());

// Persistant Storage
const { getStore, setStore } = require("../../helpers/StorageDriver");

// MQTT
const mqtt = require("mqtt");
const connection = mqtt.connect("mqtt://kavanet.io");

connection.setMaxListeners(15); // Disables event listener warning
connection.subscribe("#", (err) => {
  err ? console.log(err) : null;
});

connection.on("connect", () => null);

const camelRoomName = (roomName) => {
  if (roomName.split(" ").length === 2) {
    return `${roomName.split(" ")[0].toLowerCase()}${roomName.split(" ")[1]}`;
  } else return roomName.toLowerCase();
};

const errorState = {
  isConnected: false,
  temperature: -1,
  humidity: -1,
  pressure: -1,
  // battery: -1,
};

const newSensor = (room, offset) => {
  var timer;
  var deviceData = errorState;

  connection.on("message", (topic, payload) => {
    if (topic == `${room} ${"Heating Sensor"}`) {
      const roomName = camelRoomName(room);
      clearTimeout(timer);

      timer = setTimeout(() => {
        deviceData = errorState;
        let environmentalData = getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          heatingSensors: {
            ...environmentalData.heatingSensors,
            [roomName]: deviceData,
          },
        };
        setStore("Environmental Data", environmentalData);
      }, 10 * 1000);

      if (payload != `${room} ${"Heating Sensor Disconnected"}`) {
        var mqttData = JSON.parse(payload);

        deviceData = {
          ...deviceData,
          isConnected: true,
          // temperature: mqttData.temperature + offset,
          temperature: Math.round((mqttData.temperature + offset) * 100) / 100,
          humidity: mqttData.humidity,
          pressure: mqttData.pressure,
          // battery: mqttData.battery,
        };

        let environmentalData = getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          heatingSensors: {
            ...environmentalData.heatingSensors,
            [roomName]: deviceData,
          },
        };
        setStore("Environmental Data", environmentalData);
      } else {
        console.log(`${room} ${"Heating Sensor Disconnected"}`);
      }
    }
  });

  setInterval(() => {
    let environmentalData;
    // environmentalData = getStore(`/History/${room}`);
    environmentalData = [20, 21];
    // environmentalData = {
    //   ...environmentalData,
    //   heatingSensors: {
    //     ...environmentalData.heatingSensors,
    //     [roomName]: deviceData,
    //   },
    // };

    environmentalData.unshift(deviceData.temperature);

    // environmentalData = environmentalData.unshift(deviceData.temperature);
    // console.log(environmentalData.unshift(deviceData.temperature));

    // environmentalData = deviceData.temperature;
    setStore(`/History/${room}`, environmentalData);
  }, 10 * 1000);

  setInterval(() => {
    sendSocketData();
  }, 1 * 1000);

  const sendSocketData = () => {
    io.emit(`${room} ${"Heating Sensor"}`, deviceData);
  };
};

module.exports = {
  newSensor: newSensor,
};
