// Express
const express = require("express");
const app = (module.exports = express());

// Persistant Storage
const store = require("../../helpers/StorageDriver");

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

const newSensor = (room, saveToStorage) => {
  var deviceData = {
    isConnected: false,
    temperature: -1,
    humidity: -1,
    pressure: -1,
    battery: -1,
  };

  timer = setTimeout(() => {
    deviceData = {
      ...deviceData,
      isConnected: false,
    };
  }, 10 * 1000);

  connection.on("message", (topic, payload) => {
    if (topic == `${room} ${"Heating Sensor"}`) {
      const roomName = camelRoomName(room);
      clearTimeout(timer);

      timer = setTimeout(() => {
        deviceData.isConnected = false;
        let environmentalData = store.getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          heatingSensors: {
            ...environmentalData.heatingSensors,
            [roomName]: deviceData,
          },
        };
        store.setStore("Environmental Data", environmentalData);
      }, 10 * 1000);

      if (payload != `${room} ${"Heating Sensor Disconnected"}`) {
        var mqttData = JSON.parse(payload);

        deviceData = {
          ...deviceData,
          isConnected: true,
          temperature: mqttData.temperature,
          humidity: mqttData.humidity,
          pressure: mqttData.pressure,
          battery: mqttData.battery,
        };

        let environmentalData = store.getStore("Environmental Data");
        environmentalData = {
          ...environmentalData,
          heatingSensors: {
            ...environmentalData.heatingSensors,
            [roomName]: deviceData,
          },
        };
        store.setStore("Environmental Data", environmentalData);
      } else {
        console.log(`${room} ${"Heating Sensor Disconnected"}`);
      }
    }
  });

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
