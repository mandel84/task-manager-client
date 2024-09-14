import { combineReducers } from 'redux';
import taskReducer from './taskReducer'; 
import projectReducer from './projectReducer';// Import your task reducer


const rootReducer = combineReducers({
projects: projectReducer,
tasks: taskReducer,  
});

export default rootReducer;
