import React from "react";
import { useEffect, useState } from "react";
import SimpleControl from "../../Ui Library/Controllers/SimpleControl";

const ComputerPower = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Computer Power")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Computer Power")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <SimpleControl
      title={"Computer Power"}
      pos={[30, 10]}
      onAction={() => fetch("/api/ComputerPower/On")}
      offAction={() => fetch("/api/ComputerPower/Off")}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default ComputerPower;
