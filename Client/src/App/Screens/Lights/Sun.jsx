import React from "react";
import { useEffect, useState } from "react";
import OnOffControl from "../../Ui Library/Controllers/SimpleControl";

const deviceName = "Sun";
const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem(deviceName)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem(deviceName)));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <OnOffControl
      title={deviceName}
      pos={[75, 20]}
      onAction={() => fetch("/api/Sun/On")}
      offAction={() => fetch("/api/Sun/Off")}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default Floodlight;
