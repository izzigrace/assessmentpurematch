const { User } = require('../models');
const { uploadPhoto } = require('../aws/s3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// register new user
exports.register = async (req, res) => {
  console.log('register req ', req.body, req.user, req.params)

  try {
    const { id, name, email, password } = req.body;
    var username;
    if (req.body.username) {
      username = req.body.username;
    } else {
      username = null;
    }

    // check if email exists in our db
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.sendStatus(409).json({ message: 'Email already linked to an account' });
    }

    // hash/encrypt password before sending
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // make a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      username
    });

    return res.sendStatus(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json({ message: 'Error registering new user' });
  }
};

// log in existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user using given email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(400).json({ message: 'Invalid credentials, email not linked to an account' });
    }

    // Compare password to password in DB
    const isPasswordTheSame = await bcrypt.compare(password, user.password);

    if (!isPasswordTheSame) {
      return res.sendStatus(400).json({ message: 'Invalid credentials, incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json({ message: 'Error logging in' });
  }
}

