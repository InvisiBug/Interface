/** @jsx jsx */
import React from "react";
import { useEffect, useState } from "react";
import Active from "../../Ui Library/Icons/Active.png";
import { jsx, css } from "@emotion/core";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 64px;
  width: 64px;
  top: 4%;
  left: 50%;
  opacity: 0.8;
`;

const ActiveIndicator = () => {
  const [deviceData, setActive] = useState(JSON.parse(localStorage.getItem("Heating")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(JSON.parse(localStorage.getItem("Heating")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <>
      <div>{deviceData.isOn && <img src={Active} alt="" css={container} />}</div>
    </>
  );
};

export default ActiveIndicator;
