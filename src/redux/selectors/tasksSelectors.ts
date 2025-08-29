import {createSelector} from 'reselect';
import {RootState} from '../store';
import {Task} from '../actions/tasksActions';

const tasksArray = (state: RootState): Task[] => state.tasks.tasks;

// Only non-deleted tasks
export const selectActiveTasks = createSelector([tasksArray], tasks =>
  tasks.filter(task => !task.isDelete),
);

// Return task by id
export const selectTaskById = (
  state: RootState,
  id: number,
): Task | undefined => state.tasks.tasks.find(task => task.id === id);
