import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiBaseUrl from '../apiConfig';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        setError('Error fetching projects');
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>No projects available.</p>;

  return (
    <div className="container">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <h4>Tasks:</h4>
            {project.Tasks && project.Tasks.length > 0 ? (
              <ul>
                {project.Tasks.map((task) => (
                  <li key={task.id}>
                    {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()} - Priority: {task.priority}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks available for this project.</p>
            )}
            <Link to={`/projects/${project.id}`}>View Project</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
