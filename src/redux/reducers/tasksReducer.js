import {ADD_TASK, UPDATE_TASK, DELETE_TASK, DELETE_ALL_TASK} from '../types';

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
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

    case DELETE_ALL_TASK:
      return {
        ...state,
        tasks: [],
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? {...task, isDelete: true} : task,
        ),
      };

    default:
      return state;
  }
};

export default tasksReducer;
