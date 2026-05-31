function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      <div className="task-content">
        <label className="custom-checkbox-container">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id, task.completed)} 
          />
          <span className="checkmark"></span>
        </label>
        <span className="task-title">{task.title}</span>
      </div>
      
      <div className="task-actions">
        <button 
          className="btn btn-delete" 
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
