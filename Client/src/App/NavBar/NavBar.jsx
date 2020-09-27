// Components
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

// Icons
import Bulb from "../Ui Library/Icons/Bulb.png";
import Computer from "../Ui Library/Icons/Computer.png";
import Sun from "../Ui Library/Icons/Sun.png";
import Heating from "../Ui Library/Icons/Heating.png";
import Gear from "../Ui Library/Icons/Gear.png";
import Code from "../Ui Library/Icons/Code.png";
import NavButton from "../Ui Library/NavButton";

const navButtons = [
  // {
  //   name: "Home",
  //   icon: House
  // },
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
