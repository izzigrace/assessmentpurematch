const { Posts } = require('../models');
const s3Functions = require('../aws/s3');
// const multer = require('multer');

// const upload = multer();

// Create a new post
exports.create = async (req, res) => {
  console.log('body: ', req.body);
  console.log('buffer: ', req.buffer);
  console.log('file: ', req.file);

  try {
    const { title, description, photo } = req.body;

    //store image in s3
    const photoURL = await s3Functions.upload(req.file);

    //post data to Posts table
    const newPost = await Posts.create({
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
    const allPosts = await Posts.findAll();

    return res.json(allPosts);
  } catch(err) {
    console.error(err);
    return res.status(500).json({message: 'Error with server'});
  }
}
