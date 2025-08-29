import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import useTodo from '../hooks/useTodo';
import Strings from '../constants/strings';
import Colors from '../constants/colors';
import Button from '../components/Button';

/**
 * Screen for adding a new todo task.
 * Uses a text input and a button to submit the task.
 */
function AddTodoScreen({navigation}: any): JSX.Element {
  const [todo, setTodo] = useState<string>('');

  const {handleAdd} = useTodo(navigation);

  return (
    <View style={styles.container}>
      <TextInput
        value={todo}
        onChangeText={setTodo}
        placeholder={Strings.todoPlaceholder}
        style={styles.input}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Button
        title={Strings.addTodo}
        onPress={() => handleAdd(todo)}
        backgroundColor={Colors.blue}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  input: {
    height: 120,
    borderColor: Colors.grey88,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: Colors.background,
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 30,
  },
});

export default AddTodoScreen;
