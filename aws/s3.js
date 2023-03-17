const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = {
  async upload(file, key) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const { Location } = await s3.upload(params).promise();

    return Location;
  },
  async delete(key) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  },
};
