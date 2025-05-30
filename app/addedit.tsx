import AppPopup from "@/components/common/AppPopup";
import AppScreen from "@/components/common/AppScreen";
import { addTask, editTask } from "@/redux/feature/task/tasksSlice";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { generateUUID16 } from "../utils/utility";

const AddEditTask = () => {
  const data = useLocalSearchParams();
  const dispatch = useDispatch();
  const id = data?.id;

  const router = useRouter();
  const uuid = generateUUID16();
  const editingTask = useSelector((state: RootState) =>
    state.tasks.allTasks.find((t) => t.id === id)
  );

  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    !!id ? new Date(editingTask?.dueDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      AppPopup("Title is required", "", "danger");
      return;
    }
    if (!description.trim()) {
      AppPopup("Description is required", "", "danger");
      return;
    }

    const taskData = {
      id: id || uuid,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString(),
      completed: editingTask?.completed ?? false,
    };

    if (id) {
      dispatch(editTask(taskData));
      AppPopup("Task updated", "", "success");
    } else {
      dispatch(addTask(taskData));
      AppPopup("Task added", "", "success");
    }

    router.back();
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <AppScreen>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>
                {!!id ? "Edit Task" : "New Task"}
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Title *</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Task title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={[styles.input, styles.multilineInput]}
                placeholder="Task details"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Feather name="calendar" size={18} color="#000" />
                <Text style={styles.dateText}>
                  {dueDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeDate}
                textColor="#000" // Android only
                themeVariant="light" // iOS only
              />
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
              testID={id ? "update" : "submit"}
            >
              <Text style={styles.submitButtonText}>
                {id ? "Update Task" : "Create Task"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    width: "100%",
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default AddEditTask;
