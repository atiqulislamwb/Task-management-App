import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskHeaderProps {
  onAddTask: () => void;
  onFilter: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onAddTask, onFilter }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Task Manager</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onAddTask}
          testID="add"
        >
          <AntDesign name="plus" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onFilter}
          testID="filter"
        >
          <AntDesign name="filter" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
});
