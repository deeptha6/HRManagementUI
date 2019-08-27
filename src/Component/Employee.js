import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { FormErrors } from "./FormErrors";
import employeeService from "../Service/employeeService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const defaultrole = [{ label: "Select role", value: "0" }];

class AddEmployee extends Component {
  state = {
    EmployeeID: "",
    EmployeeNumber: "",
    FirstName: "",
    LastName: "",
    DateJoined: "",
    Extension: "",
    RoleName: "",
    Roles: defaultrole,
    date: new Date(),
    formErrors: {
      EmployeeNumber: "",
      FirstName: "",
      LastName: "",
      DateJoined: "",
      Extension: "",
      RoleName: ""
    },
    EmployeeNumberValid: false,
    FirstNameValid: false,
    LastNameValid: false,
    DateJoinedValid: false,
    ExtensionValid: true,
    RoleNameValid: true,
    formValid: false,
    empService: new employeeService()
  };

  componentDidMount() {
    const { employeeNumber } = this.props.match.params;
    if (this.validateEmployeeID(employeeNumber)) {
      axios
        .get(`https://localhost:44399/api/employees/` + employeeNumber)
        .then(res => {
          var date = new Date(res.data["dateJoined"]);
          this.setState({
            EmployeeID: res.data["employeeId"],
            EmployeeNumber: res.data["employeeNumber"],
            FirstName: res.data["firstName"],
            LastName: res.data["lastName"],
            DateJoined: date,
            Extension: res.data["extension"],
            RoleName: res.data["roleName"]
          });
        });
    }

    axios.get(`https://localhost:44399/api/roles`).then(res => {
      let teamsFromApi = res.data.map(key => {
        return { value: key["roleId"], display: key["roleName"] };
      });
      this.setState({
        Roles: [{ value: "", display: "(Select the role)" }].concat(
          teamsFromApi
        )
      });
    });
  }

  onDateChange = dateValue => {
    const name = "DateJoined";
    this.setState({ [name]: dateValue }, () => {
      this.validateField(name, dateValue);
    });
  };

  handleUserInput = e => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateEmployeeID(value) {
    return value !== "" && value !== null && value > 0;
  }
  validateTextField(value) {
    return /^[A-Za-z]+$/.test(value);
  }

  validateFirstName() {
    return this.validateTextField(this.state.FirstName);
  }

  validateLastName() {
    return this.validateTextField(this.state.LastName);
  }

  validateEmployeeNumber() {
    const value = this.state.EmployeeNumber;
    return value !== "" && value !== null && (value >= 0 || value <= 9999);
  }

  validateDateJoined() {
    const value = this.state.DateJoined;
    return (
      value !== null && (value < new Date() || value > new Date("01/01/1950"))
    );
  }

  validateExtension() {
    const value = this.state.Extension;
    return value >= 0 || value <= 9999 || value == null;
  }

