import {useDispatch, useSelector} from 'react-redux';
import {selectActiveTasks} from '../redux/selectors/tasksSelectors';
import {useCallback} from 'react';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {deleteAllTask} from '../redux/actions/tasksActions';

/**
 * Custom hook for managing the todo list screen logic.
 * Provides access to active tasks and a handler to clear all tasks.
 */
const useTodoList = () => {
  const dispatch = useDispatch();

  // Selects only active (non-deleted) tasks from the Redux store
  const tasks = useSelector(selectActiveTasks);

  /**
   * Handler to confirm and delete all tasks.
   * Prompts user for confirmation and checks authorization before dispatching action.
   */
  const handleClearAll = useCallback(() => {
    showConfirmDialog({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete all todos?',
      onConfirm: async () => {
        const authed = await requireAuth('delete all todos');
        if (!authed) return;
        dispatch(deleteAllTask());
      },
      confirmText: 'Delete',
    });
  }, [dispatch]);

  // Return the active tasks and the clear-all handler for use in the component
  return {tasks, handleClearAll};
};

export default useTodoList;
