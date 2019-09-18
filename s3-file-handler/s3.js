import { deleteFileFormS3 } from './s3-delete-file';
import { upload } from './s3-upload-file';

const s3 = {
    delete : deleteFileFormS3,
    upload : upload,
}

export{ s3 }