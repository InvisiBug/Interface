////////////////////////////////////////////////////////////////////////
//
//  ██████╗ ███████╗██████╗ ██████╗  ██████╗  ██████╗ ███╗   ███╗     ██████╗██╗     ██╗███╗   ███╗ █████╗ ████████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║    ██╔════╝██║     ██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝
//  ██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║██║   ██║██╔████╔██║    ██║     ██║     ██║██╔████╔██║███████║   ██║   █████╗
//  ██╔══██╗██╔══╝  ██║  ██║██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║    ██║     ██║     ██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝
//  ██████╔╝███████╗██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║    ╚██████╗███████╗██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗
//  ╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚═════╝╚══════╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
//
////////////////////////////////////////////////////////////////////////
//
//   #####
//  #     #  ####  #    # ###### #  ####
//  #       #    # ##   # #      # #    #
//  #       #    # # #  # #####  # #
//  #       #    # #  # # #      # #  ###
//  #     # #    # #   ## #      # #    #
//   #####   ####  #    # #      #  ####
//
////////////////////////////////////////////////////////////////////////
// Express
const express = require("express");
const app = (module.exports = express());

// Persistan Storage
const storage = require("node-persist");

////////////////////////////////////////////////////////////////////////
//
//    #    ######  ###
//   # #   #     #  #
//  #   #  #     #  #
// #     # ######   #
// ####### #        #
// #     # #        #
// #     # #       ###
//
////////////////////////////////////////////////////////////////////////
app.post("/api/calorImperium/outside/set", async (req, res) => {
  console.log(req.body);
  await storage.init();
  await storage.setItem("outsideSetpoint", req.body);

  res.end(null);
});

app.post("/api/calorImperium/outside/get", async (req, res) => {
  await storage.init();

  try {
    x = await storage.getItem("outsideSetpoint");
    data = x.value;

    console.log(data);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

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
// set = async (data) => {
//   console.log(data);
//   await storage.init();
//   await storage.setItem("outsideSetpoint", data);
// };

// get = async (data) => {
//   await storage.init();

//   try {
//     x = await storage.getItem("outsideSetpoint");
//     data = x.value;

//     console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

////////////////////////////////////////////////////////////////////////
//
//  #####
// #     #  ####   ####  #    # ###### #####
// #       #    # #    # #   #  #        #
//  #####  #    # #      ####   #####    #
//       # #    # #      #  #   #        #
// #     # #    # #    # #   #  #        #
//  #####   ####   ####  #    # ######   #
//
////////////////////////////////////////////////////////////////////////
setInterval(async () => {
  await storage.init();

  try {
    x = await storage.getItem("outsideSetpoint");
    data = x.value;

    io.emit("outsideSetpoint", data);
  } catch (e) {
    console.log(e);
  }
}, 1000);

// io.emit("Kitchen Heating Sensor", kitchen);

// console.log(await storage.getItem('name')); // yourname

// async function test()
// {
//   await storage.init( /* options ... */ );
//   await storage.setItem('data','matt')
// }
//
// async function retreive()
// {
//   await storage.init( /* options ... */ );
//   let value = await storage.getItem('outsideSetpoint');
//   return value
//   // console.log(await storage.getItem('name')); // yourname
// }
//
//
//
//
// one = async () =>
// {
//   await storage.init( /* options ... */ );
//   try
//   {
//     await storage.setItem('ourRoomSchedule',ourRoomSchedule)
//   }
//
//   catch (error) { console.log(error)} ;
//
//   console.log(await storage.getItem('outsideSetpoint')); // yourname
// }
//
