const express = require("express");
var app = (module.exports = express());
const { getStore, setStore, toggleLogic } = require("../../../helpers/StorageDriver");

var latch = false;

console.log("Hello from watchdogs");
