import { combineReducers } from 'redux';
import taskReducer from './taskReducer'; 
import projectReducer from './projectReducer';


const rootReducer = combineReducers({
projects: projectReducer,
tasks: taskReducer,  
});

export default rootReducer;
