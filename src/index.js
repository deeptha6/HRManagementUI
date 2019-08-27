import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigator from "./Component/NavigatorComponent";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

const routing = (
  <div className="App">
    <div className="App-header">
      <h2>HR Management Service</h2>
    </div>
    <Navigator />
  </div>
);
ReactDOM.render(routing, document.getElementById("root"));
//{/*  <EmployeeList /> <EmployeeList /> */}<AddEmployee />
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
