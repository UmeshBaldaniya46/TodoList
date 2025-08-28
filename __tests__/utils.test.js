import {authenticate, requireAuth} from '../src/utils';
import {Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('returns false if device has no compatible hardware', async () => {
      LocalAuthentication.hasHardwareAsync.mockResolvedValue(false);
      const result = await authenticate();
      expect(result).toBe(false);
    });

    it('returns false if no biometrics are enrolled', async () => {
      LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
      LocalAuthentication.isEnrolledAsync.mockResolvedValue(false);
      const result = await authenticate();
      expect(result).toBe(false);
    });

    it('returns true on successful authentication', async () => {
      LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
      LocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
      LocalAuthentication.authenticateAsync.mockResolvedValue({success: true});

      const result = await authenticate();
      expect(result).toBe(true);
    });

    it('returns false on failed authentication', async () => {
      LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
      LocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
      LocalAuthentication.authenticateAsync.mockResolvedValue({success: false});

      const result = await authenticate();
      expect(result).toBe(false);
    });

    it('catches and logs error', async () => {
      console.error = jest.fn();
      LocalAuthentication.hasHardwareAsync.mockRejectedValue(
        new Error('Test error'),
      );

      const result = await authenticate();
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        'Auth error:',
        expect.any(Error),
      );
    });
  });

  describe('requireAuth', () => {
    it('returns true if authentication succeeds', async () => {
      jest
        .spyOn(LocalAuthentication, 'hasHardwareAsync')
        .mockResolvedValue(true);
      jest
        .spyOn(LocalAuthentication, 'isEnrolledAsync')
        .mockResolvedValue(true);
      jest
        .spyOn(LocalAuthentication, 'authenticateAsync')
        .mockResolvedValue({success: true});

      const result = await requireAuth('test action');
      expect(result).toBe(true);
    });

    it('alerts and returns false if authentication fails', async () => {
      jest
        .spyOn(LocalAuthentication, 'hasHardwareAsync')
        .mockResolvedValue(true);
      jest
        .spyOn(LocalAuthentication, 'isEnrolledAsync')
        .mockResolvedValue(true);
      jest
        .spyOn(LocalAuthentication, 'authenticateAsync')
        .mockResolvedValue({success: false});

      const result = await requireAuth('test action');
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Authentication Failed',
        'You must authenticate to test action.',
      );
    });
  });
});
