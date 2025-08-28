import {useDispatch, useSelector} from 'react-redux';
import {selectActiveTasks} from '../redux/selectors/tasksSelectors';
import {useCallback} from 'react';
import {showConfirmDialog} from '../components/ConfirmDialog';
import {requireAuth} from '../utils';
import {deleteAllTask} from '../redux/actions/tasksActions';

const useTodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectActiveTasks);
  console.log('Rendering TodoListScreen with tasks:', tasks);

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
  return {tasks, handleClearAll};
};

export default useTodoList;
