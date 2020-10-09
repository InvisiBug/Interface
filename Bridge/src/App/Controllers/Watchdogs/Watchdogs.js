const express = require("express");
var app = (module.exports = express());
const { getStore, setStore, updateValue } = require("../../../helpers/StorageDriver");

var latch = false;

console.log("Hello from watchdogs");
