////////////////////////////////////////////////////////////////////////
//
//  ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
//  ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
//  █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
//  ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
//  ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//
////////////////////////////////////////////////////////////////////////
const currentTime = () => {
  const d = new Date();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = daysOfWeek[d.getDay()];
  const months = monthOfYear[d.getMonth()];

  return {
    Hour: hour,
    Minute: minute,
    Day: day,
    Month: month,
    Year: year,
    Days: days,
    Months: months,
  };
};

var printTime = () => {
  const date = new Date();
  let hours = date.getHours(); // *NB* figure out a way to make these all const
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const toggleLogic = (data, point, value) => {
  data = {
    ...data,
    [point]: value,
  };
  return data;
};

module.exports = {
  currentTime: currentTime,
  printTime: printTime,
};
