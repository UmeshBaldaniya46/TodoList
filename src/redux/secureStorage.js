import * as SecureStore from 'expo-secure-store';

const sanitizeKey = (key) => key.replace(/[^a-zA-Z0-9._-]/g, '_');

export const secureStorage = {
  setItem: async (key, value) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.setItemAsync(safeKey, value);
  },

  getItem: async (key) => {
    const safeKey = sanitizeKey(key);
    return await SecureStore.getItemAsync(safeKey);
  },

  removeItem: async (key) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(safeKey);
  },
};
