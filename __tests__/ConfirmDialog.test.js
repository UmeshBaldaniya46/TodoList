// ConfirmDialog.test.js
import {Alert} from 'react-native';
import { showConfirmDialog } from '../src/components/ConfirmDialog';

describe('showConfirmDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls Alert.alert with correct parameters', () => {
    const onConfirmMock = jest.fn();

    // Mock Alert.alert
    jest.spyOn(Alert, 'alert');

    showConfirmDialog({
      title: 'Delete Task?',
      message: 'Are you sure you want to delete this task?',
      onConfirm: onConfirmMock,
      confirmText: 'Yes',
      cancelText: 'No',
      confirmStyle: 'destructive',
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Task?',
      'Are you sure you want to delete this task?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', style: 'destructive', onPress: onConfirmMock},
      ],
      {cancelable: true},
    );
  });

  it('uses default values when not provided', () => {
    jest.spyOn(Alert, 'alert');
    const onConfirmMock = jest.fn();

    showConfirmDialog({
      message: 'Proceed with action?',
      onConfirm: onConfirmMock,
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Are you sure?',
      'Proceed with action?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', style: 'destructive', onPress: onConfirmMock},
      ],
      {cancelable: true},
    );
  });
});
