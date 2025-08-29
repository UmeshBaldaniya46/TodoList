import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {useCallback} from 'react';
import {selectTaskById} from '../redux/selectors/tasksSelectors';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {
  addTask,
  deleteTask,
  updateTask,
  Task,
} from '../redux/actions/tasksActions';
import Strings from '../constants/strings';
import {RootState, AppDispatch} from '../redux/store';

const useTodo = (navigation: any, id: number = 0) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get the specific task by ID from the Redux store
  const task = useSelector<RootState, Task | undefined>(state =>
    selectTaskById(state, id),
  );

  /**
   * Handler to delete the selected task.
   */
  const handleDelete = useCallback(() => {
    if (!task) return;

    showConfirmDialog({
      message: Strings.confirmDeleteMessage,
      onConfirm: async () => {
        const authed = await requireAuth(Strings.deleteTasks);
        if (!authed) return;
        dispatch(deleteTask(task.id) as any);
        navigation.goBack();
      },
    });
  }, [dispatch, navigation, task]);

  /**
   * Handler to save edits to an existing task.
   */
  const handleSave = useCallback(
    async (editedTodo: string) => {
      if (!task) return;
      const authed = await requireAuth(Strings.updateTasks);
      if (!authed) return;

      dispatch(updateTask({id: task.id, newText: editedTodo}) as any);
      navigation.goBack();
    },
    [dispatch, navigation, task],
  );

  /**
   * Handler to add a new task.
   */
  const handleAdd = useCallback(
    async (todo: string) => {
      if (!todo?.trim()) {
        Alert.alert(Strings.emptyTodoAlert);
        return;
      }

      const authed = await requireAuth(Strings.addTasks);
      if (!authed) return;

      dispatch(
        addTask({
          id: Date.now(),
          text: todo,
          createdAt: new Date(),
          isDelete: false,
        } as Task) as any,
      );
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  return {task, handleDelete, handleSave, handleAdd};
};

export default useTodo;
