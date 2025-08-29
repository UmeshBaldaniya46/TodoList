import {Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Strings from './constants/strings';

/**
 * Attempts to authenticate the user using device biometrics (fingerprint, face ID, etc.).
 */
export const authenticate = async (): Promise<boolean> => {
  try {
    // Check if the device has biometric hardware
    const compatible: boolean = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;

    // Check if user has enrolled biometric data
    const enrolled: boolean = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;

    // Prompt the user for biometric authentication
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: Strings.continueToAuthenticate,
      fallbackLabel: Strings.enterPasscode,
      cancelLabel: Strings.cancel,
    });

    return result.success;
  } catch (err) {
    console.error('Auth error:', err);
    return false;
  }
};

/**
 * Wraps the biometric authentication process with an alert
 * if the user fails or cancels authentication.
 */
export const requireAuth = async (
  actionDescription: string = 'proceed',
): Promise<boolean> => {
  const authed = await authenticate();

  if (!authed) {
    Alert.alert(
      Strings.authenticationFailed,
      `You must authenticate to ${actionDescription}.`,
    );
    return false;
  }
  return true;
};
