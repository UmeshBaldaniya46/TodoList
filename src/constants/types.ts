export enum ScreenNames {
  TODO_LIST = 'TodoList',
  ADD_TODO = 'AddTodo',
  UPDATE_TODO = 'UpdateTodo',
}

export type RootStackParamList = {
  [ScreenNames.TODO_LIST]: undefined;
  [ScreenNames.ADD_TODO]: undefined;
  [ScreenNames.UPDATE_TODO]: {id: number};
};
