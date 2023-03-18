const { Comments } = require('../models');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { comment, userId, postId } = req.body;

    //post data to Comments table
    const newComment = await Comments.create({
      comment,
      userId,
      postId
    });
    return res.sendStatus(201).json(newComment);

  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json({message: 'Error commenting on post'});
  }
};

//get all posts
exports.getComments = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // finding comments with given postId using pagination
    const allComments  = await Comments.findAndCountAll({
      where: { postId: req.body.postId },
      offset: offset,
      limit: 10,
    });

    return res.sendStatus(201).json(allComments);

  } catch(err) {
    console.error(err);
    return res.sendStatus(500).json({message: 'Error fetching comments'});
  }
}
