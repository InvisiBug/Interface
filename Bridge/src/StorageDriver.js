////////////////////////////////////////////////////////////////////////
//
//  #####                                              ######
// #     # #####  ####  #####    ##    ####  ######    #     # #####  # #    # ###### #####   ####
// #         #   #    # #    #  #  #  #    # #         #     # #    # # #    # #      #    # #
//  #####    #   #    # #    # #    # #      #####     #     # #    # # #    # #####  #    #  ####
//       #   #   #    # #####  ###### #  ### #         #     # #####  # #    # #      #####       #
// #     #   #   #    # #   #  #    # #    # #         #     # #   #  #  #  #  #      #   #  #    #
//  #####    #    ####  #    # #    #  ####  ######    ######  #    # #   ##   ###### #    #  ####
//
////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = (module.exports = express());
// Persistant Storage
const storage = require("node-persist");

const getStore = async (store) => {
  await storage.init();
  try {
    return await storage.getItem(store);
  } catch (e) {
    console.log(e);
  }
};

const setStore = async (store, input) => {
  await storage.init();
  try {
    await storage.setItem(store, input);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getStore: getStore,
  setStore: setStore,
};
