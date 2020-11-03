const express = require("express");
var app = (module.exports = express());
const valveTransitTime = 3 * 60 * 1000;

const openLivingRoomValve = () => {
  console.log("Opening Living Room Valve");
  setTimeout(() => console.log("Living Room Valve Opened"), valveTransitTime);
};

const colseLivingRoomValve = () => {
  console.log("Opening Living Room Valve");
  setTimeout(() => console.log("Living Room Valve Closed"), valveTransitTime);
};

const openKitchenValve = () => {
  console.log("Opening Living Room Valve");
  setTimeout(() => console.log("Kitchen Valve Opened"), valveTransitTime);
};

const openKitchenValve = () => {
  console.log("Opening Living Room Valve");
  setTimeout(() => console.log("Kitchen Valve Opened"), valveTransitTime);
};
