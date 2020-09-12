// Components
import React from "react";

// Modules
import Floodlight from "./Floodlight";
import DeskLEDs from "./Desk LEDs";
import TableLamp from "./TableLamp";
import ScreenLEDs from "./ScreenLEDs";

const Lights = () => {
  return (
    <div>
      <Floodlight />
      <DeskLEDs />
      <TableLamp />
      <ScreenLEDs />
    </div>
  );
};

export default Lights;
