import {
  selectActiveTasks,
  selectTaskById,
} from '../src/redux/selectors/tasksSelectors';

describe('tasksSelectors', () => {
  const sampleTasks = [
    {id: 1, text: 'Task 1', isDelete: false},
    {id: 2, text: 'Task 2', isDelete: true},
    {id: 3, text: 'Task 3', isDelete: false},
  ];

  const state = {
    tasks: {
      tasks: sampleTasks,
    },
  };

  describe('selectActiveTasks', () => {
    it('should return only tasks that are not deleted', () => {
      const result = selectActiveTasks(state);
      expect(result).toEqual([
        {id: 1, text: 'Task 1', isDelete: false},
        {id: 3, text: 'Task 3', isDelete: false},
      ]);
    });

    it('should return empty array if all tasks are deleted', () => {
      const allDeletedState = {
        tasks: {
          tasks: sampleTasks.map(task => ({...task, isDelete: true})),
        },
      };

      const result = selectActiveTasks(allDeletedState);
      expect(result).toEqual([]);
    });
  });

  describe('selectTaskById', () => {
    it('should return the task with the given ID', () => {
      const task = selectTaskById(state, 1);
      expect(task).toEqual({id: 1, text: 'Task 1', isDelete: false});
    });

    it('should return undefined if task with given ID does not exist', () => {
      const task = selectTaskById(state, 99);
      expect(task).toBeUndefined();
    });
  });
});
