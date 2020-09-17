// Make this collect all sensor data and package it up nicely so by average floor, average overall etc
// Handle internal and external temperature.
// maybe connect to external api here and save all together
const express = require("express");
const app = (module.exports = express());
const storage = require("../../helpers/StorageDriver");

// const livingRoom = storage.getStore("Living Room Heating Sensor");
// const kitchen = storage.getStore("Kitchen Heating Sensor");
// const study = storage.getStore("Study Heating Sensor");
// const liamsRoom = storage.getStore("Liams Room Heating Sensor");
// const ourRoom = storage.getStore("Our Room Heating Sensor");

const housedata = {};
