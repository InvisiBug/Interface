// Components
/** @jsx jsx */
import React from "react";
// import { StyleSheet, css } from "aphrodite";
import { jsx, css } from "@emotion/core";

// Icons
import House from "./Nav Bar Icons/Home.png";
import Bulb from "./Nav Bar Icons/Bulb.png";
// import Weather from "./Nav Bar Icons/Weather.png";
import Computer from "./Nav Bar Icons/Computer.png";
// import Graph from "./Nav Bar Icons/Graph.png";
import Sun from "./Nav Bar Icons/Sun.png";
// import Printer from "./Nav Bar Icons/Printer.png";
// import Schedule from "./Nav Bar Icons/Schedule.png";
// import Blanket from "./Nav Bar Icons/Blanket.png";
import Heating from "./Nav Bar Icons/Heating.png";
import Gear from "./Nav Bar Icons/Gear.png";
import Code from "./Nav Bar Icons/Code.png";

import NavButton from "./NavButton";

const navButtons = [
  {
    name: "Home",
    icon: House
  },
  {
    name: "Computer",
    icon: Computer
  },
  {
    name: "Lights",
    icon: Bulb
  },
  {
    name: "Climate",
    icon: Sun
  },
  {
    name: "Heating",
    icon: Heating
  },
  {
    name: "Advanced",
    icon: Gear
  },
  {
    name: "MQTT",
    icon: Code
  }
];

const NavBar = ({ style, screen, changeScreen }) => {
  return (
    <div css={style}>
      {navButtons.map(button => (
        <NavButton name={button.name} selection={screen} icon={button.icon} key={Math.random()} handleClick={() => changeScreen(button.name)} />
      ))}
    </div>
  );
};

export default NavBar;

// <>
//   {navButtons.map(button => (
//     <NavButton name={button.name} selection={screen} icon={button.icon} key={Math.random()} handleClick={() => changeScreen(button.name)} />
//   ))}
// </>

// navButtons.map(button => (
//   <NavButton name={button.name} selection={screen} icon={button.icon} key={Math.random()} handleClick={() => changeScreen(button.name)} />
// ))
