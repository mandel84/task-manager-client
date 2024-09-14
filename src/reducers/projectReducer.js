const initialState = {
    projects: [],
    loading: false,
    error: null,
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROJECTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PROJECTS_SUCCESS':
        return { ...state, loading: false, projects: action.payload };
      case 'FETCH_PROJECTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'CREATE_PROJECT_SUCCESS':
        return { ...state, projects: [...state.projects, action.payload] };
      case 'DELETE_PROJECT_SUCCESS':
        return { ...state, projects: state.projects.filter(project => project.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  