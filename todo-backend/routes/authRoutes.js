const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();

// Load mock DB (users.json)
const usersDB = './data/users.json';

// Register User
router.post('/register', (req, res) => {
  const { userId, password, name } = req.body;

  // Validate input (simple validation)
  if (!userId || !password || !name) {
    return res.status(400).json({ message: 'All fields (userId, password, name) are required' });
  }

  // Check if user already exists
  const users = JSON.parse(fs.readFileSync(usersDB));
  const userExists = users.find(user => user.userId === userId);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // Hash password and save new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, userId, password: hashedPassword, name };
  users.push(newUser);

  // Save user to JSON file
  fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));

  // Return success
  res.status(201).json({ message: 'User registered successfully' });
});

// Login User
router.post('/login', (req, res) => {
  const { userId, password } = req.body;

  // Validate input
  if (!userId || !password) {
    return res.status(400).json({ message: 'Both userId and password are required' });
  }

  const users = JSON.parse(fs.readFileSync(usersDB));
  const user = users.find(user => user.userId === userId);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Compare the password with the hashed password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Create JWT token
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
