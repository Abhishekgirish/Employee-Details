import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            age: '',
            dept: '',
            salary: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    // id: employee.id,
                    name: employee.name,
                    age: employee.age,
                    dept : employee.dept,
                    salary : employee.salary
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { name: this.state.name,age: this.state.age, dept: this.state.dept, salary: this.state.salary};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDeptHandler= (event) => {
        this.setState({dept: event.target.value});
    }

    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeAgeHandler= (event) => {
        this.setState({age: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Add</h3>
        }else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                            <input placeholder="Name" name="Name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> dept: </label>
                                            <input placeholder="Department" name="Department" className="form-control" 
                                                value={this.state.dept} onChange={this.changeDeptHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> salary: </label>
                                            <input placeholder="Enter Your Salary" name="Enter your Salary" className="form-control" 
                                                value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Age </label>
                                            <input placeholder="Age" name="Age" className="form-control" 
                                                value={this.state.age} onChange={this.changeAgeHandler}/>
                                        </div>
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
