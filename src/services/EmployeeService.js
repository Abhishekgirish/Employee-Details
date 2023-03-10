import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/"  ;

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        console.log(axios.get(EMPLOYEE_API_BASE_URL+ employeeId));
        return axios.get(EMPLOYEE_API_BASE_URL + employeeId);
    }
 
    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + employee,employeeId);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + employeeId);
    }
}

export default new EmployeeService()