// Components
import React from "react";

class SystemDataCollector extends React.Component {
  componentWillMount = () => {
    this.getPlug();
    this.getComputerAudio();
    this.getComputerPower();
    this.getOurRoom();
    this.getBitcoin();
    this.getTableLampColour();
    this.getScreenLEDsColour();
  };

  componentDidMount = () => {
    this.timer1 = setInterval(() =>
      // 1 second timer
      {
        this.getPlug();
        this.getComputerAudio();
        this.getComputerPower();
        this.getTableLampColour();
        this.getDeskLEDsColour();
        this.getOurRoom();
        this.getScreenLEDsColour();
      }, 1 * 1000);

    this.timer2 = setInterval(() =>
      // 5 min timer
      {
        this.getBitcoin();
      }, 300 * 1000);
  };

  getPlug = () => {
    fetch("/api/plug/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("plug", response);
        } catch {
          localStorage.setItem("plug", null);
        }
      });
  };

  getComputerAudio = () => {
    fetch("/api/computerAudio/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("computerAudio", response);
        } catch {
          localStorage.setItem("computerAudio", null);
        }
      });
  };

  getComputerPower = () => {
    fetch("/api/computerPower/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("computerPower", response);
        } catch {
          localStorage.setItem("computerPower", null);
        }
      });
  };

  getTableLampColour = () => {
    fetch("/api/tableLamp/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("tableLamp", response);
        } catch {
          localStorage.setItem("tableLamp", null);
        }
      });
  };

  getDeskLEDsColour = () => {
    fetch("/api/deskLED/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("deskLEDs", response);
        } catch {
          localStorage.setItem("deskLEDs", null);
        }
      });
  };

  getOurRoom = () => {
    fetch("/api/bedroomClimate/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("ourRoom", response);
        } catch {
          localStorage.setItem("ourRoom", null);
        }
      });
  };

  getBitcoin = () => {
    fetch("http://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("bitcoin", parseFloat(resJSON.bpi.GBP.rate.replace(/,/g, "") * 0.97).toFixed());
        } catch {
          localStorage.setItem("bitcoin", null);
        }
      });
  };

  getScreenLEDsColour = () => {
    fetch("/api/screenLEDs/Status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("screenLEDs", response);
        } catch {
          localStorage.setItem("screenLEDs", null);
        }
      });
  };

  ////////////////////////
  render() {
    return null;
  }
}

export default SystemDataCollector;
