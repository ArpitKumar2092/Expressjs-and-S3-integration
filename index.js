import express from 'express';
import { s3 } from './s3-file-handler/s3';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());


/// Just for quick setup
const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Node.JS File Upload</title>
  </head>
  <body>
    <form class="fileupload" action="image-upload" method="post" enctype="multipart/form-data">
      <h1>Upload File Here</h1>
      <input type="file" name="image" value="">
      <input type="submit" />
    </form>
  </body>
</html>`;


const singleUpload = s3.upload.single('image');
app.get('/' , function(req , res){
  res.send(html);
});
app.post('/image-upload', function(req, res) {
  singleUpload(req, res, function(err) {

    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
});
app.get('/delete' , function(req , res){
  //  give file name to test this one 
  // for example
  //  this is your uploaded file  ---->   https://tripen-pesto.s3.ap-south-1.amazonaws.com/1568812515109.jpg
  // then this would be your file name     ---->   1568812515109.jpg
  
  s3.delete('FILE_NAME').then((data)=>{
    console.log(data);
    res.send('ok');
  }).catch((err)=>{
    res.send('error');
    console.log(err);
  });
})

app.listen(80 ,()=> {console.log('listening to port 80')});


