const Todo = require('../models/Todo');
const { v4: uuidv4 } = require('uuid'); // Untuk membuat kegiatan unik nomor

// Create a Todo
const createTodo = async (req, res) => {
  const { subject, description } = req.body;
  const activities_no = `AC-${uuidv4().slice(0, 4).toUpperCase()}`;
  try {
    const newTodo = new Todo({
      subject,
      description,
      activities_no,
      userId: req.userId,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Todos for a user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark Todo as Done/Cancel/Unmarked
const updateTodoStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.status = status;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  const { subject, description } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.status !== 'Unmarked') return res.status(400).json({ message: 'Invalid status for modification' });

    todo.subject = subject;
    todo.description = description;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.status !== 'Unmarked') return res.status(400).json({ message: 'Invalid status for deletion' });

    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTodo, getTodos, updateTodoStatus, updateTodo, deleteTodo };
