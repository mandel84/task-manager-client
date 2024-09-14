import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiBaseUrl from '../apiConfig';

const ProjectDetail = () => {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Error fetching project details');
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/projects/${projectId}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks');
      }
    };

    fetchProject();
    fetchTasks();
  }, [projectId]);

  if (error) return <p>{error}</p>;
  if (!project) return <p>Loading project...</p>;

  return (
    <div className="container">
      <h2>Project: {project.name}</h2>
      <p>Description: {project.description}</p>

      <h3>Tasks:</h3>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to this project.</p>
      )}
    </div>
  );
};

export default ProjectDetail;
