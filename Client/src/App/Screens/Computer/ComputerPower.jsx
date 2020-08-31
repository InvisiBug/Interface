/** @jsx jsx */
import React from "react";
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import SimpleOnOff from "../../Ui Library/SimpleOnOff";

const ComputerPower = () => {
  const [deviceData, setDeviceData] = useState(
    JSON.parse(localStorage.getItem("Computer Power"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Computer Power")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <SimpleOnOff
      title={"Computer Power"}
      pos={[15, 30]}
      onAction={() => fetch("/api/ComputerPower/On")}
      offAction={() => fetch("/api/ComputerPower/Off")}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default ComputerPower;
