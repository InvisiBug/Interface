// Components
import React from "react";
import Card from "react-bootstrap/Card";

class Button extends React.Component {
  handleClick = () => this.props.onClick(this.props.index);

  render() {
    return (
      <Card className={this.props.isActive ? "buttonActive" : "buttonInactive"} onClick={this.handleClick}>
        {this.props.name}
      </Card>
    );
  }
}

export default Button;
