const { Posts } = require('../models');
const s3Functions = require('../aws/s3');

// Create a new post
exports.create = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    //store image in s3
    const photoURL = await s3Functions.upload(req.file);

    //post data to Posts table
    const newPost = await Posts.create({
      title,
      description,
      photoURL,
      userId
    });

    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Error making post'});
  }
};

exports.uploadPhotos = async (req, res) => {
  try {
    //store image in s3
    var photoURL;
    for (let i = 0; i < req.files.length; i++) {
      photoURL = await s3Functions.upload(req.files[i]);
      await Posts.create({
        photoURL,
        postId
      });
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json({message: 'Error uploading photo'})
  }
}

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.findAll();
    return res.json(allPosts);

  } catch(err) {
    console.error(err);
    return res.status(500).json({message: 'Error fetching posts'});
  }
}
