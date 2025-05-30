import AppPopup from "@/components/common/AppPopup";
import { deleteTask, toggleCompleted } from "@/redux/feature/task/tasksSlice";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  };
  index: number;
  onEdit: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleCompleted(task.id));
    AppPopup("Changed saved", "", "success");
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    AppPopup("Deleted successfully", "", "success");
  };

  return (
    <View
      style={styles.card}
      //   entering={FadeInDown.duration(100).delay(100 * index)}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.dateContainer}>
          <Feather name="calendar" size={14} color="#666" />
          <Text style={styles.dateText}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              task.completed ? styles.statusCompleted : styles.statusIncomplete,
            ]}
          />
          <Text style={styles.statusText}>
            {task.completed ? "Completed" : "Incomplete"}
          </Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleToggleComplete}
          id="toggle-complete"
        >
          <Feather
            name={task.completed ? "rotate-ccw" : "check"}
            size={18}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleDelete}
          testID={`delete${index}`}
        >
          <Feather name="trash-2" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onEdit(task.id)}
          testID={`edit${index}`}
        >
          <Feather name="edit-2" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: "#000",
  },
  statusIncomplete: {
    backgroundColor: "#999",
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  buttonGroup: {
    paddingLeft: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});
