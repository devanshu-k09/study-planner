const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// In-memory data store for tasks (since it's a beginner app)
let tasks = [
  { id: 1, title: 'Learn React', completed: true },
  { id: 2, title: 'Build a Node backend', completed: false },
  { id: 3, title: 'Connect frontend to backend', completed: false }
];

// Routes

// 1. Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(), // simple way to generate unique id
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. Update task (Mark complete/incomplete)
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex >= 0) {
    tasks[taskIndex].completed = req.body.completed;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// 4. Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
