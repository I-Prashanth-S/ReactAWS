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
 accessKeyId: 'ASIAV3K2QLFHZI4HS46N',
 secretAccessKey: 'X4Bnjyrrk1lMKP6FeoQYj2h7YfYkv4eCHUPeVoRE',
 sessionToken:'FQoGZXIvYXdzEO7//////////wEaDErQsV7COjy05FxmcyL8BGELYj6qQFMdBtGEblee15JYbrsRo1VP7ZVkJyyjVsh3ohOY8xX1462U7Ys4rLs61+5xsGKDE7f06KtJOAOHKEQXKyPjrN9q344v4dxd/4yh+97TsDe7Q4mVGaXmPw3J7J/qVVFjKCHCWXJ51Ip1JcswF5RjT/VSD4CL5l0OrTtO1i8St1RJhyem00JAkYclqQrml2r5s1A+1Re90zXtdqvzLL0XAOvtk35KHZobNs9AOGDd31N8RMFXza4n7YG8pPatK4lqvpMOQkjZ9AMzwGs9zij/uaaJgHE5nZ4lr2ihVPGGnfQHSI4pc2OP1H+UkdU0lO1fCfJh145OFcf2KGEZjQ/Il4h7oVxRNLko8gFn9UyrKBCFtIxLSxmAVMFuBsPZYW1bBiw5lPE2wvEDahAXkRnwQKs9gDmj/RdwJwcIbqPyPGXxi4wKuA/Nqk17U+2gp6YOBTZ666y7bjOX2owK815aML+zjak4UQQw5Pw11eq4RqxDi4Zjjxpf9Hkv9XZtQnwN8B+7cvNwhB1bAaqffC1lCL9EHGzhOv7sF/+VVB5+0u7hOCBOvaXnf53RtPkIRodW7t6cX73qXnW5XbLaESiPiUUFh0aC67SLV2z+dtySbXb7DLZZRqlDq9Q3i9tJ+Yg319aBI7EgZFwovnckl+pYVYDZBFlWFn8K2/iOeEr3o2K7d6Iz0DOZicCKfq5H3lqbAG6uhU9tGJ8beWGaiR7IY2KeNzdzu778rPIlEIKaItseXHdhZf2jLC28YM9nA82Ibn774hOROrknCHywan8RVlcTvet9IrS6REk5i2ibkG6hHyN1EAthnPWnip7HaJ03JlG9yf57aij3i+XqBQ==',
 Bucket: 'examstore1'
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


app.listen(3001,()=>{
  console.log("Port 3001");
})

// --------------------------------------------------------
// React part
// --------------------------------------------------------

handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    if(this.state.filename!='')
  data.append( 'profileImage', this.state.filename, this.state.filename.name );
  console.log("UPLOADING IMAGE");
  axios.post( 'http://localhost:3001/img', data, {
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