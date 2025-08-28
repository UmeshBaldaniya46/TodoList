import {createSelector} from 'reselect';

const tasksArray = state => state.tasks.tasks;

//only non-deleted tasks
export const selectActiveTasks = createSelector([tasksArray], tasks =>
  tasks.filter(task => !task.isDelete),
);

// return task by id
export const selectTaskById = (state, id) =>
  state.tasks.tasks.find(task => task.id === id);
