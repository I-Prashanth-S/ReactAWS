import React,{Component} from 'react';
import DatePicker  from 'react-datepicker';
import {addDays} from 'date-fns';
import './App.css';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment';

const def_state = {'states': {'value':'','label':'','link':''}}


// const validateForm = (states) => {
//   let valid = true;
//   Object.values(states).forEach(
//     (val) => val.length === 0 && (valid = false)
//   );

//   return valid;
// }


class App extends Component {


constructor(props)
{
  super(props);
  this.state={
    seldate:new Date(),
    days:'',
    country: {'value':'','label':''},
    states: {'value':'','label':'','link':''},
    response:{error:{}}
  }

}

  handleChange1 = (selectedOption) => {
    this.setState(def_state);
    this.setState({country:selectedOption},() => {
    
  //  console.log(this.state);
    document.getElementById('countrydisplay').value=this.state.country.label;
    document.getElementById('statedisplay').value=this.state.states.label;

})  };

  handleChange2 = (selectedOption) => {
    this.setState({states: selectedOption},() => {
    document.getElementById('statedisplay').value=this.state.states.label; 
}) }


handleChange = (event) => {
  event.preventDefault();
  const {name,value} = event.target;
  this.setState({[name]:value});

//console.log(this.state);
}
  
onChange =  (seldate) => {
   
  this.setState({ seldate })
 // var dayselect=moment(seldate).format('DD-MM-YYYY');
 // var today=moment(new Date()).format('DD-MM-YYYY');

  var one_day=1000*60*60*24;
  var x=seldate-new Date();
  x=Math.round(x/one_day);

 document.getElementById('days').value=x;
  this.setState({days:x})
}


handleSubmit = (event) => {

event.preventDefault();

fetch('http://localhost:3001/',{
method:'post',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
  seldate:this.state.seldate,
  days:this.state.days,
  country:this.state.country.label,
  states:this.state.states.label
})
}).then(res=> res.json())
.then(data=>{this.setState({response:JSON.parse(data)})})
.then(x=>{
 if(JSON.stringify(this.state.response.error)==null)
  alert('DONE');
else
  alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));

})}




render(){
  
    const options1 = [
      {value: 'ban', label: 'Bangladesh'},
      {value: 'in', label: 'India'},
      {value: 'sa', label: 'South Africa'},
      {value: 'aus', label: 'Australia'},
      {value: 'eng', label: 'England'}

    ];

    const options2 = [
      {value: 'tn', label: 'Tamilnadu', link: 'in'},
      {value: 'wb', label: 'West Bengal', link: 'in'},
      {value: 'kl', label: 'Kerala', link: 'in'},
      {value: 'jk', label: 'Jammu & Kashmir', link: 'in'},
      {value: 'jh', label: 'Jharkhand', link: 'in'},
      {value: 'mel', label: 'Melbourne', link: 'aus'},
      {value: 'syd', label: 'Sydney', link: 'aus'},
      {value: 'br', label: 'Brisbane', link: 'aus'},
      {value: 'ho', label: 'Hobart', link: 'aus'},
      {value: 'ad', label: 'Adelaide', link: 'aus'},
      {value: 'ct', label: 'Capetown', link: 'sa'},
      {value: 'db', label: 'Durban', link: 'sa'},
      {value: 'pe', label: 'Port Elizabeth', link: 'sa'},
      {value: 'bf', label: 'Bloemfontein', link: 'sa'},
      {value: 'jb', label: 'Johannesburg', link: 'sa'},
      {value: 'cg', label: 'Chittagong', link: 'ban'},
      {value: 'dk', label: 'Dhaka', link: 'ban'},
      {value: 'bs', label: 'Barisal', link: 'ban'},
      {value: 'rs', label: 'Rajshahi', link: 'ban'}, 
      {value: 'lan', label: 'Lancashire', link: 'ban'},
      {value: 'wor', label: 'Worcestershire', link: 'eng'},
      {value: 'notts', label: 'Nottingham', link: 'eng'},
      {value: 'war', label: 'Warwickshire', link: 'eng'},
      {value: 'deb', label: 'Derbyshire', link: 'eng'},
      {value: 'co', label: 'Comilla', link: 'ban'}
        
    


    ];

    const filteredOptions = options2.filter((o) => (o.link=== this.state.country.value))
 
  return (
    <div className="App">
<div className="all">


<div className='formwarp'>
<form>
<div className='wrap'>
  <div className="form-group col-md-10">
    <label htmlFor="seldate">Date</label>


 <DatePicker
  className="seldate"
  selected={this.state.seldate}
  minDate={new Date()}
  onChange={this.onChange}
  maxDate={addDays(new Date(), 30)}
   />
  
  </div>
  <div className="form-group col-md-10">
    <label htmlFor="Days">Days</label>
    <input type="text" className="form-control" id="days" name="days" readOnly />
  </div>
  <div className="form-group col-md-10">
      <label htmlFor="Country">Country</label>
        <Select
          name="country"
          dateFormat="yyyy/MM/dd"
          value={this.state.country.value}
          onChange={this.handleChange1}
          options={options1}
        />
         <input type="text" className="form-control" id="countrydisplay" disabled />
         


    </div>

  <div className="form-group col-md-10">
      <label htmlFor="State">State</label>


        <Select
          name="states"
          value={this.state.states.value}
          onChange={this.handleChange2}
          options={filteredOptions}
        required/>
<input type="text" className="form-control" id="statedisplay" disabled />

    </div>

  <div className="form-group col-md-10">
      <label htmlFor="State" >Check State Variables</label>

    </div>


  <input type='submit' onClick={this.handleSubmit} className="btn btn-primary"/>
</div>

</form>
</div>
   </div>
   </div>
  );

}}

export default App;
