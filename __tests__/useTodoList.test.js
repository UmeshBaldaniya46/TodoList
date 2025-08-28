import {renderHook, act} from '@testing-library/react-native';
import useTodoList from '../src/hooks/useTodoList';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAllTask} from '../src/redux/actions/tasksActions';
import {showConfirmDialog} from '../src/components/ConfirmDialog';
import {requireAuth} from '../src/utils';

// Mocks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../src/components/ConfirmDialog', () => ({
  showConfirmDialog: jest.fn(),
}));
jest.mock('../src/utils', () => ({
  requireAuth: jest.fn(),
}));
jest.mock('../src/redux/actions/tasksActions', () => ({
  deleteAllTask: jest.fn(),
}));

describe('useTodoList', () => {
  const dispatch = jest.fn();
  const tasksMock = [
    {id: 1, text: 'Task 1', isDelete: false},
    {id: 2, text: 'Task 2', isDelete: false},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(callback =>
      callback({
        tasks: {
          tasks: tasksMock,
        },
      }),
    );
  });

  it('should return tasks from selector', () => {
    const {result} = renderHook(() => useTodoList());
    expect(result.current.tasks).toEqual(tasksMock);
  });

  it('should show confirm dialog on handleClearAll', async () => {
    const {result} = renderHook(() => useTodoList());

    showConfirmDialog.mockImplementation(({onConfirm}) => {
      // Just test that dialog shows but don't call onConfirm yet
    });

    act(() => {
      result.current.handleClearAll();
    });

    expect(showConfirmDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete all todos?',
        confirmText: 'Delete',
        onConfirm: expect.any(Function),
      }),
    );
  });

  it('should call requireAuth and dispatch deleteAllTask if confirmed and authed', async () => {
    requireAuth.mockResolvedValue(true);
    showConfirmDialog.mockImplementation(({onConfirm}) => {
      onConfirm(); // simulate user confirming delete
    });

    const {result} = renderHook(() => useTodoList());

    await act(async () => {
      result.current.handleClearAll();
    });

    expect(requireAuth).toHaveBeenCalledWith('delete all todos');
    expect(dispatch).toHaveBeenCalledWith(deleteAllTask());
  });

  it('should NOT dispatch deleteAllTask if auth fails', async () => {
    requireAuth.mockResolvedValue(false);
    showConfirmDialog.mockImplementation(({onConfirm}) => {
      onConfirm();
    });

    const {result} = renderHook(() => useTodoList());

    await act(async () => {
      result.current.handleClearAll();
    });

    expect(requireAuth).toHaveBeenCalledWith('delete all todos');
    expect(dispatch).not.toHaveBeenCalled();
  });
});
