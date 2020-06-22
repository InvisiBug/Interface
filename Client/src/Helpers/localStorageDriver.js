export const localStorageParser = datapoint => {
  return JSON.parse(localStorage.getItem(datapoint));
};

export const localStorageSaver = (datapoint, value) => {
  localStorage.setItem(datapoint, JSON.stringify(value));
};

// export default thisone;

// import thisone, { localStorageParser, localStorageSaver } from "./path";
