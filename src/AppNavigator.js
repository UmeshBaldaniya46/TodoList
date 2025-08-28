import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TodoListScreen from './screens/TodoListScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import UpdateTodoScreen from './screens/UpdateTodoScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TodoList" component={TodoListScreen} />
            <Stack.Screen name="AddTodo" component={AddTodoScreen} />
            <Stack.Screen name="UpdateTodo" component={UpdateTodoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
