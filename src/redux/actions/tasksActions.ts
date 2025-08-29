import {ADD_TASK, UPDATE_TASK, DELETE_TASK, DELETE_ALL_TASK} from '../types';

export interface Task {
  id: number;
  text: string;
  createdAt: Date;
  isDelete?: boolean;
}

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: {
    id: number;
    newText: string;
  };
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface DeleteAllTaskAction {
  type: typeof DELETE_ALL_TASK;
  payload: string;
}

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (payload: {
  id: number;
  newText: string;
}): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload,
});

export const deleteTask = (id: number): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: id,
});

export const deleteAllTask = (): DeleteAllTaskAction => ({
  type: DELETE_ALL_TASK,
  payload: '',
});
