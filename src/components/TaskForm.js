import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '../apiConfig';


const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'low', projectId: '' });
  const [projects, setProjects] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formattedDueDate = formatDateForInput(task.dueDate);
      console.log('Submitting task:', task);
      await axios.post(`${apiBaseUrl}/api/tasks`, task);
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Title:</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={task.dueDate ? formatDateForInput(task.dueDate) : ''}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Priority:</label>
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
      <div>
        <label>Assign to Project:</label>
        <select
          value={task.projectId}
          onChange={(e) => setTask({ ...task, projectId: e.target.value })}
        >
          <option value="">None</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};



export default TaskForm;
