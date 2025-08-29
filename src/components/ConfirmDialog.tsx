import {Alert, AlertButton} from 'react-native';
import Strings from '../constants/strings';

interface ConfirmDialogOptions {
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmStyle?: 'default' | 'cancel' | 'destructive';
}

// Display the alert dialog with provided configuration
export const showConfirmDialog = ({
  title = Strings.areYouSure,
  message,
  onConfirm,
  confirmText = Strings.confirm,
  cancelText = Strings.cancel,
  confirmStyle = 'destructive',
}: ConfirmDialogOptions): void => {
  const buttons: AlertButton[] = [
    {text: cancelText, style: 'cancel'},
    {text: confirmText, style: confirmStyle, onPress: onConfirm},
  ];

  Alert.alert(title, message, buttons, {cancelable: true});
};
