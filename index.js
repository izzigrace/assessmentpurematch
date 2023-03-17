const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');
const { Sequelize } = require('sequelize');
const router = express.Router();
require('dotenv').config();
const port = 3000;
const postController = require('./controllers/posts.js');
const authController = require('./controllers/auth.js');
app.use(cors());
app.use(express.json());



// app.post('/', (req, res) => {
//   res.send('POST request to the homepage')
// });
// app.get('/', (req, res) => {
//   res.send('get happened')
// })

app.post('/login', authController.login);
app.post('/register', authController.register);
app.post('/makePost', postController.create);
app.get('/getPosts', postController.getAllPosts);


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


