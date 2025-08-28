import React, {useCallback} from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TaskItem from '../components/TaskItem';
import useTodoList from '../hooks/useTodoList';

/**
 * Screen component to display the list of active tasks.
 * Users can add, update, or delete all tasks from this screen.
 */
function TodoListScreen({navigation}) {
  // Get active tasks and the "clear all" handler from custom hook
  const {tasks, handleClearAll} = useTodoList();

  /**
   * Navigate to the "UpdateTodo" screen with the selected task ID.
   */
  const handlePress = useCallback(
    id => {
      navigation.navigate('UpdateTodo', {id});
    },
    [navigation],
  );

  /**
   * Navigate to the "AddTodo" screen to create a new task.
   */
  const handleAddTask = useCallback(() => {
    navigation.navigate('AddTodo');
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 8}}>
      <FlatList
        data={[...tasks].reverse()}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem task={item} onClick={() => handlePress(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.buttonBase, styles.clearButton]}
        onPress={handleClearAll}>
        <Text style={styles.clearButtonText}>Delete All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonBase, styles.addButton]}
        onPress={handleAddTask}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButton: {
    right: 20,
    bottom: 30,
    backgroundColor: '#2962FF',
  },
  clearButton: {
    left: 20,
    bottom: 30,
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    width: 'auto',
    paddingVertical: 0,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
    lineHeight: 36,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    marginTop: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});

export default TodoListScreen;
