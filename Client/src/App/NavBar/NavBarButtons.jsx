import React from "react";

class NavButton extends React.Component {
  handleClick = () => this.props.onClick(this.props.index);

  render() {
    return (
      <div
        className={this.props.isActive ? "navButtonActive" : "navButton"}
        onClick={this.handleClick}
      >
        <img src={this.props.icon} alt="" className="navIcon" />
        <div className="navText">
          <p>{this.props.name}</p>
        </div>
      </div>
    );
  }
}

export default NavButton;
