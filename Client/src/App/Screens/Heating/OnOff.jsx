import React from "react";
import { useEffect, useState } from "react";
import AutoOnOff from "../../Ui Library/Controllers/AutoControl";

const RadiatorFan = () => {
  const [deviceData, setActive] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(JSON.parse(localStorage.getItem("Heating Schedule")));
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Heating"}
      pos={[85, 20]}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      autoAction={() => fetch("/api/ci/manual/off")}
      manualAction={() => fetch("/api/ci/manual/on")}
      auto={deviceData.auto}
      state={deviceData.heatingTime > now ? true : false}
      connection={true}
    />
  );
};

export default RadiatorFan;
