import React from "react";
import { useEffect, useState } from "react";
import OnOffControl from "../../Ui Library/Controllers/SimpleControl";

const Boost = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Heating Schedule")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <OnOffControl
      title={"1 Hr Boost"}
      pos={[25, 20]}
      onAction={() => fetch("/api/ci/boost/on")}
      offAction={() => fetch("/api/ci/boost/off")}
      state={deviceData.boost}
      connection={true}
    />
  );
};

export default Boost;
