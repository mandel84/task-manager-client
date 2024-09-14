import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import apiBaseUrl from '../apiConfig';

const TaskEdit = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'low' }); 

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/tasks/${id}`)
      .then(response => {
        const formattedTask = {
          ...response.data,
          dueDate: new Date(response.data.dueDate).toISOString().split('T')[0], 
          priority: response.data.priority || 'low' 
        };
        setTask(formattedTask);
      })
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.priority) {
      task.priority = 'low';
    }
    axios.put(`${apiBaseUrl}/api/tasks/${id}`, task)
      .then(() => navigate('/tasks'))
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Priority</label>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default TaskEdit;
