import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../actions/projectActions';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [project, setProject] = useState({ name: '', description: '', dueDate: '', priority: 'low' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(project));
    navigate('/projects');
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
  onChange={(e) => setProject({ ...project, priority: parseInt(e.target.value) })}
  required
>
  <option value={1}>Low</option>
  <option value={2}>Medium</option>
  <option value={3}>High</option>
</select>
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
