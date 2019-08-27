const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
const s3 = new aws.S3({
  accessKeyId: 'ASIAV3K2QLFHUJG6XGPG',
  secretAccessKey: 'Bs8v5u6aO5hV7k4F/Kw3uD/yzkQA0WW0QifWnQdT',
  sessionToken:'FQoGZXIvYXdzEAMaDC02dA+s67tDEYMPiiL8BLaGf9BQJFVmMsR+W4lRsImKAQ4+2DUWX8Vnd3+J3ztrll5msqe6lQpcRSeU0DfovoA3tTU8J1e8vpw4IR27l5WKBxY3HtZjMzQ80K6CyRT6GFsFZxHoKy27v4HYRzUKgfBuAZ0SOgWvbzreV4fzvNOqBDMdstq1cXfs3/fH7v6lvpc0JweXRwglXY39HoKGmINCgBs6aENxiRF8WB01auhHig/yi6m7Iwn1Ue9SK6VN3FCk6FvzDIDZ80UQUCW2iiUB+nPb9r6SI9jQ6++OLF/J3Os/+uaJiRJ+qpEqqqJ/HgdhYn+RAjSjjPoImEB+yFYkbFdvI1EaJgimynYQ7k/CcMDZDvIVAQZRhcwAzfLnI5566tYQNBpqrQlFzTle+EIFK9ZvvPXEpj+eEcCRAQI+ZnYMmWEXkd/mzc/v3GP1STVULXtMkRqXP9Hk31flxCU3EfEQaT1P2g0m1Upslh4/U9G1KqoY6D98eg7RQLBntX6BbgVKjnvTJYZE66uQv2NW49rnCV50iXRfcT2/utX3VxuJ92rDZNpmPLXe176dnz/uvcT7llhD9j0BwxTRsdx+0I1YqzGhgog/llMzvx7OnDVRE5oEenGxf3Jz0AXZRY75ikqcSW7VaCUhaZaQmr4QsQ9ezxyjGBIrmDBrAQMKvJ47ZBYBjM+TjxwY1pBrhI4YgC4eSLc4KnCRoR7BxRLyUsQomWGBggnI52RJPMPSroRLBsJnKBYMvZ77YlRi/uXKJlnmxupu5enEQmNMNunPEb5ZNMoCoxYFXRKEm2Pfrb9myqP+yxdctCGYRzf6uxyxq4x58eUY2GM5QDMCZpdYw4SJQi69TdBVWCj63OnqBQ==',
  Bucket: 'examstore1'
 });
 
 

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
  con.query("Select * from data2", function (err, result, fields) {
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



const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'examstore1',
   // acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 }).single('profileImage');
 
 
 
 
 app.get('*',(req,res)=>{
   res.json('OK');
 })
 
 
 app.post('/img',(req,res)=>{
 
 profileImgUpload( req, res, ( error ) => {
   // console.log( 'requestOkokok', req.file );
   // console.log( 'error', error );
   if( error ){
    console.log( 'errors', error );
    res.json( { error: error } );
   } else {
    // If File not found
    if( req.file === undefined ){
     console.log( 'Error: No File Selected!' );
     res.json( 'Error: No File Selected' );
    } else {
     // If Success
     const imageName = req.file.key;
     const imageLocation = req.file.location;
 // Save the file name into database into profile model
     res.json( {
      image: imageName,
      location: imageLocation
     } );
    }
   }
  });
 
 
 });
 


app.get('*',(req,res)=>{
  res.json('OK');
})



app.post('/',(req,res)=>{
	console.log('pos');
  var {productname,Shipzip,Phno}=req.body;
 // console.log(name);
 //console.log(req.body);
  var xtra="";
  var records = [[req.body.productname,req.body.Shipzip,req.body.Phno]];
//console.log(records)
if(records[0][0]!=null)
{
  con.query("INSERT INTO data2 (productname,Shipzip,Phno) VALUES ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });

}

})


app.listen(3005,()=>{
  console.log("Port 3005");
})
