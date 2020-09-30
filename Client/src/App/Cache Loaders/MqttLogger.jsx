import React, { useEffect, useState } from "react";

import openSocket from "socket.io-client";
import { localStorageSaver, localStorageParser } from "../../Helpers/localStorageDriver";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "52%",
    left: "50%",
    height: "90%",
    width: "90%",

    borderRadius: "20px",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(50, 50, 50, 0.1)",
    fontFamily: "Arial",
    fontSize: "15px"
  },
  logWindow: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    height: "90%",
    width: "90%",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // textAlign: "center",

    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",

    // border: "1px solid red",

    color: "White"
  }
});

const MqttLogger = () => {
  const [log, setLog] = useState(localStorageParser("Mqtt"));

  useEffect(() => {
    const interval = setInterval(() => {
      setLog(localStorageParser("Mqtt"));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.logWindow)}>
        {log.map(lines => (
          <p key={Math.random()}>{JSON.stringify(lines)}</p>
        ))}
      </div>
    </div>
  );
};

export default MqttLogger;
