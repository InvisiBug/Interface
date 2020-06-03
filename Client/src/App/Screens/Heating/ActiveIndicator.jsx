// Components
import React from "react";
import Active from "./Active.png";
// Modules

class ActiveIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null
    };
  }

  componentWillMount = () => this.getActive();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getActive();
    }, 100));
  componentWillUnmount = () => clearInterval(this.timer1);

  getActive = () => {
    var cache = JSON.parse(localStorage.getItem("Heating Schedule"));
    try {
      this.setState({ active: cache.heatingOn });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return <div>{this.state.active && <img src={Active} alt="" className="activeIndicator" />}</div>;
  }
}

export default ActiveIndicator;

// <AmbientButton/>
