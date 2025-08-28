import {Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export const authenticate = async () => {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
      fallbackLabel: 'Enter Passcode',
      cancelLabel: 'Cancel',
    });

    return result.success;
  } catch (err) {
    console.error('Auth error:', err);
    return false;
  }
};

export const requireAuth = async (actionDescription = 'proceed') => {
  const authed = await authenticate();
  if (!authed) {
    Alert.alert(
      'Authentication Failed',
      `You must authenticate to ${actionDescription}.`,
    );
    return false;
  }
  return true;
};
