const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);




// create a connection variable with the required details
var con = mysql.createConnection({
  //host: "instance1.c02gbtm2eqhm.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  host:"cloud2.c5c3fouuxakq.us-east-1.rds.amazonaws.com",
  user:"admin", // user name to your mysql database
  password:"qwerty123", // corresponding password
  database: "cloud2" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("Select * from data", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
 //     console.log(res)
    });
  });
});





app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/',(req,res)=>{
  var {seldate,days,country,states}=req.body;
 // console.log(name);
 //console.log(req.body);
  var xtra="";
  var records = [[req.body.seldate,req.body.days,req.body.country,req.body.states]];
//console.log(records)
if(records[0][0]!=null)
{
  con.query("INSERT INTO data (seldate,days,country,states) VALUES ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });

}

})


app.listen(3001,()=>{
  console.log("Port 3001");
})
