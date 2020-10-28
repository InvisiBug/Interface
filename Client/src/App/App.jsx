/** @jsx jsx */
import React from "react";
import NavBar from "./NavBar/NavBar.jsx";
import { jsx, css } from "@emotion/core";

// Modules
import DateBox from "./Date and Time.jsx";
import Dots from "./Dots";

// Screens
import Lights from "./Screens/Lights/LightsScreen.jsx";
import Computer from "./Screens/Computer/ComputerScreen.jsx";
import Climate from "./Screens/Climate/ClimateScreen.jsx";
import Heating from "./Screens/Heating/HeatingScreen.jsx";
import Logger from "./Cache Loaders/MqttLogger";

// Cache Loader
// import TemperatureGraphsDataCollector from "./Cache Loaders/TemperatureGraphsDataCollector";
import Socket from "./Interfaces/Socket";
import backgroundImage from "../App/Backgrounds/Red.jpg";
import { useState } from "react";

const background = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;

  background: url(${backgroundImage});

  background-repeat: no-repeat;
  background-size: cover;
`;

const windowContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;

  display: flex;
`;

const navBar = css`
  height: 100%;
  width: 10%;
  /* top: 0px; */
  /* left: 0px; */
  max-width: 120px;

  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid grey;
  /* border: 5px solid green; */
`;

const screenContainer = css`
  position: relative;
  /* transform: translate(-100%, -50%); */
  height: 100%;
  /* width: 100%; */
  /* top: 50%; */
  /* left: 100%; */
  /* border: 1px solid red; */
  flex-grow: 1;
`;

const dots = css`
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: green;
`;

const App = () => {
  const [screen, setScreen] = useState(JSON.parse(localStorage.getItem("screen")));

  const changeScreen = newScreen => {
    setScreen(newScreen);
    localStorage.setItem("screen", '"' + newScreen + '"');
  };

  return (
    <>
      {/* <TemperatureGraphsDataCollector/> */}
      <Socket />

      <div css={background} />

      {/* {navigator.platform === "MacIntel" && <Dots css={dots} />} */}
      <div css={windowContainer}>
        {/* {navigator.platform === "Win32" && <Dots />} */}
        <NavBar style={navBar} changeScreen={changeScreen} screen={screen} />

        <div css={screenContainer}>
          <DateBox />

          {screen === "Computer" ? (
            <Computer />
          ) : screen === "Lights" ? (
            <Lights />
          ) : screen === "Climate" ? (
            <Climate />
          ) : screen === "Heating" ? (
            <Heating />
          ) : screen === "MQTT" ? (
            <Logger />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
