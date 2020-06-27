import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  active: {
    borderBottom: "1px solid grey",
    top: "0%",
    left: "0%",
    width: "100%",
    background: "rgba(255,255,255,.2)",
    textAlign: "center",
    color: "white",
    fontSize: "1vw"
  },
  inActive: {
    borderBottom: "1px solid grey",
    background: "rgba(255, 255, 255, 0)",
    top: "0%",
    left: "0%",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: "1vw"
  },
  icon: {
    width: "30%",
    paddingTop: "7%"
  },
  text: {
    marginTop: "0%"
  }
});

const NavButton = ({ icon, name, handleClick, selection }) => {
  return (
    <div className={selection === name ? css(styles.active) : css(styles.inActive)} onClick={handleClick}>
      <img src={icon} alt="" className={css(styles.icon)} />
      <div className={css(styles.text)}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default NavButton;
