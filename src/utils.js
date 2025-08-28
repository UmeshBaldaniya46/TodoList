import {Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Attempts to authenticate the user using device biometrics (fingerprint, face ID, etc.).
 */
export const authenticate = async () => {
  try {
    // Check if the device has biometric hardware (e.g. fingerprint sensor, Face ID)
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;

    // Check if the user has enrolled any biometric credentials
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;

    // Prompt the user for biometric authentication
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

/**
 * Wraps the biometric authentication process with a descriptive alert
 * in case the user fails or cancels the attempt.
 */
export const requireAuth = async (actionDescription = 'proceed') => {
  const authed = await authenticate();
  // If authentication failed, show an alert explaining why it's required
  if (!authed) {
    Alert.alert(
      'Authentication Failed',
      `You must authenticate to ${actionDescription}.`,
    );
    return false;
  }
  return true;
};
