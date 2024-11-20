const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken'); // <-- Add this line to import jsonwebtoken
const router = express.Router();

// Load mock DB (todos.json)
const todosDB = './data/todos.json';

// Middleware untuk autentikasi (memeriksa token JWT)
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // <-- This line will work now
    req.userId = decoded.userId;  // Attach userId to the request object
    next();  // Move to the next middleware/route
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });  // Error if token is invalid
  }
};

// Create a new To-Do
router.post('/', authMiddleware, (req, res) => {
  const { subject, description } = req.body;

  // Create new To-Do object
  const newTodo = { id: Date.now(), userId: req.userId, subject, description, status: 'unmarked' };

  // Read existing todos from the file, add the new To-Do and save back to the file
  const todos = JSON.parse(fs.readFileSync(todosDB));
  todos.push(newTodo);
  fs.writeFileSync(todosDB, JSON.stringify(todos, null, 2));

  // Respond with the newly created To-Do
  res.status(201).json(newTodo);
});

// Get all To-Dos for the user
router.get('/', authMiddleware, (req, res) => {
  // Read todos from the mock database (todos.json)
  const todos = JSON.parse(fs.readFileSync(todosDB));

  // Filter todos by the userId to only get the current user's tasks
  const userTodos = todos.filter(todo => todo.userId === req.userId);
  res.json(userTodos);  // Respond with filtered todos
});

// Update To-Do status
router.patch('/:id', authMiddleware, (req, res) => {
  const { status } = req.body;

  // Read todos from the mock database (todos.json)
  const todos = JSON.parse(fs.readFileSync(todosDB));

  // Find the specific todo by ID and userId
  const todo = todos.find(t => t.id === parseInt(req.params.id) && t.userId === req.userId);
  if (!todo) return res.status(404).json({ message: 'To-Do not found' });

  // Update the status of the todo
  todo.status = status;

  // Save the updated todos back to the mock database
  fs.writeFileSync(todosDB, JSON.stringify(todos, null, 2));

  res.json(todo);  // Respond with the updated todo
});

// Delete a To-Do
router.delete('/:id', authMiddleware, (req, res) => {
  // Read todos from the mock database (todos.json)
  const todos = JSON.parse(fs.readFileSync(todosDB));

  // Find the index of the todo to delete by ID and userId
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id) && t.userId === req.userId);
  if (todoIndex === -1) return res.status(404).json({ message: 'To-Do not found' });

  // Remove the todo from the list
  todos.splice(todoIndex, 1);

  // Save the updated todos list back to the mock database
  fs.writeFileSync(todosDB, JSON.stringify(todos, null, 2));

  res.json({ message: 'To-Do deleted successfully' });  // Respond with success message
});

module.exports = router;
