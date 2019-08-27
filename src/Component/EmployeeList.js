import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { MDBBtn } from "mdbreact";
import { Route } from "react-router-dom";
import employeeService from "../Service/employeeService";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

class EmployeeList extends Component {
  state = {
    data: {
      columns: "",
      rows: ""
    },
    empService: new employeeService()
  };

  async DeleteEmployee(employeeId) {
    const { data } = await this.state.empService.deleteEmployeeDetail(
      employeeId
    );
    console.log(data);
    window.location.reload();
  }


  async btnDeleteClick(employeeId) {
    confirmAlert({
      title: "Confirm to delete the employee",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
           onClick: () => this.DeleteEmployee(employeeId)        
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  }

  async componentDidMount() {
    const { data } = await this.state.empService.getEmployeeDetails();

    const columns = [
      {
        label: "Employee ID",
        field: "employeeId",
        sort: "asc",
        width: 10
      },
      {
        label: "Employee Number",
        field: "employeeNumber",
        sort: "asc",
        width: 15
      },
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
        width: 50
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
        width: 50
      },
      {
        label: "Date Joined",
        field: "dateJoined",
        sort: "asc",
        width: 30
      },
      {
        label: "Extension",
        field: "extension",
        sort: "asc",
        width: 20
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 50
      },
      {
        label: "Options",
        field: "Options",
        sort: "asc",
        width: 50
      }
    ];

    const updatedData = Object.entries(data).map(([key, value]) => {
      const employeeNumber = value["employeeId"];

      const array2 = {
        last: (
          <div>
            <Route
              render={({ history }) => (
                <MDBBtn
                  color="default"
                  rounded
                  size="sm"
                  onClick={() => {
                    history.push("/Employee/" + employeeNumber, {
                      employeeNumber: employeeNumber
                    });
                  }}
                >
                  Edit
                </MDBBtn>
              )}
            />
            <MDBBtn
                  color="default"
                  rounded
                  size="sm"
                  className="mdbtn"
                  onClick={() => {
                    this.btnDeleteClick(employeeNumber);
                  }}
                >
                  Delete
                </MDBBtn>
             
          </div>
        )
      };
      return {
        ...value,
        ...array2
      };
    });
    console.log(updatedData);
    this.setState({
      data: {
        columns: columns,
        rows: updatedData
      }
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <MDBDataTable
        striped
        bordered
        small
        data={this.state.data}
        entriesOptions={[5, 10, 15]}
        autoWidth
      />
    );
  }
}

export default EmployeeList;
