import axios from "axios";

export default class employeeService {
  async getEmployeeDetails() {
    return await axios.get(`https://localhost:44399/api/employees`);
  }

  async getEmployeeDetail(employeeId) {
    return await axios.get(
      `https://localhost:44399/api/employees/` + employeeId
    );
  }

  async deleteEmployeeDetail(employeeId) {
    return await axios.delete(
      `https://localhost:44399/api/employees/` + employeeId
    );
  }
}
