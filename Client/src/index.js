// Core
import "bootstrap/dist/css/bootstrap.css"; // This is needed for the bootstrap rules, don't turn it off
import ReactDOM from "react-dom";
import App from "./App/App.jsx";
import React from "react";

// CSS
import "./CSS/Computer.css";
import "./CSS/Climate.css";
import "./CSS/Graphs.css";
import "./CSS/Button.css";
import "./CSS/Lights.css"; // deffo needed

// Render to page
ReactDOM.render(<App />, document.getElementById("root")); // Change this back to router if needed
