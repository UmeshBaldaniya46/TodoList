import {Alert} from 'react-native';

// Display the alert dialog with provided configuration
export const showConfirmDialog = ({
  title = 'Are you sure?',
  message,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmStyle = 'destructive',
}) => {
  Alert.alert(
    title,
    message,
    [
      {text: cancelText, style: 'cancel'},
      {text: confirmText, style: confirmStyle, onPress: onConfirm},
    ],
    {cancelable: true},
  );
};
