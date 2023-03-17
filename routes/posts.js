const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const s3Service = require('../aws/s3');

// router.post('/', s3Service.upload.single('picture'), postController.create);
router.post('/', postController.create);
router.get('/', postController.getAllPosts)

module.exports = router;
