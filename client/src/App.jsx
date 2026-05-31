import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Could not connect to the server. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Add a new task
  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
      alert('Error adding task');
    }
  };

  // 3. Toggle task completion status
  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      console.error(err);
      alert('Error updating task');
    }
  };

  // 4. Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting task');
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Study Planner</h1>
        <p>Organize your learning journey</p>
      </header>

      <div className="task-stats" style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--card-bg, #f9f9f9)', borderRadius: '8px', border: '1px solid var(--border-color, #eee)' }}>
        {totalCount > 0 ? (
          <p style={{ margin: 0 }}>You have completed <strong>{completedCount}</strong> out of <strong>{totalCount}</strong> tasks!</p>
        ) : (
          <p style={{ margin: 0 }}>Ready to start studying? Add a task below!</p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <TaskForm onAdd={addTask} />

      {loading ? (
        <div className="loading">Loading your tasks...</div>
      ) : (
        <TaskList 
          tasks={tasks} 
          onToggle={toggleComplete} 
          onDelete={deleteTask} 
        />
      )}
    </div>
  );
}

export default App;
