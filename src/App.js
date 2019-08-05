import React from 'react';
import './App.css';
import axios from 'axios';


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      days: '',
      country: [
        {key:'select', name: 'Select a Country' , states: ['Select a State']},
        {key:'India', name: 'India' , states: ['Select a State','Tamilnadu','Karnataka','Kerala','Telengana','Andhrapradesh']},
        {key:'America' ,name: 'America' , states: ['Select a State','California','Florida','Texas','Telengana','Newjersey']},
        {key:'Australia' ,name: 'Australia', states: ['Select a State','Wales','Queensland','WesternAustralia','Victoria','Tasmania']},
        {key:'England' ,name: 'England', states: ['Select a State','Berkshire','London','Cornwall','Derby','Medway']},
        {key:'Germany' ,name: 'Germany', states: ['Select a State','Bavaria','Berlin','Bremen','Hamburg','Saarland']}
      ],
      currentcountry: 'Select a Country',
      currentstate: 'Select a State',
      errors: {
        date: '',
        days: '',
        country: '',
        state: ''
      }
    };
   }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    const validationdata = {
      val: value
    };
    switch (name) {
      case 'date':
      axios.post(`http://localhost:3001/checkdate`,validationdata)
        .then(res => {
          if(res.data){
            errors.date = '';
          }
          else{
            errors.date = 'Date should not exceed today';
          }
        })
        break;
      case 'days':
      axios.post(`http://localhost:3001/checkdays`,validationdata)
        .then(res => {
          if(res.data){
            errors.days = '';
          }
          else{
            errors.days = 'Days should be less than 30';
          }
        })
        break;
      case 'country':
      axios.post(`http://localhost:3001/checkcountry`,validationdata)
        .then(res => {
          if(res.data){
            errors.country = '';
          }
          else{
            errors.country = 'Enter a country';
          }
        })
        break;
      case 'state':
      axios.post(`http://localhost:3001/checkstate`,validationdata)
        .then(res => {
          if(res.data){
            errors.state = '';
          }
          else{
            errors.state = 'Enter a state';
          }
        })
          break;
      default:
        break;
    }
    if(name==='country'){
      this.setState({errors, currentcountry: value});
    }
    else if(name==='state'){
      this.setState({errors, currentstate: value});
    }
    else{
      this.setState({errors, [name]: value});
    }


  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      date: this.state.date,
      days: this.state.days,
      country: this.state.currentcountry,
      state: this.state.currentstate
    };
    console.log(user.date);
    if(validateForm(this.state.errors)) {
      axios.post(`http://localhost:3001/`,user)
        .then(res => {
          if(res.data){
            alert('Data sent');
          }
          else{
            alert('Data not sent');
          }
        })
    }else{
      alert('Invalid Form');
    }
  }

  render(){
    const {errors} = this.state;
    let country = this.state.country.filter(c => {
              return c.name === this.state.currentcountry
            })
    return (
      <div className="wrapper">
      <form className='form-wrapper' onSubmit={this.handleSubmit}>

      <div className='date'>
        <label htmlFor="date">Date:</label>
        <input type='Date' name='date' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.date.length > 0 &&
          <span className='error'>{errors.date}</span>}
      </div>
      <br/>
      <div className='days'>
        <label htmlFor="days">Days:</label>
        <input type='number' name='days' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.days.length > 0 &&
          <span className='error'>{errors.days}</span>}
      </div>
      <br/>
      <div className='country'>
        <label htmlFor="country">Country:</label>
        <select name="country" onChange={this.handleChange} onBlur={this.handleChange}>
        {
            this.state.country.map((c, i) => {
              return <option key={i}>{c.name}</option>
            })
          }
        </select>
        {errors.country.length > 0 &&
          <span className='error'>{errors.country}</span>}
      </div>
      <br/>
      <div className='state'>
        <label htmlFor="state">State:</label>
        <select name="state" onChange={this.handleChange} onBlur={this.handleChange}>
        {
            country[0].states.map((s, i) => {
              return <option key={i}>{s}</option>
            })
          }
        </select>
        {errors.state.length > 0 &&
          <span className='error'>{errors.state}</span>}
      </div>
      <br/>
      <br/>
      <div className='submit'>
        <button>Submit</button>
      </div>

      </form>
      </div>
    );
  }
}

export default App;
