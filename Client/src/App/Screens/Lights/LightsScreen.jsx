// Components
import React from "react";

// Modules
import PlugSwitch from "./Plug";
import DeskLEDs from "./Desk LEDs";
import TableLamp from "./TableLamp";
import ScreenLEDs from "./ScreenLEDs";

class Lights extends React.Component {
  render() {
    return (
      <div className="lightScreen">
        <PlugSwitch />
        <DeskLEDs />
        <TableLamp />
        <ScreenLEDs />
      </div>
    );
  }
}

export default Lights;
