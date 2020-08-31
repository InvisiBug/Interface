/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

import AutoOnOff from "../../Controls/AutoOnOff";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(
    JSON.parse(localStorage.getItem("Radiator Fan"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
      console.log(deviceData);
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Radiator Fan"}
      pos={[50, 50]}
      onAction={() => fetch("/api/RadiatorFan/On")}
      offAction={() => fetch("/api/RadiatorFan/Off")}
      autoAction={() => fetch("/api/RadiatorFanAutomatic/On")}
      manualAction={() => fetch("/api/RadiatorFanAutomatic/off")}
      auto={deviceData.isAutomatic}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default RadiatorFan;
