const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

dotenv.config();  // Load environment variables
const app = express();

app.use(cors());  // Allow CORS (Cross-Origin Resource Sharing)
app.use(express.json());  // Parse JSON request body

// Use auth routes for handling user authentication
app.use('/api/auth', authRoutes);

// Use todo routes for handling to-do operations
app.use('/api/todos', todoRoutes);

// Global error handler middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error details to the console
  res.status(500).json({ message: 'Something went wrong!' });  // Send generic error response
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
