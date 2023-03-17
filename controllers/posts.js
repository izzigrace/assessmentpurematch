const { Posts } = require('../models');
const s3Functions = require('../aws/s3');

// Create a new post
exports.create = async (req, res) => {

  try {
    const { title, description, photo, userId } = req.body;

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
    return res.status(500).json({message: 'Error with server'});
  }
};

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.findAll();
    return res.json(allPosts);

  } catch(err) {
    console.error(err);
    return res.status(500).json({message: 'Error with server'});
  }
}
