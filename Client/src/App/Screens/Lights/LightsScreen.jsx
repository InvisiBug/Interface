import React from "react";
import Floodlight from "./Floodlight";
import DeskLEDs from "./Desk LEDs";
import TableLamp from "./TableLamp";
import ScreenLEDs from "./ScreenLEDs";
import Sun from "./Sun";

const Lights = () => {
  return (
    <div>
      <Floodlight />
      <DeskLEDs />
      <TableLamp />
      <ScreenLEDs />
      <Sun />
    </div>
  );
};

export default Lights;
