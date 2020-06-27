import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  active: {
    backgroundColor: "rgba(255,0,0,0.5)",
    border: "1px solid rgba(255, 255, 255, 1)",
    height: "50px",
    width: "100px",
    fontSize: "21px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.25rem"
  },

  inactive: {
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255, 255, 255, 1)",
    height: "50px",
    width: "100px",
    fontSize: "21px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.25rem"
  }
});

const OnButton = ({ name, isActive, handleClick }) => {
  return (
    <div>
      <div className={isActive ? css(styles.active) : css(styles.inactive)} onClick={() => handleClick()}>
        {name}
      </div>
    </div>
  );
};

export default OnButton;
