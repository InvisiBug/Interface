// Core
import "bootstrap/dist/css/bootstrap.css"; // This is needed for the bootstrap rules, don't turn it off
import ReactDOM from "react-dom";
import App from "./App/App.jsx";
import React from "react";

// CSS
import "./CSS/Computer.css";
import "./CSS/MyStyles.css";
import "./CSS/Climate.css";
import "./CSS/Modules.css";
import "./CSS/Weather.css";
import "./CSS/Graphs.css";
import "./CSS/Button.css";
import "./CSS/Lights.css";
import "./CSS/NavBar.css";
import "./CSS/Schedule.css";
import "./CSS/HeatingSensors.css";
import "./CSS/Advanced.css";

// Render to page
ReactDOM.render(<App />, document.getElementById("root")); // Change this back to router if needed
