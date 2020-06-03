// Components
import React from "react";
import Container from "react-bootstrap/Container";
// import Row       from 'react-bootstrap/Row';
// import Col       from 'react-bootstrap/Col';

class Bitcoin extends React.Component {
  constructor() {
    super();

    this.state = {
      price: null,
      titleColour: "white"
    };
  }

  componentWillMount() {
    this.getPrice();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getPrice();
    }, 60 * 1000);
  }

  getPrice() {
    var cache = JSON.parse(localStorage.getItem("bitcoin"));
    try {
      this.setState({ price: cache });
      this.setState({ titleColour: "white" });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  }

  render() {
    return (
      <div className="bitcoinContainer">
        <Container>
          <div className="bitcoinTitle" style={{ color: this.state.titleColour }}>
            <h3>Bitcoin Price</h3>
          </div>
          <div className={"priceText"}>£{this.state.price}</div>
        </Container>
      </div>
    );
  }
}

export default Bitcoin;
