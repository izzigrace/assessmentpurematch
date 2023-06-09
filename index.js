const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const port = process.env.PORT;
const postController = require('./controllers/posts.js');
const authController = require('./controllers/auth.js');
const commentController = require('./controllers/comments.js');
app.use(cors());
app.use(express.json());

const multer = require('multer');
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// auth routes
app.post('/login', authController.login);
app.post('/register', authController.register);
//posts routes
app.post('/makePost', upload.array('photos', 5), postController.uploadPhotos, postController.createPost);
app.get('/getPosts', postController.getAllPosts);
app.post('/editPost', postController.editPost)
//comments routes
app.post('/comment', commentController.createComment);
app.get('/comment', commentController.getComments);


//check sequelize connection to database
sequelize
  .authenticate()  //returns a promise
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(port, () => {
  console.log('Server started on port 3000');
});

