import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

type Task = {
  id: number;
  text: string;
  createdAt: string | number | Date;
};

type TaskItemProps = {
  task: Task;
  onClick: () => void;
};

/**
 * TaskItem component - renders a task as a touchable card with data.
 * onClick - Callback function triggered when the card is pressed.
 */
const TaskItem: React.FC<TaskItemProps> = ({task, onClick}) => {
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
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    marginVertical: 8,
  },
  taskText: {
    fontSize: 16,
    color: Colors.black,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.grey99,
    marginTop: 5,
  },
});

export default TaskItem;
