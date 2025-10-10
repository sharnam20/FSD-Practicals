import React, { useState, useEffect } from "react";
import "./Practical6.css";

const Practical6 = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState('all');

  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,

        priority: 'medium',
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const setPriority = (id, priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getStats();
  const filteredTasks = getFilteredTasks();

  return (
    <div className={`todo-app ${theme}`}>
      <div className="todo-header">
        <h1>📝 Smart Todo App</h1>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <form onSubmit={addTask} className="todo-form">
        <div className="form-row">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="todo-add">➕ Add</button>
        </div>
      </form>

      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Done
          </button>
        </div>
      </div>

      <div className="todo-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No tasks found</p>
            <small>Add a task to get started!</small>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <div className="task-info">
                  <span className="task-text">{task.text}</span>
                  <div className="task-meta">
                    <select 
                      value={task.priority || 'medium'}
                      onChange={(e) => setPriority(task.id, e.target.value)}
                      className="priority-select"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {tasks.filter(task => task.completed).length > 0 && (
        <div className="bottom-actions">
          <button 
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
            className="clear-completed"
          >
            🧹 Clear Completed ({tasks.filter(task => task.completed).length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Practical6;