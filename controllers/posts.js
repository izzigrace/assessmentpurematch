const { Post } = require('../models');
const { uploadPhoto } = require('../aws/s3');


// Create a new post
exports.create = async (req, res) => {
  try {
    const { title, description, photo } = req.body;

    //store image in s3
    const photoURL = await uploadImage(photo);

    //post data to Posts table
    const newPost = await Post.create({
      title,
      description,
      photoURL,
      userId: req.user.id,
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

    const allPosts = await Post.findAll();

    return res.json(allPosts);
  } catch(err) {
    console.error(err);
    return res.status(500).json({message: 'Error with server'});
  }
}
