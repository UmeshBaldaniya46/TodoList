import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import useTodo from '../hooks/useTodo';
import Colors from '../constants/colors';
import Button from '../components/Button';
import Strings from '../constants/strings';

function UpdateTodoScreen({navigation, route}: any) {
  const {task, handleDelete, handleSave} = useTodo(
    navigation,
    route.params?.id,
  );
  const initialTodo = task?.text || '';

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(initialTodo);

  const handleUpdate = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedTodo(initialTodo);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <ScrollView style={styles.scrollArea}>
            <Text style={styles.todoText}>{initialTodo}</Text>
          </ScrollView>

          <View style={styles.buttonRow}>
            <Button
              title={Strings.update}
              onPress={handleUpdate}
              style={styles.button}
            />
            <Button
              title={Strings.delete}
              onPress={handleDelete}
              backgroundColor={Colors.red}
              style={styles.button}
            />
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={editedTodo}
            onChangeText={setEditedTodo}
            multiline
          />

          <View style={styles.buttonRow}>
            <Button
              title={Strings.save}
              onPress={() => handleSave(editedTodo)}
              style={styles.button}
            />
            <Button
              title={Strings.cancel}
              onPress={handleCancel}
              backgroundColor={Colors.grey88}
              style={styles.button}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 20,
  },
  todoText: {
    fontSize: 18,
    marginBottom: 20,
    color: Colors.black,
  },
  input: {
    height: 120,
    borderColor: Colors.grey99,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: Colors.background,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UpdateTodoScreen;
