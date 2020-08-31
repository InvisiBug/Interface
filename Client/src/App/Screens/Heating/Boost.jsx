// Components
import React from "react";
import { useEffect, useState } from "react";
import SimpleOnOff from "../../Ui Library/SimpleOnOff";

const Boost = () => {
  const [deviceData, setDeviceData] = useState(
    JSON.parse(localStorage.getItem("Heating Schedule"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Heating Schedule")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <SimpleOnOff
      title={"1 Hr Boost"}
      pos={[20, 25]}
      onAction={() => fetch("/api/ci/boost/on")}
      offAction={() => fetch("/api/ci/boost/off")}
      state={deviceData.boost}
      connection={true}
    />
  );
};

export default Boost;
