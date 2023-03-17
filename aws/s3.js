const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
  async upload(file) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY, // Access key ID
      secretAccesskey: process.env.SECRET_ACCESS_KEY, // Secret access key
      region: "us-west-2" //Region
    })

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const { Location } = await s3.upload(params).promise();

    return Location;
  }
};

