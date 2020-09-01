/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

import AutoOnOff from "../../Ui Library/AutoOnOff";

const RadiatorFan = () => {
  const [deviceData, setActive] = useState(
    JSON.parse(localStorage.getItem("Heating Schedule"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(JSON.parse(localStorage.getItem("Heating Schedule")));
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Heating"}
      pos={[20, 75]}
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