  validateAllField() {
    if (
      this.validateFirstName() &&
      this.validateLastName() &&
      this.validateEmployeeNumber() &&
      this.validateDateJoined() &&
      this.validateExtension() &&
      this.state.formValid === false
    ) {
      this.setState({ formValid: true });
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let EmployeeNumberValid = this.state.EmployeeNumberValid;
    let FirstNameValid = this.state.FirstNameValid;
    let LastNameValid = this.state.LastNameValid;
    let DateJoinedValid = this.state.DateJoinedValid;
    let ExtensionValid = this.state.ExtensionValid;
    let RoleNameValid = this.state.RoleNameValid;
    switch (fieldName) {
      case "FirstName":
        FirstNameValid = this.validateFirstName();
        fieldValidationErrors.FirstName = FirstNameValid ? "" : " is invalid";
        break;
      case "LastName":
        LastNameValid = this.validateLastName();
        fieldValidationErrors.LastName = LastNameValid ? "" : " is invalid";
        break;
      case "EmployeeNumber":
        EmployeeNumberValid = this.validateEmployeeNumber();
        fieldValidationErrors.EmployeeNumber = EmployeeNumberValid
          ? ""
          : " is invalid";
        break;
      case "DateJoined":
        console.log("Date" + value);
        DateJoinedValid = this.validateDateJoined();
        fieldValidationErrors.DateJoined = DateJoinedValid ? "" : " is invalid";
        break;

      case "Extension":
        ExtensionValid = this.validateExtension();
        fieldValidationErrors.Extension = ExtensionValid ? "" : " is invalid";
        break;
      case "RoleName":
        console.log(value);
        RoleNameValid = true;
        fieldValidationErrors.RoleName = RoleNameValid
          ? ""
          : " Select any Role";
        break;

      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        EmployeeNumberValid: EmployeeNumberValid,
        FirstNameValid: FirstNameValid,
        LastNameValid: LastNameValid,
        DateJoinedValid: DateJoinedValid,
        ExtensionValid: ExtensionValid,
        RoleNameValid: RoleNameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.EmployeeNumberValid &&
        this.state.FirstNameValid &&
        this.state.LastNameValid &&
        this.state.DateJoinedValid &&
        this.state.ExtensionValid &&
        this.state.RoleNameValid
    });

    console.log("RoleNameValid " + this.state.RoleNameValid);
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { employeeNumber } = this.props.match.params;

    let employeeDetail = {
      EmployeeId: employeeNumber,
      EmployeeNumber: this.state.EmployeeNumber,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      DateJoined: this.state.DateJoined,
      Extension: this.state.Extension,
      RoleName: this.state.RoleName
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    };

    if (this.validateEmployeeID(employeeNumber)) {
      axios
        .put(
          "https://localhost:44399/api/employees",
          JSON.stringify(employeeDetail),
          {
            headers: headers
          }
        )
        .then(response => {
          console.log(response);
          console.log(response.data);
          this.showMessagePopup(
            "Success",
            "Successfully updated employee's detail."
          );
        })
        .catch(error => {
          console.log("error " + error);
          this.showMessagePopup(
            "Failure",
            "Sorry something went wrong, please try again"
          );
        });
    } else {
      axios
        .post(
          "https://localhost:44399/api/employees",
          JSON.stringify(employeeDetail),
          {
            headers: headers
          }
        )
        .then(response => {
          console.log(response);
          console.log(response.data);
          this.showMessagePopup(
            "Success",
            "Successfully created new employee."
          );
        })
        .catch(error => {
          console.log("error " + error);
          this.showMessagePopup(
            "Failure",
            "Sorry something went wrong, please try again"
          );
        });
    }
  };

  showMessagePopup(title, message) {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "Close",
          onClick: () => window.location.reload()
        }
      ]
    });
  }

  componentDidUpdate() {
    const { employeeNumber } = this.props.match.params;
    if (
      employeeNumber !== "" &&
      employeeNumber !== null &&
      employeeNumber > 0
    ) {
      this.validateAllField();
    }
  }

  render() {
    return (
      <form className="demoForm" onSubmit={this.handleSubmit}>
        <h2>Add new employee</h2>

        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.FirstName
          )}`}
        >
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.FirstName || ""}
            name="FirstName"
            onChange={event => this.handleUserInput(event)}
            placeholder="Enter the Employee's First Name"
            required
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.LastName
          )}`}
        >
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.LastName || ""}
            name="LastName"
            onChange={event => this.handleUserInput(event)}
            placeholder="Enter the Employee's Last Name"
            required
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.EmployeeNumber
          )}`}
        >
          <label htmlFor="EmployeeNumber">Employee Number</label>
          <input
            type="number"
            min="0"
            max="9999"
            className="form-control"
            value={this.state.EmployeeNumber || ""}
            name="EmployeeNumber"
            onChange={event => this.handleUserInput(event)}
            placeholder="Enter the Employee Number"
            required
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.DateJoined
          )}`}
        >
          <label htmlFor="DateJoined">Date Joined</label>
          <DatePicker
            className="form-control"
            value={this.state.DateJoined}
            name="DateJoined"
            placeholder="Enter the Employee's Joined Date'"
            maxDate={new Date()}
            minDate={new Date("01/01/1950")}
            onChange={event => this.onDateChange(event)}
            required
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.Extension
          )}`}
        >
          <label htmlFor="Extension">Employee Extension</label>
          <input
            type="number"
            min="0"
            max="9999"
            className="form-control"
            value={this.state.Extension || ""}
            name="Extension"
            onChange={event => this.handleUserInput(event)}
            placeholder="Enter the Employee's Extension'"
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.RoleName
          )}`}
        >
          <label htmlFor="RoleName">Role</label>
          <select
            value={this.state.RoleName}
            className="form-control"
            name="RoleName"
            onChange={event => this.handleUserInput(event)}
          >
            {this.state.Roles.map(team => (
              <option key={team.value} value={team.display}>
                {team.display}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Submit
        </button>

        <div className="panel panel-default error">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </form>
    );
  }
}

export default AddEmployee;
