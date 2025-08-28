import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * TaskItem component - renders a task as a touchable card with data.
 * onClick - Callback function triggered when the card is pressed.
 */
function TaskItem({task, onClick}) {
  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <View style={{paddingHorizontal: 10}}>
      <TouchableOpacity style={styles.card} onPress={onClick}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.taskText}>
          {task.text}
        </Text>
        <Text style={styles.timestamp}>{formattedDate}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    marginVertical: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#333333ff',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
});

export default TaskItem;
