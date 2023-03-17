const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
  async upload(file) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccesskey: process.env.SECRET_ACCESS_KEY,
      region: "us-west-2"
    })

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const response = await s3.upload(params).promise();
    const URL = response.Location;

    return Location;
  }
};

