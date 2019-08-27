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
 accessKeyId: 'ASIAX62GXFY3YKV4OX5M',
 secretAccessKey: 'ca/ng6wsibLxDpj466UOO8FAvp4Jipmm7c1nDepT',
 sessionToken:'FQoGZXIvYXdzEBMaDLSrcBBrypv3aO7l6yKSA1jJY9xvR1wLA+MbaO85CJbgfsj0WMyKbJLwuA9urYzRlCdNxzvchj8bXo431qpYkMFWkqlw+p3qA4yPc957y7VeoN25iO/DZNXCc4I5yiXIkpANuWHgfoQ80Q7xDZOm1EykGHsLDqt4Fd6GV4pxg7iKf50AJUNJivrYtKBw0jyOGF8iwXFKy6AFJLfbNhd36cagSVrmQJ5oIgOz/7KPOwjHRwcvqjmJi7YJiXDGJNWQf2TY/gPl0CRCzpCz/Q7LX5Uw8AzJ3L8W9kYTqEC+/k8o4fippViwB8Kl2Vc+a5VwBPMWnb1bjLASPpruC7A3ThaTHEum0bpNB8ditusvB5kQ1BbHsDc4lw1HU4+IC8GtbT4AKFkkADuHyZcKAL/qVPGNYicJTf5PY6ONdhrvcQKRjl5anK/pNl2x4N37Wi+bq6dd8FW4+JsCFPHpnyRMGNfhTK9aLdV1JqnkCxZRp8Y8q1/JdwK+7p6YbSmL6S5ZCX+lHTaCMrAeOuNCyx940M578wjuHtKMb25A5R5LQRtqzyiJgLXqBQ==',
 Bucket: 'cloud337'
});




const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'cloud337',
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


app.listen(3001,()=>{
  console.log("Port 3001");
})