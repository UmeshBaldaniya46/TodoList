import React, {useCallback} from 'react';
import {FlatList, View, Text, StyleSheet, ListRenderItem} from 'react-native';
import TaskItem from '../components/TaskItem';
import useTodoList from '../hooks/useTodoList';
import Strings from '../constants/strings';
import Colors from '../constants/colors';
import Button from '../components/Button';
import {Task} from '../redux/actions/tasksActions';

function TodoListScreen({navigation}: any): JSX.Element {
  const {tasks, handleClearAll} = useTodoList();

  const handlePress = useCallback(
    (id: number) => {
      navigation.navigate(Strings.Screens.UPDATE_TODO, {id});
    },
    [navigation],
  );

  const handleAddTask = useCallback(() => {
    navigation.navigate(Strings.Screens.ADD_TODO);
  }, [navigation]);

  const renderItem: ListRenderItem<Task> = ({item}) => (
    <TaskItem task={item} onClick={() => handlePress(item.id)} />
  );

  return (
    <View style={{flex: 1, padding: 8}}>
      <FlatList
        data={[...tasks].reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100}}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{Strings.emptyTaskList}</Text>
          </View>
        }
      />

      <Button
        title={Strings.deleteAll}
        onPress={handleClearAll}
        style={[styles.buttonBase, styles.clearButton]}
        backgroundColor={Colors.red}
      />

      <Button
        title={'+'}
        onPress={handleAddTask}
        textStyle={styles.addButtonText}
        style={[styles.buttonBase, styles.addButton]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButton: {
    right: 20,
    bottom: 30,
  },
  clearButton: {
    left: 20,
    bottom: 30,
    paddingHorizontal: 20,
    width: 'auto',
  },
  addButtonText: {
    fontSize: 30,
    lineHeight: 32,
  },
  emptyContainer: {
    marginTop: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.grey88,
    textAlign: 'center',
  },
});

export default TodoListScreen;
