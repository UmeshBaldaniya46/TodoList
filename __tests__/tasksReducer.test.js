import tasksReducer from '../src/redux/reducers/tasksReducer';
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_ALL_TASK,
} from '../src/redux/types';

describe('tasksReducer', () => {
  const initialState = {
    tasks: [],
  };

  const sampleTask = {
    id: 1,
    text: 'Sample Task',
    createdAt: '2025-08-28T00:00:00.000Z',
    isDelete: false,
  };

  it('should return the initial state', () => {
    expect(tasksReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TASK', () => {
    const action = {
      type: ADD_TASK,
      payload: sampleTask,
    };

    const expectedState = {
      tasks: [sampleTask],
    };

    expect(tasksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_TASK', () => {
    const state = {
      tasks: [sampleTask],
    };

    const action = {
      type: UPDATE_TASK,
      payload: {
        id: 1,
        newText: 'Updated Task Text',
      },
    };

    const expectedState = {
      tasks: [
        {
          ...sampleTask,
          text: 'Updated Task Text',
        },
      ],
    };

    expect(tasksReducer(state, action)).toEqual(expectedState);
  });

  it('should handle DELETE_TASK (soft delete)', () => {
    const state = {
      tasks: [sampleTask],
    };

    const action = {
      type: DELETE_TASK,
      payload: 1,
    };

    const expectedState = {
      tasks: [
        {
          ...sampleTask,
          isDelete: true,
        },
      ],
    };

    expect(tasksReducer(state, action)).toEqual(expectedState);
  });

  it('should handle DELETE_ALL_TASK', () => {
    const state = {
      tasks: [
        sampleTask,
        {id: 2, text: 'Another', createdAt: '', isDelete: false},
      ],
    };

    const action = {
      type: DELETE_ALL_TASK,
    };

    const expectedState = {
      tasks: [],
    };

    expect(tasksReducer(state, action)).toEqual(expectedState);
  });
});
