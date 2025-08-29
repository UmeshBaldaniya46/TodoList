import {renderHook, act} from '@testing-library/react-native';
import useTodo from '../src/hooks/useTodo';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  updateTask,
  deleteTask,
} from '../src/redux/actions/tasksActions';
import {Alert} from 'react-native';
import {showConfirmDialog} from '../src/components/ConfirmDialog';
import {requireAuth} from '../src/utils';
import Strings from '../src/constants/strings';

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
  addTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

describe('useTodo', () => {
  const dispatch = jest.fn();
  const mockNavigation = {goBack: jest.fn()};
  const taskMock = {
    id: 1,
    text: 'Test todo',
    createdAt: new Date(),
    isDelete: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(callback =>
      callback({
        tasks: {
          tasks: [taskMock],
        },
      }),
    );
  });

  it('should return a task from selector', () => {
    const {result} = renderHook(() => useTodo(mockNavigation, 1));
    expect(result.current.task).toEqual(taskMock);
  });

  it('should show alert if todo is empty on handleAdd', async () => {
    const {result} = renderHook(() => useTodo(mockNavigation));
    await act(() => result.current.handleAdd(''));
    expect(Alert.alert).toHaveBeenCalledWith(Strings.emptyTodoAlert);
  });

  it('should dispatch addTask if todo is valid', async () => {
    requireAuth.mockResolvedValue(true);
    const {result} = renderHook(() => useTodo(mockNavigation));
    await act(() => result.current.handleAdd('New Task'));
    expect(requireAuth).toHaveBeenCalledWith('add tasks');
    expect(dispatch).toHaveBeenCalledWith(addTask({text: 'New Task'}));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should dispatch updateTask on handleSave', async () => {
    requireAuth.mockResolvedValue(true);
    const {result} = renderHook(() => useTodo(mockNavigation, 1));
    await act(() => result.current.handleSave('Updated Task'));
    expect(requireAuth).toHaveBeenCalledWith('update tasks');
    expect(dispatch).toHaveBeenCalledWith(
      updateTask({id: 1, newText: 'Updated Task'}),
    );
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should show confirm dialog and call deleteTask if confirmed', async () => {
    requireAuth.mockResolvedValue(true);
    const {result} = renderHook(() => useTodo(mockNavigation, 1));

    // Simulate onConfirm callback from dialog
    showConfirmDialog.mockImplementation(({onConfirm}) => {
      onConfirm();
    });

    await act(() => result.current.handleDelete());
    expect(requireAuth).toHaveBeenCalledWith('delete tasks');
    expect(dispatch).toHaveBeenCalledWith(deleteTask(1));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
