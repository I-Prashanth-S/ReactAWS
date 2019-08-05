var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const validnumber = RegExp((/^[0-9]+$/));
const validletter = RegExp((/^[A-Za-z]+$/));
var con = mysql.createConnection({
  host: "endpoint", user: "yourusername",
  password: "yourpassword",
  port: "3306",
  database: "innodb"
});
var todaysDate = new Date();

app.post('/', function(req , res){
  console.log(req.body.date);
  if(req.body==''){
    res.send("false");
  }
  else{
    fs.appendFile('mynamefile.txt',JSON.stringify(req.body),function (err){
      if (err) throw err;
      console.log('saved!!!');
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      try{
        con.query("insert into info values(?,?,?,?)", [req.body.date,req.body.days,req.body.country,req.body.state],function (err, result) {
          console.log("Database created");
          console.log(result);
        });
      }
      catch(err){
        console.log(err);
      }
      finally{
        con.end();
      }
      });
    res.send('true');
  }
})

app.post('/letters',function(req , res){
  res.send(validletter.test(req.body.val)?"true":"false")
})

app.post('/numbers',function(req , res){
  res.send(validnumber.test(req.body.val)?"true":"false")
})

app.post('/checkcountry',function(req , res){
  res.send(req.body.val=="Select a Country"?"false":"true")
})
app.post('/checkstate',function(req , res){
  res.send(req.body.val=="Select a State"?"false":"true")
})
app.post('/checkdays',function(req , res){
  res.send((req.body.val<30)&&(req.body.val>=0)&&(validnumber.test(req.body.val))?"true":"false")
})
app.post('/checkdate',function(req , res){

  res.send(new Date(req.body.val)<todaysDate?"true":"false")
})


//start your server on port 3001
app.listen(3001, () => {
  console.log('Server started');
});