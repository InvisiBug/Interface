// Make this collect all sensor data and package it up nicely so by average floor, average overall etc
// Handle internal and external temperature.
// maybe connect to external api here and save all together
const express = require("express");
const app = (module.exports = express());
const { getStore, setStore } = require("../../helpers/StorageDriver");

let environmentalData = getStore("Environmental Data");
let temperatures = {};

setInterval(() => {
  environmentalData = getStore("Environmental Data");
  temperatures = {
    livingRoom: environmentalData.heatingSensors.livingRoom.temperature,
    kitchen: environmentalData.heatingSensors.kitchen.temperature,
    liamsRoom: environmentalData.heatingSensors.liamsRoom.temperature,
    study: environmentalData.heatingSensors.study.temperature,
    ourRoom: environmentalData.heatingSensors.ourRoom.temperature,
    // ourRoom: 18,
  };
}, 1 * 1000);

const totalAverage = (temps) => {
  let totalActive = 0;
  let temperatureSum = 0;
  let houseAverage = 0;

  for (let key in temps) {
    if (temps[key] > 0) {
      temperatureSum = temperatureSum + temps[key];
      totalActive++;
    }
  }

  houseAverage = temperatureSum / totalActive;
  return Math.round(houseAverage * 10) / 10;
};

setInterval(() => {
  console.log(totalAverage(temperatures));
}, 1 * 1000);

setInterval(() => {
  const houseData = {
    ...environmentalData,
    houseStats: {
      totalAverage: totalAverage(temperatures),
    },
  };
  setStore("Environmental Data", houseData);
}, 1 * 1000);
