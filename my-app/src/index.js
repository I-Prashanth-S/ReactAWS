import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './style.css';
import { breakStatement } from '@babel/types';
class App extends React.Component {
    render(){
        return(<Employee/>);
    }
}
const idreg = RegExp(/^[0-9]{3,}$/);
const namereg = RegExp(/^[A-Za-z ]{3,}$/);
const qualreg = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employeeId:'',
            employeeName:'',
            qualification:'',
            designation:'',
            salary:'',
            errors: {
                employeeId:'',
            employeeName:'',
            qualification:'',
            designation:'',
            salary:''
            }
        }

    }
    handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'EmployeeId':
              errors.employeeId = idreg.test(value) ? '':'enter correct ID';
              break;
            case 'EmployeeName':
                errors.employeeName = namereg.test(value)? '' : 'name should contain atleast 3 chars and only alphabets';
                break;
            case 'qualification' :
                errors.qualification = qualreg.test(value)?'':'Enter valid Email address';
                break;
            case 'Pl' :
                errors.valu = idreg.test(value)?'':'salary can be numeric only';
                break;
            default:
                break;

        }
        this.setState({errors,[name]:value});

    }
    onSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
            console.info('Valid Form');
            window.location.assign('http://www.google.com');
        }else {
            console.log('Invalid Form');
        }
    }
    onExit = (event) => {
        event.preventDefault();

    }

    render() {
        const {errors} = this.state;
        return(
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <div className="header">
                        <h2>Paper Submission Form</h2>
                    </div>

                    <form onSubmit={this.onSubmit} noValidate>
                    
            <div className='School'>
                            <h5 htmlFor='School' style={{color:'black'}}>1.School/Center,Campus</h5>
                            <input type="text" name="School" value={this.state.value} className="School" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.employeeName.length > 0 &&
                <span className='error'>{errors.employeeName}</span>}

            </div>
            <div className='Department'>
                            <h5 htmlFor='Department' style={{color:'black'}}>2.Department</h5>
                            <input type="text" name="Department" value={this.state.value} className="Department" placeholder="Enter your answer" onChange={this.handleChange} noValidate required></input>
                            {errors.employeeName.length > 0 &&
                <span className='error'>{errors.employeeName}</span>}

            </div>
            <div className='Paper'>
                            <h5 htmlFor='Paper' style={{color:'black'}}>3.Paper Title in Full</h5>
                            <input type="text" name="Paper" value={this.state.value} className="Paper" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.employeeName.length > 0 &&
                <span className='error'>{errors.employeeName}</span>}

            </div>
            <div className='Author'>
                            <h5 htmlFor='Paper' style={{color:'black'}}>4.Author's Names and Register Numbers</h5>
                            <input type="text" name="Author" value={this.state.value} className="Author" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.employeeName.length > 0 &&
                <span className='error'>{errors.employeeName}</span>}

            </div>
            <div className='Journal'>
                            <h5 htmlFor='Paper' style={{color:'black'}}>5.Journal/Conference Name in Full</h5>
                            <input type="text" name="Journal" value={this.state.value} className="Journal" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.employeeName.length > 0 &&
                <span className='error'>{errors.employeeName}</span>}
            
            </div>
            <div className='Website'>
                            <h5 htmlFor='Website' style={{color:'black'}}>6.Website link of the Conference/Journal</h5>
                            <input type="text" name="Website" value={this.state.value} className="Website" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.qualification.length > 0 &&
                            <span className='error'>{errors.qualification}</span>}
            
            </div>
            <div className='Submission'>
                            <h5 htmlFor='Submission' style={{color:'black'}}>7.Submission Deadline</h5>
                            <input type="date" name="Submission" value={this.state.value} className="Submission" placeholder="Enter your answer" onChange={this.handleChange} noValidate></input>
                            {errors.qualification.length > 0 &&
                            <span className='error'>{errors.qualification}</span>}
            
            </div>
            <div className='Pl'>
                            <h5 htmlFor='Pl' style={{color:'black'}}>8.Plagiarism Percentage</h5>
                            <input type="number" name="Submission" value={this.state.value} className="Pl" placeholder="Number should be between 1 - 20" onChange={this.handleChange} noValidate></input>
                            {errors.valu> 0 &&
                <span className='error'>{errors.valu}</span>}
            
            </div>
            <div className='NC'>
                            <h5 htmlFor='NC' style={{color:'black'}}>9.Number of Amrita Citations</h5>
                            <input type="number" name="NC" value={this.state.value} className="NC" placeholder="The value must be a number" onChange={this.handleChange} noValidate></input>
                            {errors.valu> 0 &&
                <span className='error'>{errors.valu}</span>}
            
            </div>
            
            <div className='Final'>
                            <h5 htmlFor='Final' style={{color:'black'}}>10.Have you submitted the paper aldready?</h5>
                            <input type="number" name="Final" value={this.state.value} className="Final" placeholder="Enter" onChange={this.handleChange} noValidate></input>
                            
                            
                            {errors.valu> 0 &&
                <span className='error'>{errors.valu}</span>}
            
            </div>
                        
                        <br></br>
                        <div className="buttons">
                            {/* <input type="radio" name="ans" value="Yes"> Yes</input><br></br>
                            <input type="radio" name="ans" value="No"> No</input><br></br> */}
                            <input type="submit"></input>
                            
                        </div>
                     </form>

                </div>
            </div>
        );
    }
}
ReactDOM.render(<App/>,document.getElementById('root'));
serviceWorker.register();

