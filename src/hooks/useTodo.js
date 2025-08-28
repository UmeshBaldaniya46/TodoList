import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {selectTaskById} from '../redux/selectors/tasksSelectors';
import {useCallback} from 'react';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {addTask, deleteTask, updateTask} from '../redux/actions/tasksActions';

/**
 * Custom hook to manage todo-related operations like add, update, and delete.
 *
 */
const useTodo = (navigation, id = 0) => {
  const dispatch = useDispatch();

  // Get the specific task by ID from the Redux store
  const task = useSelector(state => selectTaskById(state, id));

  /**
   * Handler to delete the selected task.
   * Prompts for confirmation, then checks auth before dispatching delete action.
   */
  const handleDelete = useCallback(() => {
    showConfirmDialog({
      message: 'Are you sure you want to delete this todo?',
      onConfirm: async () => {
        const authed = await requireAuth('delete tasks');
        if (!authed) return;
        dispatch(deleteTask(task.id));
        // Return to the previous screen after deletion
        navigation.goBack();
      },
    });
  }, [dispatch, navigation, task]);

  /**
   * Handler to save edits to an existing task.
   * Checks authorization before dispatching the update action.
   */
  const handleSave = useCallback(
    async editedTodo => {
      const authed = await requireAuth('update tasks');
      if (!authed) return;
      dispatch(updateTask({id: task.id, newText: editedTodo}));
      // Navigate back after saving
      navigation.goBack();
    },
    [dispatch, navigation, task],
  );

  /**
   * Handler to add a new task.
   * Validates input, checks authorization, and dispatches the add action.
   */
  const handleAdd = useCallback(
    async todo => {
      if (todo == null || todo === '') {
        // Show alert for empty input
        Alert.alert('Please enter a todo');
        return;
      }
      const authed = await requireAuth('add tasks');
      if (!authed) return;

      dispatch(
        addTask({
          id: Date.now(),
          text: todo,
          createdAt: new Date(),
          isDelete: false,
        }),
      );
      // Go back after adding
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  // Return task data and handler functions for use in the component
  return {task, handleDelete, handleSave, handleAdd};
};

export default useTodo;
