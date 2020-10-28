/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 90px;
  width: 55%;
  top: 2%;
  left: 50%;

  max-width: 700px;
  min-width: 600px;

  border-radius: 20px;
  user-select: none;

  border: 1px solid rgba(255, 255, 255, 0.2);

  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 40px;
`;

const dateText = css`
  position: absolute;
  transform: translate(0%, -50%);
  top: 60%;
  left: 2.5%;
`;

const timeText = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 60%;
  left: 84%;
  white-space: nowrap;

  display: flex;
  justify-content: flex-end;
`;

const getTime = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const getDate = () => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  var ordinal = ordinal_suffix_of(day);

  function ordinal_suffix_of(i) {
    var j = i % 10;
    var k = i % 100;

    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";

    return i + "th";
  }

  return `${ordinal} ${months[monthIndex]} ${year}`;
};

const DateAndTime = () => {
  const [data, setData] = useState({
    time: getTime(new Date()),
    long: getDate()
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        time: getTime(new Date()),
        long: getDate()
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div css={container}>
      <div css={dateText}>{data.long}</div>
      <div css={timeText}>{data.time}</div>
    </div>
  );
};

export default DateAndTime;
