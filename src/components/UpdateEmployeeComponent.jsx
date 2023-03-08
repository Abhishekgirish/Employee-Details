import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            age: '',
            dept: '',
            salary:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
         //this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeAgeHandler=this.changeAgeHandler.bind(this);
       // this.changeSalaryHandler=this.changeSalaryHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                id:employee.id,
                name: employee.name,
                age: employee.age,
                dept : employee.dept,
                salary : employee.salary
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, age: this.state.age, dept: this.state.dept, salary: this.state.salary};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(this.state.id,employee).then( res => {
            this.props.history.push('/employees');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAgeHandler= (event) => {
        this.setState({age: event.target.value});
    }

    changeDeptHandler= (event) => {
        this.setState({dept: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="Name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Age: </label>
                                            <input placeholder="Age" name="Age" className="form-control" 
                                                value={this.state.age} onChange={this.changeAgeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Department: </label>
                                            <input placeholder="Department" name="Department" className="form-control" 
                                                value={this.state.dept} onChange={this.changeDeptHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Salary: </label>
                                            <input placeholder="Enter your Salary" name="Salary" className="form-control" 
                                                value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
