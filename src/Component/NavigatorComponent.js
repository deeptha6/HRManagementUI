import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import React, { Component } from "react";
import App from "../App";
import AddEmployee from "./Employee";
import EmployeeList from "./EmployeeList";

class Navigator extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App container">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/AddEmployee">Add Employee</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/EmployeeList">View all employees</Link>
            </Navbar.Brand>
          </Navbar>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/AddEmployee" component={AddEmployee} />

            <Route path="/Employee/:employeeNumber" component={AddEmployee} />
            <Route path="/EmployeeList" component={EmployeeList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Navigator;
