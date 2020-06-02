// Components
import React from "react";
import Container from "react-bootstrap/Container";
import NavButtonSelection from "./NavBar/NavBar.jsx";

// Modules
// import BatteryMeter from './Battery Meter/BatteryMeter'
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

// import Plant           from './Components/Screens/PlantScreen.jsx';
// import Schedules from './Screens/Schedules/Schedules.jsx';
// import ElectricBlanket from './Screens/Electric Blanket/Electric Blanket.jsx'

// Cache Loader
import CacheLoader from "./Cache Loaders/CacheLoader";
// import SystemDataCollector from "./Cache Loaders/SystemDataCollector";
import ScheduleCollector from "./Cache Loaders/ScheduleCollector";
// import TemperatureGraphsDataCollector from "./Cache Loaders/TemperatureGraphsDataCollector";
import Socket from "./Cache Loaders/Socket";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null,
      response: false
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
      <div>
        <CacheLoader />
        {/* <SystemDataCollector/> */}
        {/* <TemperatureGraphsDataCollector/> */}
        <ScheduleCollector />
        <Socket />

        <div className="screenWrapper">
          <div className="background" />

          <div className="navBarWrapper">
            <NavButtonSelection
              changeScreen={this.changeScreen}
              screen={this.state.screen}
            />
          </div>
          {/* <BatteryMeter/> */}

          {navigator.platform === "Win32" && <Dots />}
          {navigator.platform === "MacIntel" && <Dots />}

          <div className="contentWrapper">
            {this.state.screen !== "Printer" && <DateBox />}

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
            ) : // this.state.screen === "Schedules" ? <Schedules/>  :
            // this.state.screen === "Blanket"  ? <ElectricBlanket/>  :
            this.state.screen === "Heating" ? (
              <Heating />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
