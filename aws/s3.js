const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-west-2"
})

const s3 = new AWS.S3();

module.exports = {
  async upload(file) {

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const param = {
      Bucket: process.env.AWS_BUCKET_NAME
    }

    s3.listObjects(param, (err, data) => {
      if (err) {
        console.log(err);
        console.log('error with s3 connection')
      } else {
        console.log('S3 connection successful')
      }
    })

    const response = await s3.upload(params).promise();
    const URL = response.Location;

    return URL;
  }
};

