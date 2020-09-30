// Components
import React from "react";
import Card from "react-bootstrap/Card";

class OffButton extends React.Component {
  handleClick = () => this.props.onClick(this.props.index);

  render() {
    return (
      <Card className={this.props.isActive ? "offButtonActive" : "offButtonInactive"} onClick={this.handleClick}>
        {this.props.name}
      </Card>
    );
  }
}

export default OffButton;
