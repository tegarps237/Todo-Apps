const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Unmarked', 'Done', 'Canceled'], default: 'Unmarked' },
  activities_no: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
