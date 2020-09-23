import React from "react";
import { useEffect, useState } from "react";
import AutoOnOff from "../../Ui Library/Controllers/AutoControl";

const RadiatorFan = () => {
  const [deviceData, setActive] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(JSON.parse(localStorage.getItem("Heating Schedule")));
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Heating"}
      pos={[75, 20]}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      autoAction={() => fetch("/api/ci/manual/off")}
      manualAction={() => fetch("/api/ci/manual/on")}
      auto={deviceData.auto}
      state={deviceData.isOn}
      connection={true}
    />
  );
};

export default RadiatorFan;
