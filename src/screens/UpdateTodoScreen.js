import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useTodo from '../hooks/useTodo';

function UpdateTodoScreen({navigation, route}) {
  const {task, handleDelete, handleSave} = useTodo(
    navigation,
    route?.params?.id,
  );

  const initialTodo = task?.text || '';
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(initialTodo);

  const handleUpdate = () => {
    setIsEditing(true);
  };

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
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSave(editedTodo)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
    backgroundColor: '#ffffff',
  },
  scrollArea: {
    flex: 1,
    marginBottom: 20,
  },
  todoText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    height: 120,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#2962FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default UpdateTodoScreen;
