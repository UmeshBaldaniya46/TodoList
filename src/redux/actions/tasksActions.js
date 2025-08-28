import {ADD_TASK, UPDATE_TASK, DELETE_TASK, DELETE_ALL_TASK} from '../types';

// Add new task
export const addTask = ({id, text, createdAt, isDelete = false}) => ({
  type: ADD_TASK,
  payload: {id, text, createdAt, isDelete},
});

// Update task text
export const updateTask = ({id, newText}) => ({
  type: UPDATE_TASK,
  payload: {id, newText},
});

// Soft delete (toggle isDelete = true)
export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

// Hard delete all
export const deleteAllTask = () => ({
  type: DELETE_ALL_TASK,
  payload: '',
});
