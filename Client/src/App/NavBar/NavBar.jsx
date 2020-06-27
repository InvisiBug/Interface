// Components
import React from "react";
import { StyleSheet, css } from "aphrodite";

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

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "10%",
    top: "0px",
    left: "0px",
    maxWidth: "120px",

    background: "rgba(255, 255, 255, .05)",
    border: "1px solid red"
  }
});

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
  // {
  //   name: "Heating",
  //   icon: Heating
  // },
  {
    name: "Advanced",
    icon: Gear
  },
  {
    name: "MQTT",
    icon: Code
  }
];

const NavButtonSelection = ({ screen, changeScreen }) => {
  console.log(screen);
  return (
    <div className={css(styles.container)}>
      {navButtons.map(button => (
        <NavButton name={button.name} selection={screen} icon={button.icon} key={Math.random()} handleClick={() => changeScreen(button.name)} />
      ))}
    </div>
  );
};

export default NavButtonSelection;
