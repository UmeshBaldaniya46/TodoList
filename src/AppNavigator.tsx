import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import TodoListScreen from './screens/TodoListScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import UpdateTodoScreen from './screens/UpdateTodoScreen';
import CustomHeader from './components/CustomHeader';
import Strings from './constants/strings';
import {store, persistor} from './redux/store';

// Navigation types
import {RootStackParamList} from './constants/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({route, navigation}): StackNavigationOptions => ({
              header: () => (
                <CustomHeader
                  title={getTitleForRoute(route.name)}
                  canGoBack={navigation.canGoBack()}
                />
              ),
            })}>
            <Stack.Screen
              name={Strings.Screens.TODO_LIST as keyof RootStackParamList}
              component={TodoListScreen}
            />
            <Stack.Screen
              name={Strings.Screens.ADD_TODO as keyof RootStackParamList}
              component={AddTodoScreen}
            />
            <Stack.Screen
              name={Strings.Screens.UPDATE_TODO as keyof RootStackParamList}
              component={UpdateTodoScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

function getTitleForRoute(routeName: string): string {
  switch (routeName) {
    case Strings.Screens.TODO_LIST:
      return Strings.ScreenTitles.TODO_LIST;
    case Strings.Screens.ADD_TODO:
      return Strings.ScreenTitles.ADD_TODO;
    case Strings.Screens.UPDATE_TODO:
      return Strings.ScreenTitles.UPDATE_TODO;
    default:
      return routeName;
  }
}
