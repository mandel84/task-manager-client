import axios from 'axios';
import apiBaseUrl from '../apiConfig';

export const fetchProjects = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PROJECTS_REQUEST' });
  try {
    const response = await axios.get(`${apiBaseUrl}/api/projects`);
    dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PROJECTS_FAILURE', payload: error.message });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/projects`, projectData);
    dispatch({ type: 'CREATE_PROJECT_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/projects/${id}`);
    dispatch({ type: 'DELETE_PROJECT_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

