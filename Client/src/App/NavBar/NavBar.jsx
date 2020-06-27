// Components
import React from "react";
import NavButtons from "./NavBarButtons";

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

class NavButtonSelection extends React.Component {
  render() {
    return (
      <div>
        test
        <NavButtons name="Home" isActive={this.props.screen === "Home"} icon={House} onClick={() => this.props.changeScreen("Home")} />
        <NavButtons name="Computer" isActive={this.props.screen === "Computer"} icon={Computer} onClick={() => this.props.changeScreen("Computer")} />
        <NavButtons name="Lights" isActive={this.props.screen === "Lights"} icon={Bulb} onClick={() => this.props.changeScreen("Lights")} />
        <NavButtons name="Climate" isActive={this.props.screen === "Climate"} icon={Sun} onClick={() => this.props.changeScreen("Climate")} />
        <NavButtons name="Heating" isActive={this.props.screen === "Heating"} icon={Heating} onClick={() => this.props.changeScreen("Heating")} />
        <NavButtons name="Advanced" isActive={this.props.screen === "Advanced"} icon={Gear} onClick={() => this.props.changeScreen("Advanced")} />
        {/* <NavButtons name="Schedules" isActive={this.props.screen === "Schedule"} icon={Schedule} onClick={() => this.props.changeScreen("Schedule")}/> */}
        {/* <NavButtons name="Printer"   isActive={this.props.screen === "Printer"}  icon={Printer}  onClick={() => this.props.changeScreen("Printer")}/> */}
        {/* <NavButtons name="Blanket"   isActive={this.props.screen === "Blanket"}  icon={Blanket}      onClick={() => this.props.changeScreen("Blanket")}/> */}
        {/* <NavButtons name="Graphs"   isActive={this.props.screen === "Graphs"}   icon={Graph}    onClick={() => this.props.changeScreen("Graphs")}/> */}
      </div>
    );
  }
}

export default NavButtonSelection;

// <NavButtons name="Plant"            isActive={this.props.screen === "Plant"}            icon={Plant}   onClick={() => this.props.changeScreen("Plant")}/>
