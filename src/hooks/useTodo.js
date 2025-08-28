import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {selectTaskById} from '../redux/selectors/tasksSelectors';
import {useCallback} from 'react';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {addTask, deleteTask, updateTask} from '../redux/actions/tasksActions';

const useTodo = (navigation, id = 0) => {
  const dispatch = useDispatch();
  const task = useSelector(state => selectTaskById(state, id));

  const handleDelete = useCallback(() => {
    showConfirmDialog({
      message: 'Are you sure you want to delete this todo?',
      onConfirm: async () => {
        const authed = await requireAuth('delete tasks');
        if (!authed) return;
        dispatch(deleteTask(task.id));
        navigation.goBack();
      },
    });
  }, [dispatch, navigation, task]);

  const handleSave = useCallback(async (editedTodo) => {
    const authed = await requireAuth('update tasks');
    if (!authed) return;
    dispatch(updateTask({id: task.id, newText: editedTodo}));
    navigation.goBack();
  }, [dispatch, navigation, task]);

  const handleAdd = useCallback(
    async todo => {
      if (todo == null || todo === '') {
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
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  return {task, handleDelete, handleSave, handleAdd};
};

export default useTodo;
