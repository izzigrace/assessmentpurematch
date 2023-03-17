const express = require('express');
const app = express();
const { sequelize } = require('./models');

const port = 3000;

const authRoutes = require('./routes/auth.js');
const postRoutes = require('./routes/posts.js');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(process.env.DB_PORT || 3333, () => {
      console.log(`Server running on port ${process.env.DB_PORT || 3333}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log('Server started on port 3000');
});


