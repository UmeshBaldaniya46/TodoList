import {ADD_TASK, UPDATE_TASK, DELETE_TASK, DELETE_ALL_TASK} from '../types';

export interface Task {
  id: number;
  text: string;
  createdAt: Date;
  isDelete: boolean;
}

export interface TasksState {
  tasks: Task[];
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: {
    id: number;
    newText: string;
  };
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

interface DeleteAllTaskAction {
  type: typeof DELETE_ALL_TASK;
}

type TaskActionTypes =
  | AddTaskAction
  | UpdateTaskAction
  | DeleteTaskAction
  | DeleteAllTaskAction;

const initialState: TasksState = {
  tasks: [],
};

const tasksReducer = (
  state = initialState,
  action: TaskActionTypes,
): TasksState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? {...task, text: action.payload.newText}
            : task,
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? {...task, isDelete: true} : task,
        ),
      };

    case DELETE_ALL_TASK:
      return {
        ...state,
        tasks: [],
      };

    default:
      return state;
  }
};

export default tasksReducer;
