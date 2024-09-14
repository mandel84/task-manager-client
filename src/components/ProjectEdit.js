import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import apiBaseUrl from '../apiConfig';

const ProjectEdit = () => {
  const { id } = useParams();
  const [project, setProject] = useState({ name: '', description: '', dueDate: '', priority: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${apiBaseUrl}/api/projects/${id}`, project)
      .then(() => navigate('/projects'))
      .catch(error => console.error('Error updating project:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Name</label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={project.dueDate}
          onChange={(e) => setProject({ ...project, dueDate: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Priority</label>
        <select
          value={project.priority}
          onChange={(e) => setProject({ ...project, priority: e.target.value })}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Update Project</button>
    </form>
  );
};

export default ProjectEdit;
