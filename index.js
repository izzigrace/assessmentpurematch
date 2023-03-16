const express = require('express');
const app = express();
const { sequelize } = require('./models');

const port = 3000;

app.get('/', (req, res) => {
  console.log(req.params);
  console.log(res);
  res.send('Hello World!');

});

app.listen(port, () => {
  console.log('Server started on port 3000');
});