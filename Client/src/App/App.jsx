// Components
/** @jsx jsx */
import React from "react";
import NavBar from "./NavBar/NavBar.jsx";
// import { StyleSheet, css } from "aphrodite";
import { jsx, css } from "@emotion/core";

// Modules
import DateBox from "./Date and Time.jsx";
import Dots from "./Dots";

// Screens
import Home from "./Screens/Home/HomeScreen.jsx";
import Lights from "./Screens/Lights/LightsScreen.jsx";
import Computer from "./Screens/Computer/ComputerScreen.jsx";
import Climate from "./Screens/Climate/ClimateScreen.jsx";
import Printer from "./Screens/Printer/Printer.jsx";
import Heating from "./Screens/Heating/Heating.jsx";
import Advanced from "./Screens/Advanced/AdvancedScreen";
import Logger from "./Cache Loaders/MqttLogger";

// import Plant           from './Components/Screens/PlantScreen.jsx';
// import Schedules from "./Screens/Schedules/Schedules.jsx";
// import ElectricBlanket from './Screens/Electric Blanket/Electric Blanket.jsx'

// Cache Loader
import CacheLoader from "./Cache Loaders/CacheLoader";
import ScheduleCollector from "./Cache Loaders/ScheduleCollector";
// import TemperatureGraphsDataCollector from "./Cache Loaders/TemperatureGraphsDataCollector";
import Socket from "./Cache Loaders/Socket";
import backgroundImage from "../App/Backgrounds/Red.jpg";

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
  /* position: absolute; */

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };
  }

  componentWillMount = () => {
    try {
      var cache = JSON.parse(localStorage.getItem("screen")); // need to save to variable for the try catch block to work
      this.setState({ screen: cache });
    } catch (error) {
      console.log(error);
    }
  };

  changeScreen = newScreen => {
    this.setState({ screen: newScreen });
    localStorage.setItem("screen", '"' + newScreen + '"');
  };

  render() {
    return (
      <>
        <CacheLoader />
        {/* <TemperatureGraphsDataCollector/> */}
        <ScheduleCollector />
        <Socket />

        <div css={background} />

        {/* {navigator.platform === "Win32" && <Dots />} */}
        {navigator.platform === "MacIntel" && <Dots />}

        <div css={windowContainer}>
          <NavBar style={navBar} changeScreen={this.changeScreen} screen={this.state.screen} />
          {/* <NavBar css={navBar} changeScreen={this.changeScreen} screen={this.state.screen} /> */}
          <div css={screenContainer}>
            <DateBox />

            {this.state.screen === "Home" ? (
              <Home />
            ) : this.state.screen === "Computer" ? (
              <Computer />
            ) : this.state.screen === "Lights" ? (
              <Lights />
            ) : this.state.screen === "Climate" ? (
              <Climate />
            ) : this.state.screen === "Printer" ? (
              <Printer />
            ) : this.state.screen === "Advanced" ? (
              <Advanced />
            ) : //) //: this.state.screen === "Schedules" ? (
            //<Schedules />
            // this.state.screen === "Blanket"  ? <ElectricBlanket/>  :
            this.state.screen === "Heating" ? (
              <Heating />
            ) : this.state.screen === "MQTT" ? (
              <Logger />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default App;
