/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

import SimpleOnOff from "../../Ui Library/SimpleOnOff";

const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(
    JSON.parse(localStorage.getItem("Floodlight"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Floodlight")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <SimpleOnOff
      title={"Floodlight"}
      pos={[20, 50]}
      onAction={() => fetch("/api/Plug/On")}
      offAction={() => fetch("/api/Plug/Off")}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default Floodlight;
