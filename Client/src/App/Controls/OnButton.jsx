// Components
import React from "react";

// class OnButton extends React.Component {
//   handleClick = () => this.props.onClick(this.props.index);

//   render() {
//     return (
//       <div className={this.props.isActive ? "onButtonActive" : "onButtonInactive"} onClick={this.handleClick}>
//         {this.props.name}
//       </div>
//     );
//   }
// }

const OnButton = ({ showGraph, top, left, datapoint }) => {
  return (
    <div
      style={{ color: deviceData.isConnected ? "white" : "orangeRed", top: `${top}%`, left: `${left}%` }}
      className={css(styles.container)}
      onClick={() => showGraph(datapoint)}
    >
      <p className={css(styles.tempText)}>{deviceData.temperature}°C</p>
      <p className={css(styles.humidityText)}>{deviceData.humidity}%</p>
    </div>
  );
};

export default OnButton;
