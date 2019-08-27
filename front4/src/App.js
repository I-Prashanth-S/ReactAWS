import React,{Component} from 'react';
import DatePicker  from 'react-datepicker';
import {addDays} from 'date-fns';
import './App.css';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
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
    filename:'',
    country: {'value':'','label':''},
    states: {'value':'','label':'','link':''},
    response:{error:{}}
  }

}

upload=(event)=>{
  this.setState({filename:event.target.files[0]});
}

handleUpload = (event) => {
  event.preventDefault();
  const data = new FormData();
  if(this.state.filename!='')
data.append( 'profileImage', this.state.filename, this.state.filename.name );
console.log("UPLOADING IMAGE");
axios.post( 'http://localhost:3005/img', data, {
    headers: {
     'accept': 'application/json',
     'Accept-Language': 'en-US,en;q=0.8',
     'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
    }
   })
    .then( ( response ) => {
if ( 200 === response.status ) {
      // If file size is larger than expected.
      if( response.data.error ) {
       if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
       alert( 'Max size: 2MB');
       } else {
        console.log( response.data );
// If not the given file type
        alert( response.data.error );
       }
      } 
      else {
       // Success
       let fileName = response.data;
       if(fileName==='Error: No File Selected')
       alert("SELECT A FILE!!!!");

       if(fileName!='Error: No File Selected')
       alert( 'File Uploaded'+ '#3089cf' );
      }
     }
  else {
   // if file not selected throw error
 console.log( 'Please upload file'+ 'red' );
  }
  

    }).catch( ( error ) => {
    // If another error
     console.log( error+ 'red' );
   });
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
console.log(this.state);
fetch('http://localhost:3005/',{
method:'post',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
  productName:this.state.productname,
  Shipzip:this.state.Shipzip,
  Phno:this.state.country.Phno
})
}).then(res=> res.json())
.then(data=>{this.setState({response:JSON.parse(data)})})
.then(x=>{
 if(JSON.stringify(this.state.response.error)==null)
  alert('Error');
else
  alert('DONE');

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
	<h2>
		Shipping info
	</h2>
  <div className='productName'>
              <label htmlFor="productname">Product Name</label><br></br>
              <input type='text' name='productname' placeholder="Your answer" id="productname" onChange={this.handleChange} noValidate required />
            </div>
  
            <div className='Shipzip'>
              <label htmlFor="Shipzip">Shipping City Zipcode</label><br></br>
              <h7>Zip code of a City in USA</h7><br></br>
              <input type='number' name='Shipzip' placeholder="Your answer" id="Shipzip" onChange={this.handleChange} noValidate required />
            </div>
            <div className='Phno'>
              <label htmlFor="Phno">Phone Number</label><br></br>
              <input type='number' name='Phno' placeholder="Your answer" id="Phno"  onChange={this.handleChange} noValidate required />
            </div>


    <h7>Product Image</h7><br></br>
    <input type='file' onChange={this.upload}/>
    <button class="Upload" onClick={this.handleUpload}>Add File</button>
  <input type='submit' onClick={this.handleSubmit} className="btn btn-primary"/>
</div>

</form>
</div>
   </div>
   </div>
  );

}}

export default App;
