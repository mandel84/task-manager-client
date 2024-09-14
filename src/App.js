import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';// Import ProjectList (if you have one)
import ProjectEdit from './components/ProjectEdit'; // Import ProjectEdit component
import TaskForm from './components/TaskForm';  // Form for creating tasks
import ProjectDetail from './components/ProjectDetail';
import './App.css';


const App = () => (
  <Router>
    <Routes>
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/new-task" element={<TaskForm />} />
      <Route path="/projects/:projectId/new-task" element={<TaskForm />} />
      <Route path="/tasks/edit/:id" element={<TaskEdit />} /> {/* Edit task route */}
      <Route path="/projects" element={<ProjectList />} /> {/* Project list route */}
      <Route path="/projects/edit/:id" element={<ProjectEdit />} /> {/* Edit project route */}
      <Route path="/new-project" element={<ProjectForm />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />

      





    </Routes>
  </Router>
);

export default App;
