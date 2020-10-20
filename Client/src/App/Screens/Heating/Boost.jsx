import React from "react";
import { useEffect, useState } from "react";
import OnOffControl from "../../Ui Library/Controllers/SimpleControl";

const Boost = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Heating Schedule")));
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <OnOffControl
      title={"Boost"}
      pos={[20, 20]}
      onAction={() => fetch("/api/ci/boost/on")}
      offAction={() => fetch("/api/ci/boost/off")}
      state={deviceData.boostTime > now ? true : false}
      connection={true}
    />
  );
};

export default Boost;
