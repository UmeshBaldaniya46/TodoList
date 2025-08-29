import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {deleteAllTask} from '../redux/actions/tasksActions';
import Strings from '../constants/strings';
import {selectActiveTasks} from '../redux/selectors/tasksSelectors';
import {RootState, AppDispatch} from '../redux/store';
import {Task} from '../redux/actions/tasksActions';

/**
 * Custom hook for managing the todo list screen logic.
 * Provides access to active tasks and a handler to clear all tasks.
 */
const useTodoList = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select only active (non-deleted) tasks from Redux store
  const tasks = useSelector<RootState, Task[]>(selectActiveTasks);

  /**
   * Handler to confirm and delete all tasks.
   * Prompts user for confirmation and checks authorization before dispatching action.
   */
  const handleClearAll = useCallback(() => {
    showConfirmDialog({
      title: Strings.confirmDeleteTitle,
      message: Strings.confirmDeleteAllMessage,
      onConfirm: async () => {
        const authed = await requireAuth(Strings.deleteAllTodos);
        if (!authed) return;
        dispatch(deleteAllTask() as any);
      },
      confirmText: Strings.delete,
    });
  }, [dispatch]);

  return {tasks, handleClearAll};
};

export default useTodoList;
