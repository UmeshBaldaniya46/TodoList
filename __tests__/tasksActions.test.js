import {
  addTask,
  updateTask,
  deleteTask,
  deleteAllTask,
} from '../src/redux/actions/tasksActions';
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_ALL_TASK,
} from '../src/redux/types';

describe('tasksActions', () => {
  it('should create an ADD_TASK action', () => {
    const action = addTask({
      id: 1,
      text: 'New Task',
      createdAt: '2025-08-28T00:00:00.000Z',
    });

    expect(action).toEqual({
      type: ADD_TASK,
      payload: {
        id: 1,
        text: 'New Task',
        createdAt: '2025-08-28T00:00:00.000Z',
        isDelete: false,
      },
    });
  });

  it('should create an ADD_TASK action with custom isDelete', () => {
    const action = addTask({
      id: 2,
      text: 'Another Task',
      createdAt: '2025-08-28T00:00:00.000Z',
      isDelete: true,
    });

    expect(action).toEqual({
      type: ADD_TASK,
      payload: {
        id: 2,
        text: 'Another Task',
        createdAt: '2025-08-28T00:00:00.000Z',
        isDelete: true,
      },
    });
  });

  it('should create an UPDATE_TASK action', () => {
    const action = updateTask({id: 1, newText: 'Updated Task'});

    expect(action).toEqual({
      type: UPDATE_TASK,
      payload: {
        id: 1,
        newText: 'Updated Task',
      },
    });
  });

  it('should create a DELETE_TASK action', () => {
    const action = deleteTask(1);

    expect(action).toEqual({
      type: DELETE_TASK,
      payload: 1,
    });
  });

  it('should create a DELETE_ALL_TASK action', () => {
    const action = deleteAllTask();

    expect(action).toEqual({
      type: DELETE_ALL_TASK,
      payload: '',
    });
  });
});
