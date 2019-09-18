import aws from 'aws-sdk';
import { config } from './config';

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS,
    accessKeyId: config.AWS_ACCESS_KEY
});

const s3 = new aws.S3();



const deleteFileFormS3 = ( fileKey ) =>{

    // key  ==  file name as saved on s3
    return new Promise( (resolve , reject)=>{
        const params = {
            Bucket: config.S3_BUCKET_NAME, 
            Key: fileKey
        };
        s3.deleteObject(params, function(err, data) {
            console.log(err , data )
            if (err) {
                reject(err , err.stack);
            }else{
                resolve( data );
            }          
          });
    });
}

export{
    deleteFileFormS3
}