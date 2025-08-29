import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import tasksReducer, {TasksState} from './reducers/tasksReducer';
import {secureStorage} from './secureStorage';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {Action, Reducer} from 'redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: 'root',
  storage: secureStorage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer) as Reducer<
  TasksState & PersistPartial,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
