import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../actions/taskActions';
import { Link } from 'react-router-dom'; 

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <Link to={`/tasks/edit/${task.id}`} className="btn btn-edit">
            Edit
          </Link>
          <button onClick={() => dispatch(deleteTask(task.id))} className="btn btn-delete">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

